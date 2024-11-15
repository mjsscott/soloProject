export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },


};
