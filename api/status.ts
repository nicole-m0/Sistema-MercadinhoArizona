// Endpoint sem acesso a banco, autenticação ou Cloudinary.
// Tipagem estrutural compatível com request/response Node da Vercel.
export default function handler(request: {method?: string}, response: {
  status(code: number): {json(body: unknown): void};
  setHeader(name: string, value: string): void;
}) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({error: 'Método não permitido'});
    return;
  }
  response.status(200).json({status: 'ok', stage: 1});
}
