import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};
