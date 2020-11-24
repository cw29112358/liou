/**
*
* MobileFilter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import messages from 'containers/HomePage/components/messages';
// import TranslatedMessage from 'components/TranslatedMessage';
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';
import BasicSidePanel from 'components/BasicSidePanel';
import { pick } from 'lodash';
import FilterComponent from '../GridFilter/FilterComponent';
// import ColorFilterComponent from '../GridColorFilter/ColorFilterComponent';
import './style.scss';

class MobileFilter extends React.Component {
  constructor(props) {
    super(props);
    this.changeTerm = this.changeTerm.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeOrderType = this.changeOrderType.bind(this);
  }

  changeTerm() {
    this.props.changeCalculator({ term: this.selectTerm.value });
  }
  changeLocation() {
    this.props.changeCalculator({ area: this.selectLoation.value });
  }
  changeOrderType() {
    this.props.changeOrder(this.selectOrderType.value);
  }
  render() {
    const { changeFilter, filter, makeOptions,
      // changeColorFilter, colorFilter, colorFilterColorOptions, changeMultiColorFilter,
      changeMultiMakeFilter, multiFilter } = this.props;
    const makeSelected = Object.values(pick(multiFilter, 'make'))[0];
    // const colorSelected = Object.values(pick(multiFilter, 'color'))[0];
    return (
      <div style={{ paddingTop: '50px' }}>
        <div className="mobile-filter-bar">
          <button onClick={this.props.hideMobileFilter}>Cancel</button>
          <button>Filters</button>
          <button onClick={this.props.hideMobileFilter}>Search</button>
        </div>
        <ListGroup>
          <ListGroupItem>Location
            <FormControl
              componentClass="select" placeholder="select" onChange={this.changeLocation}
              inputRef={(ref) => { this.selectLoation = ref; }} defaultValue={this.props.calculator.area}
            >
              <option value="bayArea">{this.props.intl.formatMessage(messages.bayArea)}</option>
            </FormControl>
          </ListGroupItem>
          <ListGroupItem>Lease Term
            <FormControl componentClass="select" placeholder="select" onChange={this.changeTerm} inputRef={(ref) => { this.selectTerm = ref; }} defaultValue={this.props.calculator.term}>
              <option value="1">1 {this.props.intl.formatMessage(messages.month)}</option>
              <option value="2">2 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="3">3 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="4">4 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="5">5 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="6">6 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="7">7 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="8">8 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="9">9 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="10">10 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="11">11 {this.props.intl.formatMessage(messages.months)}</option>
              <option value="12">12 {this.props.intl.formatMessage(messages.months)}</option>
            </FormControl>
          </ListGroupItem>
          <BasicSidePanel collapsible title={<span style={{ color: '#28d89d' }}>BRAND</span>} collapseOpen={false} id="brand" >
            <div>
              <FilterComponent name="make" options={makeOptions} filter={filter} changeFilter={changeFilter} isHorizontal={false} changeMultiMakeFilter={changeMultiMakeFilter} makeSelected={makeSelected} />
            </div>
          </BasicSidePanel>
          {/* <BasicSidePanel collapsible title={<span style={{ color: '#28d89d' }}>COLOR</span>} collapseOpen={false} id="color" >
            <div >
              <ColorFilterComponent name="color" options={colorFilterColorOptions} filter={colorFilter} changeFilter={changeColorFilter} isHorizontal={false} changeMultiColorFilter={changeMultiColorFilter} colorSelected={colorSelected} />
            </div>
          </BasicSidePanel> */}
          <div style={{ paddingLeft: '15px' }}>Sort by</div>
          <ListGroupItem>
            <FormControl
              componentClass="select" placeholder="select" onChange={this.changeOrderType}
              inputRef={(ref) => { this.selectOrderType = ref; }} value={this.props.orderType}
            >
              <option value="none">{this.props.intl.formatMessage(messages.noOrder)}</option>
              <option value="desc">{this.props.intl.formatMessage(messages.descendPriceOrder)}</option>
              <option value="asc">{this.props.intl.formatMessage(messages.ascendPriceOrder)}</option>
              <option value="descYear">{this.props.intl.formatMessage(messages.descendYearOrder)}</option>
            </FormControl>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

MobileFilter.propTypes = {
  intl: intlShape.isRequired,
  changeCalculator: PropTypes.func,
  // changeSearch: PropTypes.func,
  calculator: PropTypes.object,
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  makeOptions: PropTypes.array,

  // changeColorFilter: PropTypes.func,
  // colorFilter: PropTypes.object,
  // colorFilterMakeOptions: PropTypes.array,
  // colorFilterColorOptions: PropTypes.array,
  // changeMultiColorFilter: PropTypes.func,
  changeMultiMakeFilter: PropTypes.func,
  multiFilter: PropTypes.object,
  changeOrder: PropTypes.func,
  orderType: PropTypes.string,

  hideMobileFilter: PropTypes.func,
};

export default injectIntl(MobileFilter);
