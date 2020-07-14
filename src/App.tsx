import React from 'react';
import { ConfigProvider, Modal } from 'antd';
import { Provider } from 'mobx-react';
import DataGridRegister from 'teaness/es/DataGrid/DataGridRegister';
import zhCN from 'antd/es/locale/zh_CN';
import defaultLocale from 'antd/es/locale/default';
import { PictureView, BaseGrid, Upload } from 'teaness';
import Axios from 'axios';
import { history } from '@/config';
import Boundary from '@/components/Boundary';
import { RequestData, ResponseData } from 'teaness/es/DataGrid/typings';
import { CancellablePromise } from 'teaness/es/typings';
import stores from '@/stores';
import request, { ReqResponse } from '@/utils/request';
import { apiPrefix } from '#/projectConfig';
import './index.scss';

if (zhCN.Modal) {
  zhCN.Modal.justOkText = '确定';
}

Modal.defaultProps = {
  ...Modal.defaultProps,
  centered: true,
} as any;
// fix show english
Object.assign(defaultLocale, zhCN);
function dataGridRequest<T>(
  url: string,
  payload: RequestData<T>,
  options?: { headers: any },
) {
  const sortColumns = payload.sorters?.map((sorter) => ({
    columnOrder: sorter.sort,
    columnProp: sorter.colId,
  }));

  const { token: cancelToken, cancel } = Axios.CancelToken.source();
  const promise = request.post(
    url,
    {
      queryData: payload.queryData || {},
      sortColumns,
      len: payload.pageSize,
      page: payload.page,
    },
    {
      cancelToken,
      headers: options?.headers,
    },
  ) as Promise<ReqResponse>;
  const t = promise.then((res) => {
    if (res.isSuccess) {
      return {
        list: res.data.list,
        total: res.data.totalitem,
      };
    }
    if (res.isCancel) {
      return {
        isCancel: true,
        list: [],
        total: 0,
      };
    }
    return Promise.reject(new Error(res.msg));
  }) as CancellablePromise<ResponseData<T>>;
  t.cancel = cancel;
  return t;
}

Upload.defaultProps = {
  ...Upload.defaultProps,

  onPreview: (file) => {
    if (/image\/.*/.test(file.type)) {
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e) => {
          PictureView({
            src: e.target?.result as string,
          });
        };
        reader.readAsDataURL(file.originFileObj);
      } else {
        PictureView({
          src: file.thumbUrl || file.url,
        });
      }
    } else if (file.originFileObj) {
      Modal.error({
        content: '暂未上传,上传后可查看',
      });
    } else if (file.type === 'application/pdf') {
      window.open(
        `/${apiPrefix}/file/previewFileByUri?uri=${file.uid}`,
        '_blank',
      );
    } else {
      window.open(file.thumbUrl || file.url);
    }
  },
  onDownload: (file) => {
    window.open(file.thumbUrl || file.url);
  },
};

BaseGrid.defaultProps = {
  ...BaseGrid.defaultProps,
  headerHeight: 32,
  rowHeight: 32,
  noRowsOverlayComponentFramework: () => <span>暂无数据</span>,
};
DataGridRegister.request = dataGridRequest;
DataGridRegister.router = history as any;
DataGridRegister.defaultPageSize = 20;

const Layout: React.FC<{}> = () => {
  return (
    <Boundary>
      <ConfigProvider locale={zhCN}>
        <Provider {...stores}>
          <div className="layout">hello</div>
        </Provider>
      </ConfigProvider>
    </Boundary>
  );
};

export default Layout;
