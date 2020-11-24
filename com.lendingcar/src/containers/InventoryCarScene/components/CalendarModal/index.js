/**
*
* CalendarModal Stateless Component
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {
  Container,
  Content,
  View,
  Button,
  Text,
} from 'native-base';

import { CALCULATE_DATE_FORMAT } from 'utils/constants';

import ReactCalendar from 'components/ReactCalendar';
import AppHeader from 'components/AppHeader';

import styles from './styles';

const minDate = moment().add(7, 'days').format(CALCULATE_DATE_FORMAT);

export class CalendarModal extends React.Component {
  constructor(props) {
    super(props);
    let date = minDate;
    const { pickDate } = props;
    if (pickDate && typeof pickDate === 'string') date = pickDate;
    this.state = {
      date,
    };
  }

  selectDay = (date) => {
    this.setState({ date });
  }

  submitPickDay = () => {
    const { date } = this.state;
    // const { depositFinance } = this.props;
    Actions.push('bookingDetails', {
      pickDate: date,
      // depositFinance,
    });
  }

  render() {
    const { date } = this.state;
    return (
      <Container>
        <AppHeader
          hasTitle
          hasLeft
          title="pickupDate"
          hasRight={false}
          leftIconName="close"
          hiddenBorder
          hasShadow={false}
          headerContainer={styles.headerContainer}
        />
        <Content
          style={styles.calanderView}
          contentContainerStyle={styles.calanderView}
        >
          <ReactCalendar
            onChange={this.selectDay}
            defaultDay={date}
            markDays={[date]}
            minDate={minDate}
          />
          <Text style={styles.timeNote}>{translate('timeNote')}</Text>
          <View style={styles.modalFooter}>
            <Button
              style={styles.confirmButton}
              onPress={this.submitPickDay}
              disabled={!date}
            >
              <Text style={styles.confirmText}>{translate('confirm')}</Text>
            </Button>
          </View>
        </Content>

      </Container>
    );
  }
}

CalendarModal.defaultProps = {
  pickDate: null,
  // depositFinance: null,
};

CalendarModal.propTypes = {
  pickDate: PropTypes.any,
  // depositFinance: PropTypes.object,
};

export default CalendarModal;
