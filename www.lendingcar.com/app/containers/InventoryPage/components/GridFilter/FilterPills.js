import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

const FilterPills = ({ changeFilter, changeMultiMakeFilter, changeMultiColorFilter, makeSelected, colorSelected }) => {
  const selectMake = (isFiltered, id) => {
    const newFilter = {};
    newFilter[name] = isFiltered ? '' : id;
    changeFilter(newFilter);
    changeMultiMakeFilter(id);
  };
  const selectColor = (isFiltered, id) => {
    const newFilter = {};
    newFilter[name] = isFiltered ? '' : id;
    changeFilter(newFilter);
    changeMultiColorFilter(id);
  };
  return (
    <div className="filter-pills">
      {!isMobile && <div className="pills-label">
        <TranslatedMessage messages={messages} messageId="filter" tagName="span" />:
      </div>}
      {makeSelected.map((title, key) => {
        const isFiltered = true;
        const onClick = selectMake.bind(this, isFiltered, title);
        return (
          <div key={key} className="pill" onClick={onClick}>
            <TranslatedMessage messages={messages} messageId={title} tagName="span" />
            <i className="fa fa-times"></i>
          </div>
        );
      })}
      {colorSelected.map((title, key) => {
        const isFiltered = true;
        const onClick = selectColor.bind(this, isFiltered, title);
        return (
          <div key={key} className="pill" onClick={onClick}>
            <TranslatedMessage messages={messages} messageId={title} tagName="span" />
            <i className="fa fa-times"></i>
          </div>
        );
      })}
    </div>
  );
};

FilterPills.propTypes = {
  changeMultiMakeFilter: PropTypes.func,
  changeMultiColorFilter: PropTypes.func,
  changeFilter: PropTypes.func,
  makeSelected: PropTypes.array,
  colorSelected: PropTypes.array,
};

export default FilterPills;
