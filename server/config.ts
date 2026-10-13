export type Environment = Record<string, string | undefined>;

export function serverConfig(env: Environment) {
  const required = (name: string) => {
    const value = env[name]?.trim();
    if (!value) throw new Error(`Configuração ausente: ${name}`);
    return value;
  };
  const supabaseUrl = required('SUPABASE_URL');
  const origin = required('APP_ORIGIN');
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(supabaseUrl)) throw new Error('SUPABASE_URL inválida');
  const parsed = new URL(origin);
  if (parsed.origin !== origin || (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname))) throw new Error('APP_ORIGIN inválida');
  const cloudName = required('CLOUDINARY_CLOUD_NAME');
  if (!/^[a-z0-9_-]+$/.test(cloudName)) throw new Error('Cloud name inválido');
  return {
    supabaseUrl, origin, cloudName,
    supabaseKey: required('SUPABASE_PUBLISHABLE_KEY'),
    cloudinaryKey: required('CLOUDINARY_API_KEY'),
    cloudinarySecret: required('CLOUDINARY_API_SECRET'),
    remoteEnabled: env.ENABLE_REMOTE_OPERATIONS === 'true',
  };
}
export type ServerConfig = ReturnType<typeof serverConfig>;
