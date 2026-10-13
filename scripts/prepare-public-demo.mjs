// Somente preparação local. Não faz login, upload nem deploy.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {loadEnv} from 'vite';

const allFiles = directory => readdirSync(directory, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? allFiles(join(directory, entry.name)) : [join(directory, entry.name)]);
const files = allFiles('dist');
assert.equal(files.length, 107, 'Build deve conter apenas HTML, CSS, JS e 104 JPEGs');
assert.ok(files.every(path => /\.(html|css|js|jpg)$/.test(path)), 'Arquivo inesperado no build');
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const originalImages = readdirSync('public/images/products').filter(name => name.endsWith('.jpg'));
assert.equal(originalImages.length, 104);
for (const name of originalImages) assert.equal(hash(`public/images/products/${name}`), hash(`dist/images/products/${name}`));

const text = files.filter(path => /\.(html|css|js)$/.test(path)).map(path => readFileSync(path, 'utf8')).join('\n');
assert.doesNotMatch(text, /SUPABASE_|CLOUDINARY_|supabase\.co|api\.cloudinary\.com|-----BEGIN .*PRIVATE KEY-----/);
assert.ok(text.includes('WhatsApp desabilitado nesta demonstração'), 'Build não é a demonstração pública');
assert.ok(text.includes('Produtos e preços fictícios'), 'Avisos fictícios ausentes');

const environments = {...loadEnv('development', process.cwd(), ''), ...loadEnv('production', process.cwd(), ''), ...process.env};
for (const filename of ['.env.local', '.env.server', '.env.server.local', '.env.production.local']) {
  if (!existsSync(filename)) continue;
  for (const line of readFileSync(filename, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match) environments[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
for (const [name, value] of Object.entries(environments)) {
  if (!/(SECRET|TOKEN|PASSWORD|PRIVATE_KEY|SUPABASE_.*KEY|CLOUDINARY_API_KEY|WHATSAPP)/.test(name) || !value || value.length < 8) continue;
  assert.ok(!text.includes(value), 'Credencial ou telefone configurado encontrado no artefato; valor omitido');
  if (name.includes('WHATSAPP')) {
    const digits = value.replace(/\D/g, '');
    for (const variant of [digits, digits.slice(2), digits.slice(4)]) {
      if (variant.length >= 9) assert.ok(!text.replace(/[ ()-]/g, '').includes(variant), 'Telefone pessoal encontrado no artefato; valor omitido');
    }
  }
}

// A pasta é dedicada ao frontend, fora de api/server e sem qualquer .env.
const target = '.deploy-demo';
if (existsSync(target)) {
  assert.equal(allFiles(target).length, 0, 'Pasta de publicação já contém arquivos; verificar antes de preparar novamente');
} else mkdirSync(target);
cpSync('dist', target, {recursive: true});
writeFileSync(join(target, 'vercel.json'), JSON.stringify({
  version: 2, framework: null, buildCommand: null, installCommand: null, outputDirectory: '.',
  headers: [{source: '/(.*)', headers: [
    {key: 'X-Content-Type-Options', value: 'nosniff'},
    {key: 'Referrer-Policy', value: 'no-referrer'},
    {key: 'X-Robots-Tag', value: 'noindex, nofollow'},
  ]}],
}, null, 2) + '\n');
// Whitelist também protege contra arquivos locais que a CLI possa criar ao vincular.
writeFileSync(join(target, '.vercelignore'), '*\n!index.html\n!vercel.json\n!assets\n!assets/**\n!images\n!images/**\n');
assert.equal(allFiles(target).length, 109);
console.log('Auditoria aprovada: 104 JPEGs preservados, sem credenciais/número de teste conhecidos.');
console.log('Pacote estático preparado em .deploy-demo: 107 arquivos do Vite + configuração Vercel, sem endpoints ou fontes. Nenhuma publicação executada.');
