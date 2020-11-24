/**
 *
 * WebViewScene Stateless Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { WebView } from 'react-native';
import { Container } from 'native-base';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';

export class WebViewScene extends React.Component {
  state = {
    isLoading: true,
    title: '',
  }
  onLoad = (event) => {
    const { title } = event.nativeEvent;
    this.setState({
      isLoading: false,
      title,
    });
  }
  onMessage = (event) => {
    const { data } = event.nativeEvent;
    Actions.push(data);
  }
  render() {
    const { url } = this.props;
    const { isLoading, title } = this.state;
    return (
      <Container>
        <AppHeader title={title} isTranslate={false} />
        {isLoading && <Loader />}
        <WebView
          originWhitelist={['*']}
          onMessage={this.onMessage}
          onLoad={this.onLoad}
          scalesPageToFit={false}
          useWebKit
          source={{ uri: url }}
        />
      </Container>
    );
  }
}

WebViewScene.defaultProps = {
  url: '',
};

WebViewScene.propTypes = {
  url: PropTypes.string,
};

const mapStateToProps = createPropsSelector({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(WebViewScene);
