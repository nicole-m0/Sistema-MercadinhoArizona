// Auditoria local após npm run build. Não altera arquivos nem usa rede.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {loadEnv} from 'vite';

const originalFiles = readdirSync('public/images/products').filter(name => name.endsWith('.jpg')).sort();
const builtFiles = readdirSync('dist/images/products').filter(name => name.endsWith('.jpg')).sort();
assert.equal(originalFiles.length, 104);
assert.deepEqual(builtFiles, originalFiles);
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
for (const name of originalFiles) assert.equal(hash(`public/images/products/${name}`), hash(`dist/images/products/${name}`));
const assets = readdirSync('dist/assets').filter(name => name.endsWith('.js'));
const code = assets.map(name => readFileSync(`dist/assets/${name}`, 'utf8')).join('\n');
assert.doesNotMatch(code, /SUPABASE_|CLOUDINARY_|supabase\.co|api\.cloudinary\.com/);
console.log('Build: 104 JPEGs preservados byte a byte (SHA-256); sem referências às integrações Supabase/Cloudinary no JavaScript.');

const ddds = '11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' ');
for (const mode of ['development', 'production']) {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const phone = env.VITE_WHATSAPP_PEDIDOS_TESTE ?? '';
  const fee = Number(env.VITE_TAXA_ENTREGA_CENTAVOS ?? 0);
  assert.equal(env.VITE_AMBIENTE ?? 'teste', 'teste', 'Manter ambiente demonstrativo nesta revisão');
  assert.ok(/^55(?:\d{2}9\d{8}|\d{2}[2-5]\d{7})$/.test(phone) && ddds.includes(phone.slice(2, 4)), 'WhatsApp de teste ausente ou inválido; número omitido');
  assert.ok(Number.isSafeInteger(fee) && fee >= 0);
  assert.ok(code.includes(phone), 'Destino do build difere do WhatsApp de teste local; número omitido');
  console.log(`Configuração local ${mode}: ambiente teste; WhatsApp com formato válido e presente no build; entrega ${fee} centavos; cartão ${env.VITE_ACEITA_CARTAO === 'true' ? 'habilitado' : 'desabilitado'}. Número omitido.`);
}
