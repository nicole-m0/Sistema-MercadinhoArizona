import {productImages} from './product-images';
import {catalogProducts} from './settings/products';
import type {Product} from './product-types';
export type {Product} from './product-types';

export const products: Product[] = catalogProducts;
export const categories = [...new Set(products.map(product => product.category))];
export function illustration(product: Product) {
  return productImages[product.id];
}
