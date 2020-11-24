/**
 *
 * TripScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';

import TripTabs from './components/TripTabs';
import TripList from './components/TripList';

import { FILTER_OPTIONS } from './constants';
import {
  selectIsLoading,
  selectCurrentTabTrips,
} from './selectors';
import {
  loadTripAction,
  changeTabAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class TripScene extends React.Component { // eslint-disable-line
  state={
    page: 0,
    scrollEnabled: true,
  }
  componentWillMount() {
    const { trips, loadTrip, changeTab } = this.props;
    if (!trips || !trips.length) {
      loadTrip();
    }
    changeTab('pending');
  }

  onPressListItem = (trip) => {
    Actions.tripDetail({ id: trip.id, trip });
  }
  onChangeTab = ({ i: page }) => {
    const { changeTab } = this.props;
    const { label } = FILTER_OPTIONS[page];
    this.setState({ page });
    changeTab(label);
    this.onStartScroll();
  }
  onStopListScroll = (callback) => {
    this.setState({ scrollEnabled: false }, callback);
  }
  onStartScroll = () => {
    const { scrollEnabled } = this.state;
    if (scrollEnabled !== true) this.setState({ scrollEnabled: true });
  }

  render() {
    const { isLoading, trips, backToHome } = this.props;
    const { page, scrollEnabled } = this.state;
    const appHeaderProps = backToHome ? { leftPress: () => Actions.reset('home') } : {};

    return (
      <Container style={styles.container}>
        { isLoading && <Loader /> }
        <AppHeader title="trip" hasBorder={false} hiddenBorder {...appHeaderProps} />
        <Content
          contentContainerStyle={styles.contentBox}
          style={styles.content}
          scrollEnabled={false}
        >
          <TripTabs
            page={page}
            tabs={FILTER_OPTIONS}
            onChangeTab={this.onChangeTab}
            onStopListScroll={this.onStopListScroll}
          >
            <TripList
              ref={(ref) => { this.list = ref; }}
              isLoading={isLoading}
              list={trips}
              onPress={this.onPressListItem}
              scrollEnabled={scrollEnabled}
            />
          </TripTabs>

        </Content>

      </Container>
    );
  }
}

TripScene.defaultProps = {
  backToHome: false,
};


TripScene.propTypes = {
  backToHome: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
  loadTrip: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  trips: selectCurrentTabTrips,
});

const mapDispatchToProps = (dispatch) => ({
  loadTrip: () => dispatch(loadTripAction()),
  changeTab: (tab) => dispatch(changeTabAction(tab)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'tripScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(TripScene);
