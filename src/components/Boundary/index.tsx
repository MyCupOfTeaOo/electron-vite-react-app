import React, { PureComponent } from 'react';
import * as Sentry from '@sentry/browser';
import { Result, Button } from 'antd';

interface BoundaryProps {}
interface BoundaryState {
  eventId?: string;
  hasError?: boolean;
}

class Boundary extends PureComponent<BoundaryProps, BoundaryState> {
  state: Readonly<BoundaryState> = {};

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <Result
          status="error"
          title="程序运行异常"
          subTitle="你可以点击下方按钮提交报告联系我们,我们将会为联系并帮助你解决问题"
          extra={
            <Button
              type="primary"
              onClick={() =>
                Sentry.showReportDialog({ eventId: this.state.eventId })
              }
            >
              点击我,提交报告
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default Boundary;
