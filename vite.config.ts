import reactPlugin from 'vite-plugin-react';
import { UserConfig } from 'vite';
// import * as path from 'path';

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  resolvers: [
    {
      alias(id) {
        if (/^@\//.test(id)) {
          return `/src/${id.slice(2)}`;
        }
        if (/^#\//.test(id)) {
          return `/config/${id.slice(2)}`;
        }
      },
    },
    // @material-ui
    {
      alias(id) {
        if (/^@babel\/runtime\/helpers(?!\/esm)/.test(id)) {
          return id.replace(
            '@babel/runtime/helpers',
            '@babel/runtime/helpers/esm',
          );
        }
      },
    },
    // antd
    {
      alias(id) {
        if (/^@ant-design\/icons\/(?!\/es)/.test(id)) {
          return id.replace('@ant-design/icons', '@ant-design/icons/es/icons');
        }
      },
    },
    {
      alias(id) {
        if (/^@ant-design\/colors/.test(id)) {
          return id.replace('@ant-design/colors', '/fix/@ant-design/colors');
        }
      },
    },
    {
      alias(id) {
        if (/^lodash($|\/)/.test(id)) {
          return id.replace('lodash', 'lodash-es');
        }
      },
    },
  ],
  alias: {
    // @material-ui
    'react-is': '/fix/react-is/',
    '@babel/runtime/regenerator': '/fix/regenerator/',
    // classnames
    classnames: '/fix/classnames/',
    'insert-css': '/fix/insert-css/',
    tinycolor2: '/fix/tinycolor2',
    raf: '/fix/raf',
    shallowequal: '/fix/shallowequal',
    'hoist-non-react-statics': 'hoist-non-react-statics/src',
  },
  cssPreprocessOptions: {
    javascriptEnabled: true,
  },
};

export default config;
