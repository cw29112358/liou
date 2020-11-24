/**
 *
 * FullScreenScene Stateless Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
} from 'native-base';

import { executeFunction } from 'utils/helpers';

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
        headerContainer={headerStyle}
        {...headerProps}
      />
    );
  }

  renderContent() {
    const {
      children,
      isWithPadding, scrollEnabled, contentProps,
      contentContainerStyle, contentStyle,
    } = this.props;

    const newContentStyle = [styles.content];
    if (isWithPadding) newContentStyle.push(styles.contentWithPadding);
    if (contentStyle) newContentStyle.push(contentStyle);

    return (
      <Content
        contentContainerStyle={contentContainerStyle}
        style={newContentStyle}
        scrollEnabled={scrollEnabled}
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
  isWithPadding: false,
  scrollEnabled: true,
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
  isWithPadding: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
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
