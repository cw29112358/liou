/**
 *
 * ProfileScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'native-base';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import FormScene from 'components/FormScene';

import InfoList from 'components/InfoList';

import ProfileForm from 'forms/ProfileForm';

import styles from './styles';

export class ProfileScene extends React.Component {
  state = {
    showNull: true,
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ showNull: false });
    }, 1);
  }
  getEnAddressTip() {
    let tipList = [
      'enAddressTip0',
      'enAddressTip1',
      'enAddressTip2',
      'enAddressTip3',
    ];
    tipList = tipList.map((item) => (
      {
        children: (
          <Text style={styles.modalText}>{ translate(item) }</Text>
        ),
      }
    ));
    return (
      <View style={styles.modalView}>
        <InfoList
          list={tipList}
          viewStyle={styles.infoView}
          itemStyle={styles.infoItem}
        />
        <Text style={styles.modalFooterText}>{ translate('enAddressTipFooter') }</Text>
      </View>
    );
  }

  linkToENAddressTip = () => {
    Actions.modal({
      children: this.getEnAddressTip(),
      isWithPadding: false,
    });
  }

  render() {
    const { isLoading } = this.props;
    const { showNull } = this.state;

    return (
      <FormScene
        title="personalCenter"
        isLoading={showNull || isLoading}
        component={showNull ? undefined : ProfileForm}
        alertTitle="profileSaveTitle"
        alertMessage="profileSave"
        linkToENAddressTip={this.linkToENAddressTip}
      />
    );
  }
}

ProfileScene.defaultProps = {
};

ProfileScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ProfileScene);
