/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import GridItem from '../GridItem';

function GridProducts(props) {
  const { inventory, ...moreProps } = props;
  const rows = [];
  // TODO: this is a hack
  const cars = Object.values(filter(inventory, (car) => car.imageNum !== 0));

  const renderProduct = (product, index) => (
    <div className="col-sm-4" key={index}>
      <GridItem {...product} {...moreProps} />
    </div>
  );
  const renderRows = (row, index) => (
    <div className="row" key={index}>
      { row.map(renderProduct, this) }
    </div>
  );

  cars.forEach((item, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (!rows[row]) rows[row] = [];
    rows[row][col] = item;
  });


  return (
    <div className="row">
      <div className="col-sm-12">
        { rows.map(renderRows, props) }
      </div>
    </div>
  );
}

GridProducts.propTypes = {
  inventory: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default GridProducts;
