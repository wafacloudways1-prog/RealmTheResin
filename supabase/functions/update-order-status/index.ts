import { createClient } from "npm:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
Deno.serve(async req=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
 try{
  const auth=req.headers.get("Authorization");if(!auth)throw new Error("Sign in required");
  const client=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,{global:{headers:{Authorization:auth}}});
  const {data:{user}}=await client.auth.getUser();if(!user)throw new Error("Invalid session");
  const {data:profile}=await client.from("profiles").select("role").eq("id",user.id).single();if(profile?.role!=="admin")throw new Error("Admin only");
  const {order_id,status,delivery_date}=await req.json();
  const {error}=await client.from("orders").update({status,delivery_date}).eq("id",order_id);if(error)throw error;
  return new Response(JSON.stringify({ok:true}),{headers:{...cors,"Content-Type":"application/json"}});
 }catch(e){return new Response(JSON.stringify({error:String(e.message||e)}),{status:403,headers:{...cors,"Content-Type":"application/json"}})}
});