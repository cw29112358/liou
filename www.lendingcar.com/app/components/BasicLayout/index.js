/*
 *
 * accountTemplate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Row } from 'antd';

import { formatMessage } from 'components/TranslatedMessage';
import PathBar from 'components/PathBar';
import './style.scss';

export class BasicLayout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderPathBar = () =>
    <div className="path-bar">
      <PathBar {...this.props} />
    </div>

  render() {
    const { intl, messages, route } = this.props;
    const translatedTitle = formatMessage(intl, messages, route.name);
    const { helmetContent, renderLeft, children } = this.props;
    return (
      <div className="layout-page">
        <Helmet
          title={translatedTitle}
          meta={[
            { name: 'description', content: helmetContent },
          ]}
        />
        <div className="container page-container">
          { this.renderPathBar() }
          <Row justify="space-between" type="flex" className="div-row">
            <div className="left-div">
              { renderLeft() }
            </div>
            <div className="form-div">
              { children }
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

const NULLFNC = () => null;

BasicLayout.defaultProps = {
  helmetContent: '',
  renderLeft: NULLFNC,
  renderRight: NULLFNC,
};

BasicLayout.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.object,
  route: PropTypes.object,
  helmetContent: PropTypes.string,
  renderLeft: PropTypes.func,
  children: PropTypes.any,
};

const mapStateToProps = createPropsSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BasicLayout));
