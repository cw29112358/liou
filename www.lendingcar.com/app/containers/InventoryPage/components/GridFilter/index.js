/**
*
* GridFilter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Icon } from 'antd';
import { isMobile } from 'react-device-detect';

import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

import './style.scss';
import FilterComponent from './FilterComponent';
import FilterPills from './FilterPills';
import RangePicker from '../RangePicker';

class GridFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
    };
  }

  toggleShow = () => {
    this.setState({
      isShown: !this.state.isShown,
    });
  }

  renderShowText = () => this.state.isShown ?
    (<div className="show-button-div">
      <TranslatedMessage messages={messages} messageId="showLess" tagName="span" />
      <Icon type="up" style={{ fontSize: 12, marginLeft: 5 }} />
    </div>)
    :
    (<div className="show-button-div">
      <TranslatedMessage messages={messages} messageId="showMore" tagName="span" />
      <Icon type="down" style={{ fontSize: 12, marginLeft: 5 }} />
    </div>);

  renderShowButton = () =>
    (<div className="show-button" onClick={this.toggleShow}>
      {this.renderShowText()}
    </div>)

  renderRangeOptions = () => <RangePicker {...this.props} />

  renderFilters = () => {
    const { changeFilter, filter, makeOptions, colorFilterColorOptions, changeColorFilter,
      changeMultiColorFilter, colorFilter, changeMultiMakeFilter, multiFilter } = this.props;
    const makeSelected = Object.values(pick(multiFilter, 'make'))[0];
    const colorSelected = Object.values(pick(multiFilter, 'color'))[0];
    const FilterType = ['make', 'color'];
    // const mask = (<div className="mask" onClick={this.toggleShow}>
    //   {this.renderShowText()}
    // </div>);
    const makeFilterComponent = (item) => (<FilterComponent
      name={item} options={makeOptions} filter={filter} changeFilter={changeFilter}
      changeMultiFilter={changeMultiMakeFilter} selected={makeSelected}
    />);
    const colorFilterComponent = (item) => (<FilterComponent
      name={item} options={colorFilterColorOptions} filter={colorFilter} changeFilter={changeColorFilter}
      changeMultiFilter={changeMultiColorFilter} selected={colorSelected}
    />);
    // const shownClass = this.state.isShown ? 'filter-box' : 'filter-box half-hidden';
    const shownClass = this.state.isShown ? 'filters' : 'filters not-show';
    const hasData = (colorSelected.length > 0) || (makeSelected.length > 0);
    return (
      <div
        className="filter-box"
      >
        { this.renderRangeOptions() }
        <hr style={{ margin: '0px' }}></hr>
        <div className="pills-row">
          {!isMobile && <FilterPills
            changeFilter={changeFilter} changeMultiColorFilter={changeMultiColorFilter}
            changeMultiMakeFilter={changeMultiMakeFilter}
            makeSelected={makeSelected} colorSelected={colorSelected}
          />}
          {isMobile && <div className="pills-label">
            <TranslatedMessage messages={messages} messageId="filter" tagName="span" />
          </div>}
          { this.renderShowButton() }
        </div>
        {isMobile && <div className="auto-scroll">
          { hasData ?
            <FilterPills
              changeFilter={changeFilter} changeMultiColorFilter={changeMultiColorFilter}
              changeMultiMakeFilter={changeMultiMakeFilter}
              makeSelected={makeSelected} colorSelected={colorSelected}
            /> : null
          }
        </div>}
        {/* {mask} */}
        {FilterType && FilterType.map((item, index) =>
          <div className={shownClass} key={index}>
            <div className="filter-title">
              <TranslatedMessage messages={messages} messageId={item === 'make' ? 'brand' : 'color2'} tagName="span" />
            </div>
            {item === 'make' ? makeFilterComponent(item) : colorFilterComponent(item)}
          </div>
        )}
      </div>);
  }

  render() {
    // const { changeFilter, changeMultiColorFilter, changeMultiMakeFilter, multiFilter } = this.props;
    // const makeSelected = Object.values(pick(multiFilter, 'make'))[0];
    // const colorSelected = Object.values(pick(multiFilter, 'color'))[0];
    return (
      <div className="grid-filter">
        { this.renderFilters() }
      </div>
    );
  }
}
GridFilter.propTypes = {
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  makeOptions: PropTypes.array,
  colorFilterColorOptions: PropTypes.array,
  changeColorFilter: PropTypes.func,
  changeMultiColorFilter: PropTypes.func,
  colorFilter: PropTypes.object,
  changeMultiMakeFilter: PropTypes.func,
  multiFilter: PropTypes.object,
};

export default GridFilter;
