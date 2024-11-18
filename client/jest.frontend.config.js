export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json', // Move tsconfig setting here
      },
    ],
  },

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-router-dom)/',
  ],
};
