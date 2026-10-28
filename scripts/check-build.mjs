import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Exercise the actual generated output after framework/bundler upgrades, not
// just the source helpers: auth pages must retain JS and every local asset.
const routes = ['', 'checkout', 'signup', 'login', 'dashboard', 'privacy',
  'request-usage', 'terms', 'forgot-password', 'reset-password'];
const files = routes.map(route => resolve('dist', route, 'index.html'));
for (const [index, file] of files.entries()) {
  assert.ok(existsSync(file), `Missing static route: ${routes[index] || '/'}`);
  const html = readFileSync(file, 'utf8');
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<link[^>]+rel="stylesheet"/);
  assert.match(html, /<script[^>]+type="module"/,
    `Client scripts missing from ${routes[index] || '/'}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const path = match[1];
    assert.ok(existsSync(resolve('dist', '.' + path)) ||
      existsSync(resolve('dist', '.' + path, 'index.html')),
    `Broken generated reference ${path} in ${file}`);
  }
}
const home = readFileSync(files[0], 'utf8');
assert.match(home, /Example Tokyo club night/);
assert.match(home, /Illustrative response shape/);
assert.match(home, /plan=starter/);
assert.match(home, /plan=pro/);
const signup = readFileSync(resolve('dist/signup/index.html'), 'utf8');
assert.match(signup, /id="signup-form"/);
assert.match(signup, /type="password"/);
assert.match(signup, /noindex/);
const checkout = readFileSync(resolve('dist/checkout/index.html'), 'utf8');
assert.match(checkout, /id="plan-select"/);
assert.match(checkout, /value="starter"/);
assert.match(checkout, /value="pro"/);
assert.match(checkout, /No demand metrics, follower counts, rankings or VIP pricing/);
assert.match(readFileSync(resolve('dist/privacy/index.html'), 'utf8'), /id="disable-analytics"/);
console.log(`Generated static regression checks passed: ${routes.length} routes, client scripts, assets, pricing and privacy.`);
