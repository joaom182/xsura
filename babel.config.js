module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~/': './src/',
          '~services': './src/services',
          '~helpers': './src/helpers',
          '~factories': './src/factories',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
