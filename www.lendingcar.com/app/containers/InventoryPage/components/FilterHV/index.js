/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './style.scss';
import FilterComponent from './FilterComponent';
// import ListSidebar from '../ListSidebar';
// import Filter from './components/Filter';

// TODO: Take care of color style.
function FilterHV(props) {
  const { changeFilter, filter, makeOptions, colorOptions, changeSearch } = props;
  const shouldColorShown = !!filter.make;
  const placeholder = (props.locale === 'en') ? 'Search here ......' : '搜索 ......';
  const filterListOrGrid = !isMobile ?
  (<div className="container">
    <div className="clearfix margin-b-30">

      <div className="pull-left">
        <a
          className="btn btn-dark btn-lg"
          role="button"
          data-toggle="collapse"
          href="#filter-collapse"
          aria-expanded="false"
          aria-controls="filter-collapse"
        >
          <i className="fa fa-filter" /><FormattedMessage {...messages.filter} />
        </a>
      </div>
    </div>
    <div className="clearfix" >
      <div className="collapse" id="filter-collapse">
        <div className="row filter-row">

          <FilterComponent name="make" options={makeOptions} filter={filter} changeFilter={changeFilter} isHorizontal />
          {shouldColorShown &&
          <FilterComponent name="color" options={colorOptions} filter={filter} changeFilter={changeFilter} isHorizontal />
        }
        </div>
      </div>
    </div>
  </div>)
    :
    (<div className="col-sm-3 filter-row">
      <div className="sidebar-widget margin-b-40">
        <div className="search-form">
          <form role="form">
            <input type="text" id="searchContent" className="form-control" placeholder={placeholder} onChange={(evt) => changeSearch(evt.target.value)} />
          </form>
        </div>
      </div>
      <div>
        <FilterComponent name="make" options={makeOptions} filter={filter} changeFilter={changeFilter} isHorizontal={false} />
      </div>
      {shouldColorShown &&
      <div>
        <FilterComponent name="color" options={colorOptions} filter={filter} changeFilter={changeFilter} isHorizontal={false} />
      </div>
      }
    </div>);

  // const filterHV = isMobile ?
  //   <Filter {...props} />
  // :
  //   <ListSidebar {...props} />;

  return (

    // filterHV

    filterListOrGrid

    // <div className="container">
    //   <div className="clearfix margin-b-30">
    //
    //     <div className="pull-left">
    //       <a
    //         className="btn btn-dark btn-lg"
    //         role="button"
    //         data-toggle="collapse"
    //         href="#filter-collapse"
    //         aria-expanded="false"
    //         aria-controls="filter-collapse"
    //       >
    //         <i className="fa fa-filter" /><FormattedMessage {...messages.filter} />
    //       </a>
    //     </div>
    //   </div>
    //   <div className="clearfix" >
    //     <div className="collapse" id="filter-collapse">
    //       <div className="row filter-row">
    //
    //         <FilterComponent name="make" options={makeOptions} filter={filter} changeFilter={changeFilter} isHorizontal />
    //         {shouldColorShown &&
    //         <FilterComponent name="color" options={colorOptions} filter={filter} changeFilter={changeFilter} isHorizontal />
    //       }
    //       </div>
    //     </div>
    //   </div>
    // </div>

  );
}

FilterHV.propTypes = {
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  makeOptions: PropTypes.array,
  colorOptions: PropTypes.array,
};

export default FilterHV;
