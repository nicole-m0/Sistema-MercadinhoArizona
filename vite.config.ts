import {defineConfig} from 'vite';
import status from './api/status';

export default defineConfig(({mode, command}) => ({
  build: {outDir: mode === 'commercial' ? 'dist-commercial' : 'dist'},
  // Impede que variáveis pessoais de .env.local ou do shell entrem no build público.
  define: command === 'build' ? {
    'import.meta.env.VITE_DEMONSTRACAO_PUBLICA': JSON.stringify('true'),
    'import.meta.env.VITE_WHATSAPP_PEDIDOS_TESTE': JSON.stringify(''),
    'import.meta.env.VITE_AMBIENTE': JSON.stringify('teste'),
    'import.meta.env.VITE_TAXA_ENTREGA_CENTAVOS': JSON.stringify('0'),
    'import.meta.env.VITE_ACEITA_CARTAO': JSON.stringify('false'),
    'import.meta.env': JSON.stringify({MODE:mode,DEV:false,VITE_DEMONSTRACAO_PUBLICA:'true',VITE_WHATSAPP_PEDIDOS_TESTE:'',VITE_AMBIENTE:'teste',VITE_TAXA_ENTREGA_CENTAVOS:'0',VITE_ACEITA_CARTAO:'false'}),
  } : undefined,
  plugins: [{
  name: 'local-api-foundation',
  configureServer(server) {
    server.middlewares.use('/api/status', (request, response) => {
      status(request, {
        setHeader: (name, value) => { response.setHeader(name, value); },
        status: code => ({json: body => {
          response.statusCode = code;
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(body));
        }}),
      });
    });
  },
}]}));
