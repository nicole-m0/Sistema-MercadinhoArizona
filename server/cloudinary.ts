import type {ServerConfig} from './config';
import {requireAdmin, requireSameOrigin} from './auth';

export const imagePolicy = {maxBytes: 3 * 1024 * 1024, formats: ['jpg', 'png', 'webp'], maxPixels: 20_000_000} as const;

// Apenas uso no servidor. Nunca retornar esta função ou o secret ao frontend.
export async function signCloudinary(params: Record<string, string | number | boolean>, secret: string) {
  const input = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&') + secret;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

export function productImageId(productId: string, versionId: string) {
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(productId) || !/^[a-f0-9-]{36}$/.test(versionId)) throw new Error('Identificador de imagem inválido');
  return `mercadinho-arizona/products/${productId}/${versionId}`;
}

export function validateImageReference(value: {secure_url: string; public_id: string}, config: ServerConfig, expectedId: string) {
  const url = new URL(value.secure_url);
  if (value.public_id !== expectedId || url.protocol !== 'https:' || url.hostname !== 'res.cloudinary.com' || url.port || url.username || url.password || !url.pathname.startsWith(`/${config.cloudName}/image/upload/`)) throw new Error('Referência de imagem inválida');
  return {image_secure_url: url.href, image_public_id: value.public_id};
}

// Fundação do fluxo; nenhum endpoint de upload/exclusão é exposto nesta etapa.
// A etapa de imagens deve validar bytes, decodificar e otimizar no servidor antes
// de enviar. Nunca assinar parâmetros arbitrários recebidos do navegador.
export async function prepareImageOperation(config: ServerConfig, context: {token?: string; origin?: string}, operation: 'upload' | 'destroy', productId: string, versionId: string, request: typeof fetch = fetch) {
  requireSameOrigin(config, context.origin);
  await requireAdmin(config, context.token, request);
  if (!config.remoteEnabled) throw new Error('Operações remotas desabilitadas');
  const publicId = productImageId(productId, versionId);
  const params: Record<string, string | number | boolean> = {
    public_id: publicId, timestamp: Math.floor(Date.now() / 1000),
    ...(operation === 'upload' ? {overwrite: false, allowed_formats: imagePolicy.formats.join(',')} : {invalidate: true}),
  };
  return {
    endpoint: `https://api.cloudinary.com/v1_1/${config.cloudName}/image/${operation}`,
    parameters: {...params, api_key: config.cloudinaryKey, signature: await signCloudinary(params, config.cloudinarySecret)},
  };
}
