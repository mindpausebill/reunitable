module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  bracketSpacing: true,
  semi: true,
  useTabs: false,
  bracketSameLine: false,
  proseWrap: 'never',
  endOfLine: 'auto',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports'), require('prettier-plugin-tailwindcss')]
};
