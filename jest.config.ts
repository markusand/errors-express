import type { Config } from 'jest';

export default {
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.spec.ts'],
  testEnvironment: 'node',
} satisfies Config;
