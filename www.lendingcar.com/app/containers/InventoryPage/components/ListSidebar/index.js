/**
*
* Header
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import BasicSidePanel from 'components/BasicSidePanel';
import { pick } from 'lodash';
import TranslatedMessage from 'components/TranslatedMessage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import FilterComponent from '../GridFilter/FilterComponent';
// import styled from 'styled-components';
import ColorFilterComponent from '../GridColorFilter/ColorFilterComponent';

function ListSidebar(props) {
  const { changeFilter, filter, makeOptions, changeColorFilter, colorFilter, colorFilterColorOptions, changeMultiColorFilter, changeMultiMakeFilter, multiFilter } = props;
  // const shouldColorShown = !!filter.make;
  // const placeholder = (props.locale === 'en') ? 'Search here ......' : '搜索 ......';
  // const shouldColorFilterMakeShown = !!colorFilter.color;
  const makeSelected = Object.values(pick(multiFilter, 'make'))[0];
  const colorSelected = Object.values(pick(multiFilter, 'color'))[0];

  return (
    <div className="col-sm-3 filter-row margin-b-40">
      {/* <div className="sidebar-widget margin-b-40" >
         <div className="search-form">
          <form role="form">
            <input type="text" id="searchContent" className="form-control" placeholder={placeholder} onChange={(evt) => changeSearch(evt.target.value)} />
          </form>
        </div>
      </div>*/}
      <BasicSidePanel collapsible title={<span style={{ color: '#28d89d' }}><TranslatedMessage messages={messagesCarPage} messageId="brand" tagName="span" /></span>} collapseOpen id="brand" >
        <div>
          <FilterComponent name="make" options={makeOptions} filter={filter} changeFilter={changeFilter} isHorizontal={false} changeMultiMakeFilter={changeMultiMakeFilter} makeSelected={makeSelected} />
        </div>
        {/*
        {shouldColorShown &&
        <div>
          <FilterComponent name="color" options={colorOptions} filter={filter} changeFilter={changeFilter} isHorizontal={false} />
        </div>
      }
      */}
      </BasicSidePanel>

      <BasicSidePanel collapsible title={<span style={{ color: '#28d89d' }}><TranslatedMessage messages={messagesCarPage} messageId="colorUppercase" tagName="span" /></span>} collapseOpen={false} id="color" >
        <div >
          <ColorFilterComponent name="color" options={colorFilterColorOptions} filter={colorFilter} changeFilter={changeColorFilter} isHorizontal={false} changeMultiColorFilter={changeMultiColorFilter} colorSelected={colorSelected} />
        </div>

      </BasicSidePanel>

    </div>
  );
}
ListSidebar.propTypes = {
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  makeOptions: PropTypes.array,
  // colorOptions: PropTypes.array,
  // changeSearch: PropTypes.func,
  // locale: PropTypes.string,

  changeColorFilter: PropTypes.func,
  colorFilter: PropTypes.object,
  // colorFilterMakeOptions: PropTypes.array,
  colorFilterColorOptions: PropTypes.array,
  changeMultiColorFilter: PropTypes.func,
  changeMultiMakeFilter: PropTypes.func,
  multiFilter: PropTypes.object,
};
export default ListSidebar;
