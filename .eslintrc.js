module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
    "jest": true
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js", "**/vendor/*.js"],
  rules: {
    "linebreak-style": 0,
    "eol-last": 0,
    "operator-linebreak": 0,
    "react/react-in-jsx-scope": "off"
  },
  "plugins": ["react", "@typescript-eslint", "jest"],
};