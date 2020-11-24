/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import { FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import messages from 'containers/HomePage/components/messages';
// import messagesLocal from './messages';

class OrderBar extends React.Component {
  constructor(props) {
    super(props);

    this.changeOrderType = this.changeOrderType.bind(this);
    this.getOrderTypeOptionName = this.getOrderTypeOptionName.bind(this);
  }


  getOrderTypeOptionName() {
    let order = '';
    switch (this.props.orderType) {
      case 'none':order = this.props.intl.formatMessage(messages.noOrder); break;
      case 'desc':order = this.props.intl.formatMessage(messages.descendPriceOrder); break;
      case 'asc':order = this.props.intl.formatMessage(messages.ascendPriceOrder); break;
      case 'descYear':order = this.props.intl.formatMessage(messages.descendYearOrder); break;
      // case 'ascYear':order = this.props.intl.formatMessage(messages.ascendYearOrder); break;
      case 'NaN':order = 'Negotiable Price'; break;
      default:order = this.props.intl.formatMessage(messages.noOrder); break;
    }
    return order;
  }

  changeOrderType(evtKey) {
    if (isMobile) {
      this.props.changeOrder(this.selectOrderType.value);
    } else {
      this.props.changeOrder(evtKey);
    }
  }


  render() {
    return (
      <div>
        {isMobile && <FormControl
          componentClass="select" placeholder="select" onChange={this.changeOrderType}
          inputRef={(ref) => { this.selectOrderType = ref; }} value={this.props.orderType} style={{ marginBottom: '20px', marginTop: '-20px' }}
        >
          <option value="none">{this.props.intl.formatMessage(messages.noOrder)}</option>
          <option value="desc">{this.props.intl.formatMessage(messages.descendPriceOrder)}</option>
          <option value="asc">{this.props.intl.formatMessage(messages.ascendPriceOrder)}</option>
          <option value="descYear">{this.props.intl.formatMessage(messages.descendYearOrder)}</option>

        </FormControl>}
        {!isMobile && <DropdownButton
          bsStyle="default" title={this.getOrderTypeOptionName()} id="orderType"
          onSelect={this.changeOrderType} style={{ width: '100%', background: '#fff' }}
        >
          <MenuItem eventKey="none"><TranslatedMessage messages={messages} messageId="noOrder" tagName="span" /></MenuItem>
          <MenuItem eventKey="desc"><TranslatedMessage messages={messages} messageId="descendPriceOrder" tagName="span" /></MenuItem>
          <MenuItem eventKey="asc"><TranslatedMessage messages={messages} messageId="ascendPriceOrder" tagName="span" /></MenuItem>
          <MenuItem eventKey="descYear"><TranslatedMessage messages={messages} messageId="descendYearOrder" tagName="span" /></MenuItem>
          </DropdownButton>}
      </div>
    );
  }
}

OrderBar.propTypes = {
  intl: intlShape.isRequired,
  changeOrder: PropTypes.func,
  orderType: PropTypes.string,
};

export default injectIntl(OrderBar);
