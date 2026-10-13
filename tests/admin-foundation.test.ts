import {describe, it, expect, vi} from 'vitest';
import {serverConfig} from '../server/config';
import {requireAdmin, requireSameOrigin} from '../server/auth';
import {prepareImageOperation, signCloudinary, productImageId, validateImageReference} from '../server/cloudinary';
import handler from '../api/status';

const config = serverConfig({APP_ORIGIN: 'http://127.0.0.1:5173', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'test-key', CLOUDINARY_CLOUD_NAME: 'test-cloud', CLOUDINARY_API_KEY: 'test-api', CLOUDINARY_API_SECRET: 'test-secret'});
const userId = '00000000-0000-4000-8000-000000000000';
describe('Fundação administrativa (rede simulada)', () => {
  it('nega acesso sem sessão antes de chamar serviços', async () => {
    const request = vi.fn();
    await expect(requireAdmin(config, undefined, request)).rejects.toMatchObject({status: 401});
    expect(request).not.toHaveBeenCalled();
  });
  it('valida identidade remotamente e exige permissão administrativa', async () => {
    const request = vi.fn().mockResolvedValueOnce(Response.json({id: userId})).mockResolvedValueOnce(Response.json([]));
    await expect(requireAdmin(config, 'test-token', request)).rejects.toMatchObject({status: 403});
    expect(request.mock.calls[0][0]).toContain('/auth/v1/user');
  });
  it('rejeita sessão expirada e indisponibilidade da autorização', async () => {
    await expect(requireAdmin(config, 'test-token', vi.fn().mockResolvedValue(new Response(null, {status: 401})))).rejects.toMatchObject({status: 401});
    const request = vi.fn().mockResolvedValueOnce(Response.json({id: userId})).mockResolvedValueOnce(new Response(null, {status: 500}));
    await expect(requireAdmin(config, 'test-token', request)).rejects.toMatchObject({status: 503});
  });
  it('bloqueia origem externa e operações remotas mesmo para administrador', async () => {
    expect(() => requireSameOrigin(config, 'https://evil.example')).toThrow();
    const request = vi.fn().mockResolvedValueOnce(Response.json({id: userId})).mockResolvedValueOnce(Response.json([{user_id: userId}]));
    await expect(prepareImageOperation(config, {token: 'test-token', origin: config.origin}, 'upload', 'p0-0', userId, request)).rejects.toThrow('desabilitadas');
  });
  it('produz assinatura SHA-256 conforme vetor conhecido e ordena parâmetros', async () => {
    // SHA-256 de abc: parâmetros vazios e secret fictício abc.
    expect(await signCloudinary({}, 'abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(await signCloudinary({timestamp: 1, public_id: 'image'}, 'secret')).toBe(await signCloudinary({public_id: 'image', timestamp: 1}, 'secret'));
  });
  it('rejeita imagens de outro ambiente e identificadores arbitrários', () => {
    const id = productImageId('p0-0', userId);
    expect(() => productImageId('../other', userId)).toThrow();
    expect(() => validateImageReference({secure_url: 'https://evil.example/image.jpg', public_id: id}, config, id)).toThrow();
    expect(() => validateImageReference({secure_url: 'https://res.cloudinary.com/other/image/upload/a.jpg', public_id: id}, config, id)).toThrow();
    expect(validateImageReference({secure_url: 'https://res.cloudinary.com/test-cloud/image/upload/a.jpg', public_id: id}, config, id).image_public_id).toBe(id);
  });
  it('status não expõe configuração nem aceita mutações', () => {
    const json = vi.fn(); const response = {setHeader: vi.fn(), status: vi.fn(() => ({json}))};
    handler({method: 'GET'}, response);
    expect(json).toHaveBeenCalledWith({status: 'ok', stage: 1});
    handler({method: 'POST'}, response);
    expect(response.status).toHaveBeenLastCalledWith(405);
  });
});
