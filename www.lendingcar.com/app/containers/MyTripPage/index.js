/*
 *
 * MyTripPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { createPropsSelector } from 'reselect-immutable-helpers';

import Loader from 'components/Loader';
import AccountLayout from 'components/AccountLayout';
import { selectAuthUserId } from 'containers/App/selectors';
import { selectLocale } from 'containers/LanguageProvider/selectors';
import {
  selectAllTrips,
  selectTripTypes,
  selectUpcompingTrips,
  selectRentingTrips,
  selectCanceledTrips,
  selectDoneTrips,
  selectIsLoading,
} from './selectors';
import TripType from './components/TripType';
import ContractModal from './components/ContractModal';
import { loadMyTripAction, setNotLatestAction } from './actions';
import messages from './messages';

export class MyTripPage extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  componentWillMount() {
    const { uid } = this.props;
    if (uid) {
      this.props.loadMytrip(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { uid: preUid } = this.props;
    const { uid } = nextProps;
    if (preUid !== uid) {
      nextProps.loadMytrip(uid);
    }
  }

  showModal = (trip) => {
    this.setState({
      modalVisible: true,
      trip,
    });
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  renderChildren = () => {
    if (this.props.isLoading) return <Loader />;

    return (
      <AccountLayout {...this.props} messages={messages}>
        <div>
          <TripType
            {...this.props}
            messages={messages}
            onShow={this.showModal}
          />
          <ContractModal
            {...this.props}
            show={this.state.modalVisible}
            onHide={this.hideModal}
            contractInfo={this.state.trip}
          />
        </div>
      </AccountLayout>
    );
  }


  render() {
    return this.renderChildren();
  }
}

MyTripPage.defaultProps = {
  menuKey: 'myTrip',
  helmetContent: 'Description of MyTripPage',
  isLoading: true,
};

MyTripPage.propTypes = {
  uid: PropTypes.string,
  isLoading: PropTypes.bool,
  loadMytrip: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  locale: selectLocale,
  uid: selectAuthUserId,
  isLoading: selectIsLoading,
  tripTypes: selectTripTypes,
  allTrips: selectAllTrips,
  upcommingTrips: selectUpcompingTrips,
  rentingTrips: selectRentingTrips,
  canceledTrips: selectCanceledTrips,
  finishedTrips: selectDoneTrips,
});

function mapDispatchToProps(dispatch) {
  return {
    loadMytrip: (uid) => dispatch(loadMyTripAction(uid)),
    setNotLatest: () => dispatch(setNotLatestAction()),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyTripPage));
