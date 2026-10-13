// Servidor de teste local do artefato estático; não integra o pacote publicado.
import {createServer} from 'node:http';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {extname, resolve, sep} from 'node:path';

const root = resolve('.deploy-demo');
const types = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.jpg':'image/jpeg'};
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
}).listen(5175, '127.0.0.1', () => console.log('Artefato demonstrativo: http://127.0.0.1:5175'));
