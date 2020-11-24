/**
*
* FilterBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { isMobile } from 'react-device-detect';

// import TripConfigurationBar from 'components/TripConfigurationBar';
import TripConfigurationBarMonth from 'components/TripConfigurationBarMonth';
import PathBar from 'components/PathBar';
import messages from 'containers/HomePage/components/messages';
// import messagesLocal from './messages';
import './style.scss';

class FilterBar extends React.Component {
  getTermOptionName = () => {
    const term = this.props.calculator.term;
    return term === '1' ? `1 ${this.props.intl.formatMessage(messages.month)}`
                        : `${term} ${this.props.intl.formatMessage(messages.months)}`;
  }
  getLocationOptionName = () => {
    const area = this.props.calculator.area;
    return !area ? `${this.props.intl.formatMessage(messages.bayArea)}`
                     : `${this.props.intl.formatMessage(messages[area])}`;
  }
  changeTerm = (evtKey) => {
    if (isMobile) {
      this.props.changeCalculator({ term: this.selectTerm.value });
    } else {
      this.props.changeCalculator({ term: evtKey });
    }
  }
  changeLocation = (evtKey) => {
    if (isMobile) {
      this.props.changeCalculator({ area: this.selectLoation.value });
    } else {
      this.props.changeCalculator({ area: evtKey });
    }
  }

  render() {
    // const { intl, changeSearch, currentSearchKeywords } = this.props;
    // const filterSearchFormStyle = isMobile ? { marginBottom: '30px' } : {};
    // const className = isMobile ? 'filter-search-form-mobile' : 'filter-search-form';
    return (
      <div>
        <div className="search-container">
          {!isMobile && <PathBar {...this.props} />}
          {/* <form role="form" className={className} style={filterSearchFormStyle}>
            <div className="form-group">
              <input
                type="text" id="searchContent" className="form-control"
                placeholder={intl.formatMessage(messagesLocal.search)}
                value={currentSearchKeywords}
                onChange={(evt) => changeSearch(evt.target.value)}
              />
              <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
            </div>
          </form> */}
        </div>
        <TripConfigurationBarMonth {...this.props} submitText="searchText" />
      </div>
    );
  }
}

FilterBar.propTypes = {
  intl: intlShape.isRequired,
  changeCalculator: PropTypes.func,
  // changeSearch: PropTypes.func,
  calculator: PropTypes.object,
  // currentSearchKeywords: PropTypes.string,
};

export default injectIntl(FilterBar);
