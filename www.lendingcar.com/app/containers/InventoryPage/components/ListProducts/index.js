/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import filter from 'lodash/filter';
import TranslatedMessage from 'components/TranslatedMessage';
import ListItem from '../ListItem';
import messages from './messages';
import './style.scss';

const ListProducts = (props) => {
  const { inventory, ...moreProps } = props;
  const renderListProduct = (item, index) => (
    <ListItem {...moreProps} {...item} key={index} index={index} />
  );
  return (
    <div className="col-sm-12">
      <div className="row" >
        {inventory ? inventory.map(renderListProduct)
          :
        <div className="empty-div">
          <p className="empty">
            <TranslatedMessage messages={messages} messageId="emptyInventory" tagName="span" />
          </p>
        </div>
        }
      </div>
    </div>
  );
};

ListProducts.propTypes = {
  inventory: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default ListProducts;
