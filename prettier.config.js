module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  jsxBracketSameLine: true,
  importOrderSeparation: true,
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@/app|@/api|@/assets|@/redux|@/hooks|@/components|@/i18n|@/lib|@/utils|@/helpers|@/translations|@/layouts|@/styles)/?',
    '^[./]'
  ],
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports'), require.resolve('prettier-plugin-tailwindcss')]
};
