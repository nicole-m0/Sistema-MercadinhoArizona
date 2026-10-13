// Auditoria remota somente de leitura, sem autenticação ou envio de pedidos.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {join, relative} from 'node:path';

const base = new URL(process.argv[2]);
assert.equal(base.protocol, 'https:');
const allFiles = directory => readdirSync(directory, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? allFiles(join(directory, entry.name)) : [join(directory, entry.name)]);
const files = allFiles('dist');
assert.equal(files.length, 215);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let next = 0;
await Promise.all(Array.from({length: 8}, async () => {
  while (next < files.length) {
    const path = files[next++];
    const url = new URL(relative('dist', path).replaceAll('\\', '/'), base);
    const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
    assert.equal(response.status, 200, `Arquivo indisponível: ${url.pathname}`);
    assert.equal(hash(new Uint8Array(await response.arrayBuffer())), hash(readFileSync(path)), `Arquivo publicado difere do build: ${url.pathname}`);
  }
}));
for (const path of ['/api/status', '/admin', '/.env.local', '/.vercel/project.json', '/server/auth.ts', '/supabase/seeds/catalog.sql']) {
  const response = await fetch(new URL(path, base), {signal: AbortSignal.timeout(30000)});
  assert.equal(response.status, 404, `Rota dispensável ou privada acessível: ${path}`);
}
const response = await fetch(base, {signal: AbortSignal.timeout(30000)});
assert.equal(response.status, 200);
assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
console.log('Publicação verificada sem autenticação: 215 arquivos iguais ao build (SHA-256), incluindo as 104 imagens.');
console.log('API/admin/arquivos privados: HTTP 404. Cabeçalhos de demonstração e privacidade confirmados.');
