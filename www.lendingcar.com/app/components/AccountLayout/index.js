/*
 *
 * accountTemplate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createPropsSelector } from 'reselect-immutable-helpers';

import SiderBar from '../SiderBar';
import BasicLayout from '../BasicLayout';
import { MENUS } from './constants';

export class AccountLayout extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderLeft = () => <SiderBar currentSelect={this.props.menuKey} menus={MENUS} title="account" />

  render = () => (
    <BasicLayout {...this.props} messages={this.props.messages} renderLeft={this.renderLeft}>
      {this.props.children}
    </BasicLayout>
  )
}

AccountLayout.defaultProps = {
  menuKey: '',
};

AccountLayout.propTypes = {
  menuKey: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.any,
};

const mapStateToProps = createPropsSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(AccountLayout));
