/**
 *
 * TripDetailScene Stateless Container
 *
 */
/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';
import {
  Container,
  Content,
  View,
  Text,
} from 'native-base';

import {
  getSubString,
  getCalculatedPrice,
  openURLByLinking,
} from 'utils/helpers';
import {
  SERVICE_TEL_SPLIT,
  SERVICE_TEL,
} from 'utils/constants';

import AppHeader from 'components/AppHeader';
import CarInfo from 'components/CarInfo';
import InfoList from 'components/InfoList';
import DivisionLine from 'components/DivisionLine';

import styles from './styles';

class TripDetailScene extends React.Component {
  onOpenModal(modalType) {
    const { trip } = this.props;
    Actions.modal({
      children: this.getModalList(modalType, trip, this.driver),
      isWithPadding: false,
    });
  }

  getListWithStyle(
    list,
    itemStyle = styles.borderItem,
    keyLabelStyle = styles.keyLabelStyle
  ) {
    return list.map((item) => ({
      ...item,
      itemStyle,
      keyLabelStyle,
    }));
  }
  getTotalModalList(trip) {
    const list = [
      {
        keyLabel: 'downPayment',
        valueText: translate(0, 'dollar'),
      },
      {
        keyLabel: 'monthlyPayment',
        valueText: translate(0, 'dollar'),
      },
      {
        keyLabel: 'deposit',
        valueText: translate(getCalculatedPrice(trip.deposit), 'dollar'),
      },
      {
        children: <DivisionLine noCircle width={styles.divisionLineWidth} />,
      },
      {
        keyLabel: 'feeDue',
        rightChildren: translate(trip.bookingFee, 'dollar', {
          priceText: styles.orangeText,
          dollarUnit: styles.orangeText,
        }),
      },
    ];
    return this.getListWithStyle(list, styles.totalItem);
  }
  getBankCardModalList(trip) {
    const list = [
      {
        keyLabel: 'paymentName',
        valueText: trip.paymentName,
        hasBorder: true,
      },
      {
        keyLabel: 'paymentCardNum',
        valueText: `**** ${getSubString(trip.paymentCardNum, -4, 4)}`,
        hasBorder: true,
      },
      {
        keyLabel: 'paymentExp',
        valueText: trip.paymentExp,
        hasBorder: true,
      },
      {
        keyLabel: 'paymentCountry',
        valueText: startCase(trip.paymentCountry),
        hasBorder: true,
      },
    ];
    return this.getListWithStyle(list);
  }
  getDriverModalList(driver) {
    const list = [
      {
        keyLabel: 'driverName',
        valueText: `${driver.firstName || ''} ${driver.lastName || ''}`,
        hasBorder: true,
      },
      {
        keyLabel: 'licenseNo',
        valueText: driver.driverLicenseNum,
        hasBorder: true,
      },
      {
        keyLabel: 'phoneNumber',
        valueText: driver.phoneNumber,
        hasBorder: true,
      },
    ];
    return this.getListWithStyle(list);
  }
  getIncludesModalList(trip) {
    const list = [
      {
        keyLabel: 'serviceCoverage',
        valueText: `${translate('limitedMechanical')}`,
        hasBorder: true,
      },
      {
        keyLabel: 'registration',
        valueLabel: 'included',
        hasBorder: true,
      },
      {
        keyLabel: 'insurance',
        valueLabel: trip.needInsurance ? 'purchase' : 'notPurchase',
        hasBorder: true,
      },
    ];
    return this.getListWithStyle(list);
  }
  getModalList = (modalType, trip, driver) => {
    let list = [];
    switch (modalType) {
      case 'total':
        list = this.getTotalModalList(trip);
        break;
      case 'driver':
        list = this.getDriverModalList(driver);
        break;
      case 'includes':
        list = this.getIncludesModalList(trip);
        break;
      default:
        break;
    }

    return (
      <InfoList
        titleLabel={modalType}
        list={list}
        hasLabelLine={false}
        {...styles.modal}
      />
    );
  }

  renderPickupList(trip) {
    let list = [
      {
        keyLabel: 'pickupDate',
        valueText: trip.pickupDate,
      },
      {
        keyLabel: 'months',
        valueText: trip.term,
      },
    ];

    // 是否是送货上门
    const isDelivery = !trip.pickupZip;
    let addArr;
    if (isDelivery) {
      addArr = [
        {
          keyLabel: 'region',
          valueText: translate(trip.area),
        },
        {
          keyLabel: 'detailConsult',
          rightChildren: (
            <Text
              style={styles.telText}
              onPress={() => openURLByLinking(`tel:${SERVICE_TEL}`, 'notSupportPhoneUrl')}
            >
              { SERVICE_TEL_SPLIT }
            </Text>
          ),
        },
      ];
    } else {
      addArr = [
        {
          keyLabel: 'address',
          valueText: trip.pickupAddress1,
        },
        {
          keyLabel: 'city',
          valueText: `${trip.pickupCity}, ${trip.pickupState}`,
        },
      ];
    }
    list = list.concat(addArr);

    return (
      <InfoList
        titleLabel="pickUpAndReturnTitle"
        list={list}
      />
    );
  }
  renderPaymentList(trip, driver) {
    const list = [
      {
        keyLabel: 'total',
        hasBorder: true,
        rightChildren: translate(trip.totalDue, 'dollar', {
          priceText: styles.orangeText,
          dollarUnit: styles.orangeText,
        }),
        hasRightArrow: true,
        onPress: () => this.onOpenModal('total'),
      },
      {
        keyLabel: 'driver',
        valueText: `${driver.firstName || ''} ${driver.lastName || ''}`,
        hasBorder: true,
        hasRightArrow: true,
        onPress: () => this.onOpenModal('driver', driver),
      },
      {
        keyLabel: 'includes',
        hasRightArrow: true,
        onPress: () => this.onOpenModal('includes'),
      },
    ];
    return (
      <InfoList
        titleLabel="payMentTitle"
        list={list}
      />
    );
  }
  renderNoticeList() {
    let noticeList = [
      'noticeLine1',
      'noticeLine2',
      'noticeLine3',
      'noticeLine4',
    ];
    noticeList = noticeList.map((item) => (
      {
        children: (
          <Text style={styles.noticeText}>{ translate(item) }</Text>
        ),
      }
    ));
    return (
      <InfoList
        titleLabel="notice"
        list={noticeList}
        viewStyle={styles.noticeView}
      />
    );
  }

  render() {
    const { trip } = this.props;
    const { car, drivers = [] } = trip;
    this.driver = drivers[0] || {};

    return (
      <Container>
        <AppHeader title={trip.bookingState} hiddenBorder />
        <Content
          contentContainerStyle={styles.container}
          style={styles.contentBox}
          bounces={false}
        >
          <CarInfo carInfo={car}>
            { this.renderPickupList(trip) }
            <View style={styles.greySeperate} />
            { this.renderPaymentList(trip, this.driver) }
            <View style={styles.greySeperate} />
            { this.renderNoticeList(trip) }
          </CarInfo>
        </Content>
      </Container>
    );
  }
}

TripDetailScene.defaultProps = {
  trip: {},
};

TripDetailScene.propTypes = {
  trip: PropTypes.object,
};

export default TripDetailScene;
