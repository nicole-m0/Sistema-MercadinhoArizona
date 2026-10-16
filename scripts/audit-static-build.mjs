// Compatibilidade: o build padrão agora é demonstrativo e não contém telefone pessoal.
// Reutiliza a auditoria estática sem preparar pacote ou publicar arquivos.
process.argv.push('--audit-only');
await import('./prepare-public-demo.mjs');
