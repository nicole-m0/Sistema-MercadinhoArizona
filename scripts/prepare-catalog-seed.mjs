// Gera somente SQL local. Não contém cliente nem credenciais de banco.
import {createServer} from 'vite';
import {writeFileSync} from 'node:fs';

const server = await createServer({server: {middlewareMode: true}, appType: 'custom'});
try {
  const {products, categories, illustration} = await server.ssrLoadModule('/src/catalog.ts');
  if (products.length !== 104 || new Set(products.map(p => p.id)).size !== 104 || categories.length !== 13) throw new Error('Catálogo original divergente; importação interrompida');
  const sqlValue = value => value == null ? 'NULL' : typeof value === 'number' || typeof value === 'boolean' ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
  const categoryRows = categories.map((name, i) => [ `c${i}`, name, i ]);
  const productRows = products.map((p, i) => [p.id, p.name, `c${categories.indexOf(p.category)}`, p.price, p.promo, p.unit, p.available, illustration(p), p.icon, p.color, i]);
  const insert = (table, columns, rows) => `insert into public.${table} (${columns}) values\n${rows.map(row => `(${row.map(sqlValue).join(', ')})`).join(',\n')}\non conflict (id) do nothing;\n`;
  const output = '-- Importação não destrutiva dos 104 produtos. Não sobrescreve edições.\n-- Executar somente depois do esquema e da aprovação em ambiente de teste.\nbegin;\n' +
    insert('categories', 'id, name, sort_order', categoryRows) +
    insert('products', 'id, name, category_id, price_cents, promo_cents, unit, available, legacy_image_path, icon, color, sort_order', productRows) + 'commit;\n';
  writeFileSync(new URL('../supabase/seeds/catalog.sql', import.meta.url), output, 'utf8');
  console.log('SQL local preparado: 104 produtos, 13 categorias. Nenhuma conexão remota.');
} finally {
  await server.close();
}
