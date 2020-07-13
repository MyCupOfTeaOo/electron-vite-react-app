import reactPlugin from 'vite-plugin-react';
import { UserConfig } from 'vite';

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
};

export default config;
