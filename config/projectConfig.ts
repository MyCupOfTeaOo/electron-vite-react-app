export const baseUrl: string =
  process.env.NODE_ENV === 'development' ? '/' : '/'; // url根路径
export const publicPath: string = '/'; // 打包文件根路径
export const projectName: string = '全高前端区块'; // 项目名
export const prefix: string | undefined = 'block'; // 项目前缀 与 页面缓存相关
export const sysId: string = 'block'; // 子系统id 与 菜单加载相关
export const apiPrefix: string =
  process.env.NODE_ENV === 'development' ? 'api' : 'api'; // request 请求前缀
export const copyright: string = `${new Date().getFullYear()} 南京全高信息科技有限公司出品`;
export const UA = process.env.UA || undefined;
export const aes = process.env.AES || 'test';
export const dsn = process.env.DSN || undefined;
