import reactPlugin from 'vite-plugin-react';
import { UserConfig } from 'vite';
import * as path from 'path';

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  alias: {
    '@': path.resolve(__dirname, 'src/'),
    '#': path.resolve(__dirname, 'config/'),
  },
};

export default config;
