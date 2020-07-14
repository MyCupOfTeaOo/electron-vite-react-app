import { RootStore } from '@/stores';

export interface Config {
  menuId: string;
}

export interface GRoute<P = { [key: string]: any }> {
  component?: any;
  path?: string;
  routes?: GRoute[];
  menuId?: string;
  params?: P;
  Routes?: any[];
  title?: string;
  exact?: boolean;
  redirect?: string;
  isMenu?: boolean;
}

export interface MenuId2Url {
  [key: string]: string;
}

export interface MenuResponse {
  menuIcon?: string;
  menuId: string;
  menuName: string;
  menuUrl: string;
  menus?: MenuResponse[];
  params?: string;
}

export interface Route {
  routes?: Route[];
  menuId: string;
  path: string;
  title: string;
}

declare module 'mobx-react' {
  export function inject<T>(
    mapStoreToProps: (store: RootStore) => T,
  ): <A = unknown>(component: React.ComponentType<A & Partial<T>>) => any;
  export function inject<T>(
    name: keyof RootStore,
  ): <A = unknown>(component: React.ComponentType<A & T>) => any;
  export function inject<T>(
    names: (keyof RootStore)[],
  ): <A = unknown>(component: React.ComponentType<A & T>) => any;
}

declare module 'querystring' {
  export function stringify(
    obj?: {
      [key: string]:
        | string
        | number
        | boolean
        | string[]
        | number[]
        | boolean[]
        | undefined
        | null;
    },
    sep?: string,
    eq?: string,
    options?: StringifyOptions,
  ): string;
}

export type RecordObj<T extends { [key: string]: any }, X> = {
  [P in keyof T]: X;
};
