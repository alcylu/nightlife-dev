import assert from "node:assert/strict";
import { test } from "node:test";
import { track } from "./analytics.ts";

test("optional analytics is consented, bounded and independent of private form/URL data",()=>{
  const storage=()=>{const data=new Map<string,string>();return {getItem:(k:string)=>data.get(k)||null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)};};
  const local=storage(),session=storage(),sent:{url:string,body:Record<string,string>}[]=[];
  Object.defineProperty(globalThis,"navigator",{configurable:true,value:{webdriver:false,doNotTrack:"0",globalPrivacyControl:false}});
  Object.assign(globalThis,{location:{hostname:"nightlife.dev",pathname:"/signup/",search:"?plan=starter&email=private@example.com&token=secret",hash:"#access_token=private"},document:{referrer:"https://www.google.com/search?q=private"},localStorage:local,sessionStorage:session,fetch:(url:string,options:{body:string})=>{sent.push({url,body:JSON.parse(options.body)});return Promise.resolve({});}});
  track("page_view");assert.equal(sent.length,0,"No consent must mean no tracking");
  local.setItem("nlt_analytics_consent","yes");track("page_view");track("signup_attempt");
  assert.equal(sent.length,2);assert.equal(sent[0].body.visit,sent[1].body.visit);
  assert.deepEqual(Object.keys(sent[0].body).sort(),["event","page","plan","source","visit"]);
  assert.equal(sent[0].body.source,"search");assert.equal(sent[0].body.plan,"starter");
  assert.ok(!JSON.stringify(sent).includes("private"));assert.ok(!JSON.stringify(sent).includes("secret"));
  const first=sent[0].body.visit;const state=JSON.parse(session.getItem("nlt_funnel_visit")!);state.day="2000-01-01";session.setItem("nlt_funnel_visit",JSON.stringify(state));track("page_view");assert.notEqual(sent[2].body.visit,first);
  Object.defineProperty(globalThis,"navigator",{configurable:true,value:{doNotTrack:"1"}});track("page_view");assert.equal(sent.length,3);
  Object.defineProperty(globalThis,"navigator",{configurable:true,value:{globalPrivacyControl:true}});track("page_view");assert.equal(sent.length,3);
  Object.defineProperty(globalThis,"navigator",{configurable:true,value:{webdriver:true}});track("page_view");assert.equal(sent.length,3);
  Object.defineProperty(globalThis,"navigator",{configurable:true,value:{}});local.setItem("nlt_analytics_consent","no");track("page_view");assert.equal(sent.length,3);
  Object.assign(globalThis,{localStorage:{getItem(){throw new Error("storage blocked");}}});assert.doesNotThrow(()=>track("signup_error"));
});
