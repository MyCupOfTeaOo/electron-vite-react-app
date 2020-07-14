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
    {
      alias(id) {
        if (/^lodash($|\/)/.test(id)) {
          return id.replace('lodash', 'lodash-es');
        }
      },
    },
  ],
  alias: {
    'hoist-non-react-statics': 'hoist-non-react-statics/src',
  },
  optimizeDeps: {
    include: ['antd', '@material-ui', 'classnames', 'teaness'],
  },
  cssPreprocessOptions: {
    javascriptEnabled: true,
  },
};

export default config;
