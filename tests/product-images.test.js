import {describe,it,expect} from 'vitest';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {products,illustration} from '../src/catalog';
import {productImages} from '../src/product-images';

describe('Imagens locais do catálogo',()=>{
 it('associa todos os 104 produtos a arquivos locais distintos',()=>{
  expect(Object.keys(productImages)).toHaveLength(104);
  expect(new Set(products.map(illustration)).size).toBe(104);
  expect(readdirSync('public/images/products').filter(file=>file.endsWith('.jpg'))).toHaveLength(104);
  for(const product of products)expect(illustration(product)).toMatch(/^\/images\/products\/[a-z0-9-]+\.jpg$/);
 });
 it('possui JPEGs válidos, diferentes e leves para cada produto',()=>{
  const hashes=new Set();
  for(const product of products){
   const bytes=readFileSync(`public${illustration(product)}`);
   expect(bytes.subarray(0,3)).toEqual(Buffer.from([0xff,0xd8,0xff]));
   expect(bytes.length).toBeLessThan(180000);
   hashes.add(createHash('sha256').update(bytes).digest('hex'));
  }
  expect(hashes.size).toBe(104);
 });
});
