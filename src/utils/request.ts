/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/axios/axios
 */
import axios, {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosInterceptorManager,
  AxiosResponse,
} from 'axios';
import * as Sentry from '@sentry/browser';
import { apiPrefix } from '#/projectConfig';
import { getToken, clearToken } from './authority';

export enum RespCode {
  success = 200,
  cancel = 0,
}

export const codeMessage: { [n: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '请求被禁止。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

export interface ReqResponse<T = any> {
  msg: string;
  code: number;
  response: AxiosResponse;
  isSuccess?: boolean;
  isCancel?: boolean;
  data?: T;
}

export type CancellablePromise<T> = Promise<T> & {
  cancel: (str?: string) => void;
};

const errorHandler = async (error: {
  response: AxiosResponse;
  message: string | undefined;
}): Promise<ReqResponse> => {
  const { response, message } = error;
  if (response && response.status) {
    if (response.status === 403) {
      // stores.user.clearUser();
      clearToken();
      // window.location.href = `/sign/signIn?${stringify({
      //   sysId: stores.global.sysId,
      // })}`;
    }
    const errortext =
      response.data?.msg ||
      response.data?.message ||
      response.data?.error ||
      (typeof response.data === 'string' && response.data) ||
      codeMessage[response.status] ||
      response.statusText;
    Sentry.setContext('response', response);
    Sentry.captureException(errortext);

    return {
      response,
      code: response.status,
      msg: errortext,
    };
  }
  return {
    response,
    code: RespCode.cancel,
    msg: message || '',
    isCancel: true,
  };
};

type MyResponse<T = any> = T;

const request = axios.create({
  baseURL: `/${apiPrefix || ''}`,
}) as {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<MyResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = ReqResponse, R = MyResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R>;
  get<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  delete<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  head<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  options<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  post<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  put<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  patch<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
};

export const coreRequest = axios.create({
  baseURL: `/${apiPrefix || ''}`,
}) as {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<MyResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = ReqResponse, R = MyResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R>;
  get<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  delete<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  head<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  options<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  post<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  put<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  patch<T = ReqResponse, R = MyResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R>;
};
coreRequest.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      token: getToken(),
      ...config.headers,
    },
  };
});
coreRequest.interceptors.response.use((response) => {
  if (response.config.responseType === 'blob') {
    return download(response, '未知文件');
  }
  return {
    ...response.data,
    response,
  };
}, errorHandler);
coreRequest.interceptors.response.use((response) => {
  if (response.code !== RespCode.success) {
    return Promise.reject(Error(response.msg));
  }
  return {
    ...response.data,
  };
});

request.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      token: getToken(),
      ...config.headers,
    },
  };
});
request.interceptors.response.use((response) => {
  return {
    response,
    ...response.data,
    isSuccess: response.data?.code === RespCode.success,
  };
}, errorHandler);

export function download<T = any>(
  response: AxiosResponse,
  filename?: string,
): ReqResponse<T> {
  const disposition = (response.headers as any)['content-disposition'];
  if (disposition) {
    const sourceFilename =
      /filename=(?<filename>[^;]+)/.exec(disposition)?.groups?.filename ||
      filename;
    if (sourceFilename) {
      const a = document.createElement('a');
      const turl = window.URL.createObjectURL(response.data);
      a.href = turl;
      a.download = sourceFilename;
      a.click();
      window.URL.revokeObjectURL(turl);
      return {
        msg: '下载成功',
        code: RespCode.success,
        isSuccess: true,
        response,
      };
    }
    return {
      msg: '文件名为空',
      code: 400,
      isSuccess: false,
      response,
    };
  } else {
    return {
      msg: response.data.msg,
      code: response.data.code,
      isSuccess: false,
      response,
    };
  }
}

export default request;
