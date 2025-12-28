module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFiles: ['<rootDir>/src/tests/setupEnv.ts']
};
