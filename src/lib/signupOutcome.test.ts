import assert from "node:assert/strict";
import { test } from "node:test";
import { signupOutcome } from "./signupOutcome.ts";
test("autoconfirmed signups proceed without waiting for an email",()=>{
  assert.deepEqual(signupOutcome(true,true,"starter"),{kind:"redirect",url:"/checkout?plan=starter"});
  assert.deepEqual(signupOutcome(true,true,"pro"),{kind:"redirect",url:"/checkout?plan=pro"});
  assert.deepEqual(signupOutcome(true,true,"https://evil.example"),{kind:"redirect",url:"/checkout?plan=starter"});
  assert.deepEqual(signupOutcome(true,false,"pro"),{kind:"redirect",url:"/dashboard"});
});
test("email-confirmation configurations retain their confirmation state",()=>{
  assert.deepEqual(signupOutcome(false,true,"starter"),{kind:"confirm_email"});
});
