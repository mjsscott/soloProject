export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',

};
