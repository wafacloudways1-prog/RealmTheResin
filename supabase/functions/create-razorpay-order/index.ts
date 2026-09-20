import { createClient } from "npm:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
Deno.serve(async req=>{
 if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
 try{
  const auth=req.headers.get("Authorization"); if(!auth) throw new Error("Sign in required");
  const supa=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,{global:{headers:{Authorization:auth}}});
  const {data:{user}}=await supa.auth.getUser(); if(!user) throw new Error("Invalid session");
  const {items,shipping}=await req.json(); if(!Array.isArray(items)||!items.length) throw new Error("Cart is empty");
  const total=items.reduce((s:any,x:any)=>s+Number(x.price)*Number(x.qty),0);
  const key=Deno.env.get("RAZORPAY_KEY_ID")!, secret=Deno.env.get("RAZORPAY_KEY_SECRET")!;
  const basic=btoa(`${key}:${secret}`);
  const rr=await fetch("https://api.razorpay.com/v1/orders",{method:"POST",headers:{"Authorization":`Basic ${basic}`,"Content-Type":"application/json"},body:JSON.stringify({amount:Math.round(total*100),currency:"INR",receipt:crypto.randomUUID(),notes:{user_id:user.id}})});
  const r=await rr.json(); if(!rr.ok) throw new Error(r.error?.description||"Razorpay order failed");
  const {error}=await supa.from("orders").insert({user_id:user.id,customer_name:shipping.name,phone:shipping.phone,address:shipping.address,city:shipping.city,pin:shipping.pin,items,total,razorpay_order_id:r.id});
  if(error) throw error;
  return new Response(JSON.stringify({key,order_id:r.id,amount:r.amount}),{headers:{...cors,"Content-Type":"application/json"}});
 }catch(e){return new Response(JSON.stringify({error:String(e.message||e)}),{status:400,headers:{...cors,"Content-Type":"application/json"}})}
});