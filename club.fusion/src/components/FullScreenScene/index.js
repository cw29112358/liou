/**
 *
 * FullScreenScene Stateless Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
} from 'native-base';
import { RefreshControl } from 'react-native';

import {
  nullFunction,
  executeFunction,
} from 'utils/helpers';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';

import styles from './styles';

class FullScreenScene extends React.Component {
  state = {
    stateIsLoading: false,
  };
  setIsLoading = (stateIsLoading) => {
    this.setState({ stateIsLoading });
  }

  renderLoader() {
    const { stateIsLoading } = this.state;
    const { isLoading } = this.props;

    return (stateIsLoading || isLoading) ? <Loader /> : null;
  }
  renderHeader() {
    const {
      noHeader, headerTitle, headerStyle, headerProps,
    } = this.props;

    if (noHeader) return null;
    return (
      <AppHeader
        title={headerTitle}
        headerStyle={headerStyle}
        {...headerProps}
      />
    );
  }

  renderContent() {
    const {
      scrollEnabled, contentProps, children,
      hasRefresh, refreshing, onRefresh, refreshTitle,
      withMinHeight, isWithPadding, contentContainerStyle, contentStyle,
    } = this.props;

    const newContentStyle = [];
    if (withMinHeight) newContentStyle.push(styles.content);
    if (isWithPadding) newContentStyle.push(styles.contentWithPadding);
    if (contentStyle) newContentStyle.push(contentStyle);
    return (
      <Content
        contentContainerStyle={contentContainerStyle}
        style={newContentStyle}
        scrollEnabled={scrollEnabled}
        refreshControl={hasRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title={translate(refreshTitle)}
          />
        ) : undefined}
        {...contentProps}
      >
        { this.renderComponent() }
        { children && children }
      </Content>
    );
  }
  renderComponent() {
    const {
      component: Component, componentProps,
    } = this.props;
    if (!Component) return null;

    return (
      <Component
        {...componentProps}
        setIsLoading={this.setIsLoading}
      />
    );
  }
  renderOutsideContent() {
    const { renderOutsideContent } = this.props;

    return executeFunction(renderOutsideContent);
  }

  render() {
    const { containerStyle, containerProps } = this.props;

    const newContainerStyle = [styles.container];
    if (containerStyle) newContainerStyle.push(containerStyle);

    return (
      <Container style={newContainerStyle} {...containerProps}>
        { this.renderLoader() }
        { this.renderHeader() }
        { this.renderContent() }
        { this.renderOutsideContent() }
      </Container>
    );
  }
}

FullScreenScene.defaultProps = {
  isLoading: false,
  component: null,
  children: null,
  noHeader: false,
  headerTitle: '',
  withMinHeight: true,
  isWithPadding: false,
  scrollEnabled: true,
  hasRefresh: false,
  refreshing: false,
  onRefresh: nullFunction,
  refreshTitle: 'loading',
  renderOutsideContent: undefined,
  containerStyle: undefined,
  headerStyle: {},
  contentContainerStyle: undefined,
  contentStyle: undefined,
  containerProps: {},
  headerProps: {},
  contentProps: {},
  componentProps: {},
};

FullScreenScene.propTypes = {
  isLoading: PropTypes.bool,
  component: PropTypes.any,
  children: PropTypes.any,
  noHeader: PropTypes.bool,
  headerTitle: PropTypes.string,
  withMinHeight: PropTypes.bool,
  isWithPadding: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  hasRefresh: PropTypes.bool,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshTitle: PropTypes.string,
  renderOutsideContent: PropTypes.func,
  containerStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  containerProps: PropTypes.object,
  headerProps: PropTypes.object,
  contentProps: PropTypes.object,
  componentProps: PropTypes.object,
};

export default FullScreenScene;
