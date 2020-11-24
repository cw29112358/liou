import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';


const FilterComponent = ({ name, options, filter, changeFilter, isHorizontal = true }) => {
  const select = (isFiltered, id) => {
    const newFilter = {};
    newFilter[name] = isFiltered ? '' : id;
    // const newfilter = isFiltered ? { [name]: '' } : { [name]: id };
    changeFilter(newFilter);
  };

  const count = (obj) => obj.count ? `(${obj.count})` : undefined;
  const filterClassName = isHorizontal ? 'col-sm-6 col-md-3 margin-b-30' : '';
  return (
    <div className={filterClassName}>
      <h4><FormattedMessage {...messages[name]} /></h4>
      <ul className="list-unstyled">
        {options.map((obj, key) => {
          const isFiltered = (filter[name] === obj.id);
          const className = isFiltered ? 'clearfix active' : 'clearfix';
          const onClick = select.bind(this, isFiltered, obj.id);
          return (
            <li key={key} className={className} onClick={onClick}>
              <span className="pull-right">{count(obj)}</span>
              <a role="button">{obj.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FilterComponent.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  filter: PropTypes.object,
  changeFilter: PropTypes.func,
  isHorizontal: PropTypes.bool,
};

export default FilterComponent;
