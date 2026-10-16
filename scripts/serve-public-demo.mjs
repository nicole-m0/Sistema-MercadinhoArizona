// Servidor de teste local do artefato estático; não integra o pacote publicado.
import {createServer} from 'node:http';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {extname, resolve, sep} from 'node:path';

const commercial = process.argv.includes('--commercial');
const root = resolve(commercial ? 'dist-commercial' : 'dist');
const port = commercial ? 5176 : 5175;
const types = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.jpg':'image/jpeg', '.webp':'image/webp', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8'};
createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!['GET', 'HEAD'].includes(request.method) || !path.startsWith(root + sep) || !types[extname(path)] || !existsSync(path) || !statSync(path).isFile()) {
      response.writeHead(404); response.end(); return;
    }
    response.writeHead(200, {'Content-Type': types[extname(path)], 'Cache-Control': 'no-store'});
    response.end(request.method === 'HEAD' ? undefined : readFileSync(path));
  } catch {
    response.writeHead(400); response.end();
  }
}).listen(port, '127.0.0.1', () => console.log(`Artefato local com pedidos comerciais bloqueados: http://127.0.0.1:${port}`));
