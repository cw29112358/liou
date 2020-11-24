/**
*
* MobileFilterBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import './style.scss';
const placeholder = 'Search for a make, model or body style';

class MobileFilterBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { changeSearch } = this.props;
    return (
      <div className="mobile-filter-form">
        <form role="form" className="pull-left">
          <input
            type="text" id="searchContent" className="form-control"
            placeholder={placeholder} onChange={(evt) => changeSearch(evt.target.value)}
          />
          <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
        </form>
        <button className="pull-right" style={{ color: '#fff' }} onClick={this.props.showMobileFilter}>Filter</button>
      </div>
    );
  }
}

MobileFilterBar.propTypes = {
  changeSearch: PropTypes.func,
  showMobileFilter: PropTypes.func,
};

export default MobileFilterBar;
