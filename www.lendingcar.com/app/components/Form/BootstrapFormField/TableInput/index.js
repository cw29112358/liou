/**
*
* TableInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classNames from 'classnames';
import { intlShape } from 'react-intl';

const options = {
  clearSearch: true,
  paginationShowsTotal: true,
  paginationSize: 3,
  sizePerPage: 10,
  sizePerPageList: [15],
};

function checkPermission(hasPermission, prop) {
  if (hasPermission) {
    return prop;
  }
  return {};
}

function TableInput(props) {
  const { input, headers, className, messages, intl, hasPermission, onClickSaveCell } = props;
  const divClassName = classNames({
    [className]: true,
    row: true,
  });
  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: (billObject) => {
      onClickSaveCell(billObject);
    },
  };

  return (
    <div className={divClassName} >
      <BootstrapTable
        cellEdit={checkPermission(hasPermission, cellEditProp)}
        data={input.value.toJS()} options={options}
        striped hover responsive
      >
        {
          headers.map((header, key) => {
            const isKey = key === 0;
            const displayedValue = messages[header] ? intl.formatMessage(messages[header]) : header;
            return (
              <TableHeaderColumn
                dataField={header} isKey={isKey} key={key} dataSort width={'40'} headerAlign="center" dataAlign="center"
              >{displayedValue}</TableHeaderColumn>
            );
          })
        }
      </BootstrapTable>
    </div>
  );
}

TableInput.propTypes = {
  headers: PropTypes.array,
  messages: PropTypes.object,
  className: PropTypes.string,
  intl: intlShape,
  input: PropTypes.object,
  hasPermission: PropTypes.bool,
  onClickSaveCell: PropTypes.func,
};

export default TableInput;
