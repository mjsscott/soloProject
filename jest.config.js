/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {

  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/?(*.)+(spec|test).(ts|tsx|js)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Specify the tsconfig.json for Jest
    },
  },
  testMatch: ['**/tests/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js'],
};
