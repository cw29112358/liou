/**
*
* EditableCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
// import { ControlLabel } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import { fromJS } from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';
import '../style.scss';

const colors = {
  red: 'red-bg',
  blue: 'lazur-bg',
  green: 'navy-bg',
  yellow: 'yellow-bg',
  black: 'black-bg',
};

class EditableCard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { isRequired, input, hasLabel = true, messages, className, iconClassName, backgroundColor, disabled, handleSubmit } = this.props;
    const onChange = _.debounce((event) => {
      input.onChange(event);
      handleSubmit(() => {
        const savedValues = fromJS({
          [input.name]: event.target.value,
        });
        this.props.onSubmit(savedValues, null, this.props);
      })();
    }, 1000, {
      leading: true,
      trailing: false,
    });

    const color = colors[backgroundColor] || 'navy-bg';
    const divClassName = classNames({
      widget: true,
      style1: true,
      [color]: true,
    });
    // const value = Number(input.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className={className}>
        <div className={divClassName}>
          <div className="row">
            <div className="col-xs-4">
              <i className={iconClassName}></i>
            </div>
            <div className="col-xs-8 text-right textOverflow">
              {hasLabel &&
                <div>{isRequired && '*'}<TranslatedMessage messages={messages} messageId={input.name} /></div>
              }
              <h2>
                <ContentEditable className="font-bold textOverflow" html={input.value} disabled={disabled} {...input} onChange={onChange} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditableCard.propTypes = {
  isRequired: PropTypes.bool,
  hasLabel: PropTypes.bool,
  messages: PropTypes.object,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  backgroundColor: PropTypes.string,
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EditableCard;
