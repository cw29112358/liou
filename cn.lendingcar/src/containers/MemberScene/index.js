/**
 *
 * MemberScene Container
 *
 */

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { selectAuthUserMembership } from 'containers/AppRouter/selectors';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';
import Mask from 'components/Mask';

import MemberCard from './components/MemberCard';
import {
  selectLoading,
  selectCalculatedMemberShipPrice,
} from './selectors';
import { loadMembershipPriceAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MemberScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  componentWillMount() {
    const { loadMembershipPrice } = this.props;
    loadMembershipPrice();
  }

  openPrivilegeModal = () => {
    this.setState({ modalVisible: true });
  }
  hidePrivilegeModal = () => {
    this.setState({ modalVisible: false });
  }
  getLevelNumber = (isMembership, level) => {
    if (!isMembership) return 0;

    const levelObj = {
      basic: 0,
      premium: 1,
      deluxe: 2,
    };
    return levelObj[level] || 0;
  }
  render() {
    const {
      authUserMembership,
      isLoading, membershipPrice,
    } = this.props;
    const { modalVisible } = this.state;
    const { isMembership, level } = authUserMembership;
    const levelNumber = this.getLevelNumber(isMembership, level);

    return (
      <Container>
        <AppHeader title="member" />

        <Content
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        >
          <MemberCard
            isMembership={isMembership}
            membershipPrice={membershipPrice}
            levelNumber={levelNumber}
            openPrivilegeModal={this.openPrivilegeModal}
            closeModal={this.hidePrivilegeModal}
            modalVisible={modalVisible}
          />
        </Content>
        { isLoading && <Loader />}
        { modalVisible && <Mask />}
      </Container>
    );
  }
}

MemberScene.defaultProps = {
};

MemberScene.propTypes = {
  authUserMembership: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  membershipPrice: PropTypes.array.isRequired,
  loadMembershipPrice: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUserMembership: selectAuthUserMembership,
  isLoading: selectLoading,
  membershipPrice: selectCalculatedMemberShipPrice,
});

const mapDispatchToProps = (dispatch) => ({
  loadMembershipPrice: () => dispatch(loadMembershipPriceAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'memberScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MemberScene);
