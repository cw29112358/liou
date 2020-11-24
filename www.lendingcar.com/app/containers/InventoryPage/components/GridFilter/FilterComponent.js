import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';


const FilterComponent = ({ name, options, filter, changeFilter, changeMultiFilter, selected }) => {
  const select = (isFiltered, id) => {
    const newFilter = {};
    newFilter[name] = isFiltered ? '' : id;
    changeFilter(newFilter);
    changeMultiFilter(id);
  };
  const count = (obj) => obj.count ? `(${obj.count})` : undefined;
  // const filterClassName = isHorizontal ? 'col-sm-6 col-md-3 margin-b-30' : '';
  return (
    <div className="filter-block">
      {options.map((obj, key) => {
        const isFiltered = (filter[name] === obj.id);
        const onClick = select.bind(this, isFiltered, obj.id);
        const message = <TranslatedMessage messages={messages} messageId={obj.id} tagName="span" />;
        const checked = selected.indexOf(obj.id) === -1 ? 'fa fa-square-o checkbox-color' : 'fa fa-check-square-o';
        const className = selected.indexOf(obj.id) === -1 ? 'filter-section' : 'filter-section-active';
        const mobileClassName = selected.indexOf(obj.id) === -1 ? 'mobile-filter-section' : 'mobile-filter-section-active';
        return (
          isMobile ?
            <a role="button" key={key} onClick={onClick} className={mobileClassName} >
              {message}
              {count(obj)}
            </a> :
            <a role="button" key={key} onClick={onClick} className={className} style={{ paddingBottom: 15 }} >
              <i className={checked} style={{ marginRight: 10 }}></i>
              {message}
              {count(obj)}
            </a>
        );
      })}
    </div>
  );
};

FilterComponent.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  // isHorizontal: PropTypes.bool,
  changeMultiFilter: PropTypes.func,
  selected: PropTypes.array,
};

export default FilterComponent;
