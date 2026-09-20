import { createClient } from "npm:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
async function hmac(secret,msg){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(msg)))).map(x=>x.toString(16).padStart(2,"0")).join("")}
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 try{
  const auth=req.headers.get("Authorization");if(!auth)throw new Error("Sign in required");
  const body=await req.json();const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=body;
  const expected=await hmac(Deno.env.get("RAZORPAY_KEY_SECRET")!,`${razorpay_order_id}|${razorpay_payment_id}`);
  if(expected!==razorpay_signature)throw new Error("Invalid payment signature");
  const supa=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SECRET_KEY")!);
  const {error}=await supa.from("orders").update({razorpay_payment_id,payment_status:"paid"}).eq("razorpay_order_id",razorpay_order_id);
  if(error)throw error;
  return new Response(JSON.stringify({ok:true}),{headers:{...cors,"Content-Type":"application/json"}});
 }catch(e){return new Response(JSON.stringify({error:String(e.message||e)}),{status:400,headers:{...cors,"Content-Type":"application/json"}})}
});