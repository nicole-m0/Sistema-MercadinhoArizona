import {describe, it, expect} from 'vitest';
import {products} from '../src/catalog';
import {lineTotal, subtotal, price} from '../src/domain';

describe('Revisão da publicação estática', () => {
  it('confere promoções e cálculos com valores conhecidos', () => {
    expect(products.filter(p => p.promo !== undefined)).toHaveLength(13);
    for (const product of products) {
      expect(Number.isSafeInteger(product.price)).toBe(true);
      if (product.promo !== undefined) {
        expect(Number.isSafeInteger(product.promo)).toBe(true);
        expect(product.promo).toBeGreaterThan(0);
        expect(product.promo).toBeLessThan(product.price);
      }
      expect(lineTotal(product, 1000)).toBe(price(product));
    }
    expect(price(products.find(p => p.id === 'p0-0'))).toBe(552);
    expect(lineTotal(products.find(p => p.id === 'p10-0'), 750)).toBe(382);
    expect(subtotal({'p0-0': 1000, 'p0-1': 2000, 'p10-0': 750})).toBe(2332);
  });
});
