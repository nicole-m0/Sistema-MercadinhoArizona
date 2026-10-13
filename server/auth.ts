import type {ServerConfig} from './config';

export class AccessError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

// A sessão e o login serão implementados na Etapa 2. Não aceitar tokens no body.
export async function requireAdmin(config: ServerConfig, token: string | undefined, request: typeof fetch = fetch) {
  if (!token || !/^[A-Za-z0-9._-]+$/.test(token)) throw new AccessError(401, 'Autenticação necessária');
  const headers = {apikey: config.supabaseKey, Authorization: `Bearer ${token}`};
  const response = await request(`${config.supabaseUrl}/auth/v1/user`, {headers});
  if (!response.ok) throw new AccessError(401, 'Sessão inválida');
  const user = await response.json() as {id?: string};
  if (!user.id || !/^[a-f0-9-]{36}$/.test(user.id)) throw new AccessError(401, 'Sessão inválida');
  const roles = await request(`${config.supabaseUrl}/rest/v1/admin_users?user_id=eq.${user.id}&active=eq.true&select=user_id`, {headers});
  if (!roles.ok) throw new AccessError(503, 'Não foi possível verificar a autorização');
  const rows: unknown = await roles.json();
  if (!Array.isArray(rows) || rows.length !== 1) throw new AccessError(403, 'Acesso administrativo necessário');
  return user.id;
}

export function requireSameOrigin(config: ServerConfig, origin: string | undefined) {
  if (origin !== config.origin) throw new AccessError(403, 'Origem não permitida');
}
