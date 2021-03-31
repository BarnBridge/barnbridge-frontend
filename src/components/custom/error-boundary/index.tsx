import React from 'react';
import AntdNotification from 'antd/lib/notification';
import AntdResult from 'antd/lib/result';

import { Text } from 'components/custom/typography';

type State = {
  error?: Error;
};

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });

    AntdNotification.error({
      message: error.message,
    });
  }

  handleRefresh = () => {
    window.location.href = `${window.location.href}`;
  };

  render() {
    if (this.state.error) {
      return (
        <AntdResult
          className="absolute-center"
          status="500"
          title={
            <Text type="h2" weight="semibold" color="primary">
              500
            </Text>
          }
          subTitle={
            <Text type="p2" weight="semibold" color="secondary">
              Sorry, something went wrong.
            </Text>
          }
          extra={
            <button
              type="button"
              className="button-primary button-small"
              style={{ margin: '0 auto' }}
              onClick={this.handleRefresh}>
              Refresh page
            </button>
          }
        />
      );
    }

    return this.props.children;
  }
}
