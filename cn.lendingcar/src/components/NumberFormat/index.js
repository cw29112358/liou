
import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TextInput,
} from 'react-native';

import {
  noop,
  returnTrue,
  charIsNumber,
  escapeRegExp,
  fixLeadingZero,
  limitToScale,
  roundToPrecision,
  omit,
  setCaretPosition,
  splitDecimal,
  findChangedIndex,
  clamp,
} from './utils';

const defaultProps = {
  thousandSeparator: undefined,
  decimalSeparator: '.',
  decimalScale: undefined,
  displayType: 'input',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  format: undefined,
  removeFormatting: undefined,
  mask: undefined,
  value: undefined,
  allowNegative: true,
  allowEmptyFormatting: false,
  isNumericString: false,
  customInput: undefined,
  type: 'text',
  onValueChange: noop,
  onChange: noop,
  onKeyPress: noop,
  onEndEditing: noop,
  onFocus: noop,
  onBlur: noop,
  isAllowed: returnTrue,
  renderText: undefined,
  getInputRef: noop,
};

const propTypes = {
  thousandSeparator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([true]),
  ]),
  decimalSeparator: PropTypes.string,
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  displayType: PropTypes.oneOf(['input', 'text']),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  format: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  removeFormatting: PropTypes.func,
  mask: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isNumericString: PropTypes.bool,
  customInput: PropTypes.func,
  allowNegative: PropTypes.bool,
  allowEmptyFormatting: PropTypes.bool,
  onValueChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onEndEditing: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(['text', 'tel']),
  isAllowed: PropTypes.func,
  renderText: PropTypes.func,
  getInputRef: PropTypes.func,
};

class NumberFormat extends React.Component {
  constructor(props: Object) {
    super(props);

    // validate props
    this.validateProps();

    const formattedValue = this.formatValueProp();
    this.selection = { start: 0, end: 0 };
    // this.value = formattedValue;
    this.state = {
      value: formattedValue,
      numAsString: this.removeFormatting(formattedValue),
    };
  }
  componentDidUpdate(prevProps: Object) {
    this.updateValueIfRequired(prevProps);
  }

  updateValueIfRequired(prevProps: Object) { //eslint-disable-line
    const { props, state } = this;

    if (prevProps !== props) {
      // validate props
      this.validateProps();

      const stateValue = state.value;

      const lastNumStr = state.numAsString || '';
      const lastValueWithNewFormat = this.formatNumString(lastNumStr);

      const formattedValue = props.value === undefined ? lastValueWithNewFormat : this.formatValueProp();
      const numAsString = this.removeFormatting(formattedValue);

      const floatValue = parseFloat(numAsString);
      const lastFloatValue = parseFloat(lastNumStr);

      if (((!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue) //eslint-disable-line
        || lastValueWithNewFormat !== stateValue) {
        this.setState({
          value: formattedValue,
          numAsString,
        });
      }
    }
  }

  /** Misc methods * */
  getFloatString(number: string = '') {
    let num = number;
    const { decimalScale } = this.props;
    const { decimalSeparator } = this.getSeparators();
    const numRegex = this.getNumberRegex(true);

    // remove negation for regex check
    const hasNegation = num[0] === '-';
    if (hasNegation) num = num.replace('-', '');

    // if decimal scale is zero remove decimal and number after decimalSeparator
    if (decimalSeparator && decimalScale === 0) {
      num = num.split(decimalSeparator)[0]; //eslint-disable-line
    }

    num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.');

    // remove extra decimals
    const firstDecimalIndex = num.indexOf('.');

    if (firstDecimalIndex !== -1) {
      num = `${num.substring(0, firstDecimalIndex)}.${num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), '')}`;
    }

    // add negation back
    if (hasNegation) num = `-${num}`;

    return num;
  }
  getNumberRegex(g: boolean, ignoreDecimalSeparator?: boolean) { // returned regex assumes decimalSeparator is as per prop
    const { format, decimalScale } = this.props;
    const { decimalSeparator } = this.getSeparators();
    return new RegExp(`\\d${decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? `|${escapeRegExp(decimalSeparator)}` : ''}`, g ? 'g' : undefined);
  }
  getSeparators() {
    const { decimalSeparator } = this.props;
    let { thousandSeparator } = this.props;

    if (thousandSeparator === true) {
      thousandSeparator = ',';
    }

    return {
      decimalSeparator,
      thousandSeparator,
    };
  }
  getMaskAtIndex(index: number) {
    const { mask = ' ' } = this.props;
    if (typeof mask === 'string') {
      return mask;
    }

    return mask[index] || ' ';
  }
  getValueObject(formattedValue: string, numAsString: string) {
    const floatValue = parseFloat(numAsString);

    return {
      formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? undefined : floatValue, //eslint-disable-line
    };
  }
  validateProps() {
    const { mask } = this.props;

    // validate decimalSeparator and thousandSeparator
    const { decimalSeparator, thousandSeparator } = this.getSeparators();

    if (decimalSeparator === thousandSeparator) {
      throw new Error(`
          Decimal separator can't be same as thousand separator.
          thousandSeparator: ${thousandSeparator} (thousandSeparator = {true} is same as thousandSeparator = ",")
          decimalSeparator: ${decimalSeparator} (default value for decimalSeparator is .)
       `);
    }

    // validate mask
    if (mask) {
      const maskAsStr = mask === 'string' ? mask : mask.toString();
      if (maskAsStr.match(/\d/g)) {
        throw new Error(`
          Mask ${mask} should not contain numeric character;
        `);
      }
    }
  }
  /** Misc methods end * */

  /** caret specific methods * */
  setPatchedCaretPosition(el, caretPos: number) {
    /* setting caret position within timeout of 0ms is required for mobile chrome,
    otherwise browser resets the caret position after we set it
    We are also setting it without timeout so that in normal browser we don't see the flickering */
    // setCaretPosition(el, this, caretPos);
    setTimeout(() => {
      setCaretPosition(el, this, caretPos);
    }, 0);
  }
  /* This keeps the caret within typing area so people can't type in between prefix or suffix */
  correctCaretPosition(value: string, caretPos: number, direction?: string) {
    const { prefix, suffix, format } = this.props;

    // if value is empty return 0
    if (value === '') return 0;

    // caret position should be between 0 and value length
    caretPos = clamp(caretPos, 0, value.length); // eslint-disable-line

    // in case of format as number limit between prefix and suffix
    if (!format) {
      const hasNegation = value[0] === '-';
      return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
    }

    // in case if custom format method don't do anything
    if (typeof format === 'function') return caretPos;

    /* in case format is string find the closest # position from the caret position */

    // in case the caretPos have input value on it don't do anything
    if (format[caretPos] === '#' && charIsNumber(value[caretPos])) return caretPos;

    // if caretPos is just after input value don't do anything
    if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) return caretPos;

    // find the nearest caret position
    const firstHashPosition = format.indexOf('#');
    const lastHashPosition = format.lastIndexOf('#');

    // limit the cursor between the first # position and the last # position
    caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1); // eslint-disable-line

    const nextPos = format.substring(caretPos, format.length).indexOf('#');
    let caretLeftBound = caretPos;
    const caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);

    // get the position where the last number is present
    while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))) {
      caretLeftBound -= 1;
    }

    const goToLeft = !charIsNumber(value[caretRightBound])
                    || (direction === 'left' && caretPos !== firstHashPosition)
                    || (caretPos - caretLeftBound < caretRightBound - caretPos);

    if (goToLeft) {
      // check if number should be taken after the bound or after it
      // if number preceding a valid number keep it after
      return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
    }

    return caretRightBound;
  }
  getCaretPosition(inputValue: string, formattedValue: string, caretPos: number) {
    const { format } = this.props;
    const { value: stateValue } = this.state;
    const numRegex = this.getNumberRegex(true);
    const inputNumber = (inputValue.match(numRegex) || []).join('');
    const formattedNumber = (formattedValue.match(numRegex) || []).join('');
    let j = 0;
    let i;

    for (i = 0; i < caretPos; i += 1) {
      const currentInputChar = inputValue[i] || '';
      const currentFormatChar = formattedValue[j] || '';
      // no need to increase new cursor position if formatted value does not have those characters
      // case inputValue = 1a23 and formattedValue =  123
      if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) continue; //eslint-disable-line

      // When we are striping out leading zeros maintain the new cursor position
      // Case inputValue = 00023 and formattedValue = 23;
      if (currentInputChar === '0' && currentFormatChar.match(numRegex) && currentFormatChar !== '0' && inputNumber.length !== formattedNumber.length) continue; //eslint-disable-line

      // we are not using currentFormatChar because j can change here
      while (currentInputChar !== formattedValue[j] && j < formattedValue.length) j += 1;
      j += 1;
    }

    if ((typeof format === 'string' && !stateValue)) {
    // set it to the maximum value so it goes after the last number
      j = formattedValue.length;
    }

    // correct caret position if its outside of editable area
    j = this.correctCaretPosition(formattedValue, j);

    return j;
  }
  /** caret specific methods ends * */


  /** methods to remove formattting * */
  removePrefixAndSuffix(value: string) {
    let val = value;
    const { format, prefix, suffix } = this.props;

    // remove prefix and suffix
    if (!format && val) {
      const isNegative = val[0] === '-';

      // remove negation sign
      if (isNegative) val = val.substring(1, val.length);

      // remove prefix
      val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;

      // remove suffix
      const suffixLastIndex = val.lastIndexOf(suffix);
      val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;

      // add negation sign back
      if (isNegative) val = `-${val}`;
    }

    return val;
  }
  removePatternFormatting(value: string) {
    const val = value;
    const { format } = this.props;
    const formatArray = format.split('#').filter((str) => str !== '');
    let start = 0;
    let numStr = '';

    for (let i = 0, ln = formatArray.length; i <= ln; i += 1) {
      const part = formatArray[i] || '';

      // if i is the last fragment take the index of end of the value
      // For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##
      const index = i === ln ? val.length : val.indexOf(part, start);

      /* in any case if we don't find the pattern part in the value assume the val as numeric string
      This will be also in case if user has started typing, in any other case it will not be -1
      unless wrong prop value is provided */
      if (index === -1) {
        numStr = val;
        break;
      } else {
        numStr += val.substring(start, index);
        start = index + part.length;
      }
    }

    return (numStr.match(/\d/g) || []).join('');
  }
  removeFormatting(value: string) {
    let val = value;
    const { format, removeFormatting } = this.props;
    if (!val) return val;

    if (!format) {
      val = this.removePrefixAndSuffix(val);
      val = this.getFloatString(val);
    } else if (typeof format === 'string') {
      val = this.removePatternFormatting(val);
    } else if (typeof removeFormatting === 'function') { // condition need to be handled if format method is provide,
      val = removeFormatting(val);
    } else {
      val = (val.match(/\d/g) || []).join('');
    }
    return val;
  }
  /** methods to remove formattting end * */


  /** * format specific methods start ** */
  /**
   * Format when # based string is provided
   * @param  {string} numStr Numeric String
   * @return {string}        formatted Value
   */
  formatWithPattern(numStr: string) {
    const { format } = this.props;
    let hashCount = 0;
    const formattedNumberAry = format.split('');
    for (let i = 0, ln = format.length; i < ln; i += 1) {
      if (format[i] === '#') {
        formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
        hashCount += 1;
      }
    }
    return formattedNumberAry.join('');
  }
  /**
   * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
   * @return {string} formatted Value
   */
  formatAsNumber(numStr: string) {
    const {
      decimalScale, fixedDecimalScale, prefix, suffix, allowNegative,
    } = this.props;
    const { thousandSeparator, decimalSeparator } = this.getSeparators();

    const hasDecimalSeparator = numStr.indexOf('.') !== -1 || (decimalScale && fixedDecimalScale);
    let { beforeDecimal, afterDecimal, addNegation } = splitDecimal(numStr, allowNegative); // eslint-disable-line prefer-const

    // apply decimal precision if its defined
    if (decimalScale !== undefined) afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);

    if (thousandSeparator) {
      beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparator}`);
    }

    // add prefix and suffix
    if (prefix) beforeDecimal = prefix + beforeDecimal;
    if (suffix) afterDecimal += suffix;

    // restore negation sign
    if (addNegation) beforeDecimal = `-${beforeDecimal}`;

    numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || '') + afterDecimal; // eslint-disable-line

    return numStr;
  }
  formatNumString(value: string = '') {
    const { format, allowEmptyFormatting } = this.props;
    let formattedValue = value;

    if (value === '' && !allowEmptyFormatting) {
      formattedValue = '';
    } else if (value === '-' && !format) {
      formattedValue = '-';
      value = ''; // eslint-disable-line
    } else if (typeof format === 'string') {
      formattedValue = this.formatWithPattern(formattedValue);
    } else if (typeof format === 'function') {
      formattedValue = format(formattedValue);
    } else {
      formattedValue = this.formatAsNumber(formattedValue);
    }

    return formattedValue;
  }
  formatValueProp() {
    const {
      format, decimalScale, fixedDecimalScale, allowEmptyFormatting,
    } = this.props;
    let { value, isNumericString } = this.props;

    const isNonNumericFalsy = !value && value !== 0;

    if (isNonNumericFalsy && allowEmptyFormatting) {
      value = '';
    }

    // if value is not defined return empty string
    if (isNonNumericFalsy && !allowEmptyFormatting) return '';

    if (typeof value === 'number') {
      value = value.toString();
      isNumericString = true;
    }

    // round the number based on decimalScale
    // format only if non formatted value is provided
    if (isNumericString && !format && typeof decimalScale === 'number') {
      value = roundToPrecision(value, decimalScale, fixedDecimalScale);
    }

    const formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);

    return formattedValue;
  }
  formatNegation(value: string = '') {
    const { allowNegative } = this.props;
    const negationRegex = new RegExp('(-)');
    const doubleNegationRegex = new RegExp('(-)(.)*(-)');

    // Check number has '-' value
    const hasNegation = negationRegex.test(value);

    // Check number has 2 or more '-' values
    const removeNegation = doubleNegationRegex.test(value);

    // remove negation
    value = value.replace(/-/g, ''); //eslint-disable-line

    if (hasNegation && !removeNegation && allowNegative) {
      value = `-${value}`; //eslint-disable-line
    }

    return value;
  }
  formatInput(value: string = '') {
    const { format } = this.props;

    // format negation only if we are formatting as number
    if (!format) {
      value = this.formatNegation(value); //eslint-disable-line
    }

    // remove formatting from number
    value = this.removeFormatting(value); //eslint-disable-line

    return this.formatNumString(value);
  }
  /** * format specific methods end ** */


  isCharacterAFormat(caretPos: number, value: string) {
    const {
      format, prefix, suffix, decimalScale, fixedDecimalScale,
    } = this.props;
    const { decimalSeparator } = this.getSeparators();

    // check within format pattern
    if (typeof format === 'string' && format[caretPos] !== '#') return true;

    // check in number format
    if (!format && (caretPos < prefix.length
      || caretPos >= value.length - suffix.length
      || (decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator))
    ) {
      return true;
    }

    return false;
  }
  checkIfFormatGotDeleted(start: number, end: number, value: string) {
    for (let i = start; i < end; i += 1) {
      if (this.isCharacterAFormat(i, value)) return true;
    }
    return false;
  }
  /**
   * This will check if any formatting got removed by the delete or backspace and reset the value
   * It will also work as fallback if android chome keyDown handler does not work
   * */
  correctInputValue(caretPos: number, lastValue: string, value: string) {
    const { format, decimalSeparator, allowNegative } = this.props;
    const { numAsString } = this.state;
    const lastNumStr = numAsString || '';
    const { start: selectionStart, end: selectionEnd } = this.selection;
    const { start, end } = findChangedIndex(lastValue, value);

    /* don't do anyhting if something got added,
     or if value is empty string (when whole input is cleared)
     or whole input is replace with a number
    */
    if (
      value.length > lastValue.length
      || !value.length
      || start === end
      || (start === 0 && end === lastValue.length)
      || (selectionStart === 0 && selectionEnd === lastValue.length)
    ) {
      return value;
    }

    // if format got deleted reset the value to last value
    if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
      value = lastValue; //eslint-disable-line
    }

    // for numbers check if beforeDecimal got deleted and there is nothing after decimal,
    // clear all numbers in such case while keeping the - sign
    if (!format) {
      const numericString = this.removeFormatting(value);
      let { beforeDecimal, afterDecimal, addNegation } = splitDecimal(numericString, allowNegative); // eslint-disable-line prefer-const

      // clear only if something got deleted
      const isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
      if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === '' && !parseFloat(afterDecimal)) {
        return addNegation ? '-' : '';
      }
    }

    return value;
  }

  onChange = (e) => {
    e.persist();
    const el = e.nativeEvent;
    let { text: inputValue } = el;
    const { isAllowed, onValueChange, onChange } = this.props;
    const { value } = this.state;
    const lastValue = value || '';

    const { start, end } = this.selection;
    let currentCaretPosition = Math.max(start, end);
    if (/\d/.test(this.key)) {
      currentCaretPosition += 1;
    }
    inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);


    let formattedValue = this.formatInput(inputValue) || '';
    const numAsString = this.removeFormatting(formattedValue);
    const valueObj = this.getValueObject(formattedValue, numAsString);

    if (!isAllowed(valueObj)) {
      formattedValue = lastValue;
    }

    // get the caret position
    const caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
    // set caret position
    this.setPatchedCaretPosition(el, caretPos, formattedValue);

    // change the state
    if (formattedValue !== lastValue) {
      this.setState({ value: formattedValue, numAsString }, () => {
        onValueChange(valueObj, e);
        onChange(e);
      });
    } else {
      onChange(e);
    }
  }
  onBlur = (e) => {
    const { format, onBlur, onValueChange } = this.props;
    let { numAsString } = this.state;
    const { value: lastValue } = this.state;

    if (!format) {
      numAsString = fixLeadingZero(numAsString);
      const formattedValue = this.formatNumString(numAsString);

      // change the state
      if (formattedValue !== lastValue) {
        // the event needs to be persisted because its properties can be accessed in an asynchronous way
        e.persist();
        this.setState({ value: formattedValue, numAsString }, () => {
          const valueObj = this.getValueObject(formattedValue, numAsString);
          onValueChange(valueObj, e);
          onBlur(e);
        });
        return;
      }
    }
    onBlur(e);
  }
  onKeyPress = (e) => {
    const el = e.nativeEvent;
    const { key } = el;
    const { value } = this.state;
    const { start, end } = this.selection;

    let expectedCaretPosition;
    const {
      decimalScale, fixedDecimalScale, prefix, suffix, format, onKeyPress, onValueChange,
    } = this.props;
    const ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
    const numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
    const negativeRegex = new RegExp('-');
    const isPatternFormat = typeof format === 'string';
    this.key = key;


    // Handle backspace and delete against non numerical/decimal characters or arrow keys
    if (key === 'ArrowLeft' || key === 'Backspace') {
      expectedCaretPosition = start - 1;
    } else if (key === 'ArrowRight') {
      expectedCaretPosition = start + 1;
    } else if (key === 'Delete') {
      expectedCaretPosition = start;
    }

    // if expectedCaretPosition is not set it means we don't want to Handle keyDown
    // also if multiple characters are selected don't handle
    if (expectedCaretPosition === undefined || start !== end) {
      onKeyPress(e);
      return;
    }

    let newCaretPosition = expectedCaretPosition;
    const leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
    const rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const direction = key === 'ArrowLeft' ? 'left' : 'right';
      newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
    } else if (key === 'Delete'
          && !numRegex.test(value[expectedCaretPosition])
          && !negativeRegex.test(value[expectedCaretPosition])) {
      while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
        newCaretPosition += 1;
      }
    } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
      /* NOTE: This is special case when backspace is pressed on a
      negative value while the cursor position is after prefix. We can't handle it on onChange because
      we will not have any information of keyPress
      */
      if (start <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
        const newValue = value.substring(1);
        const numAsString = this.removeFormatting(newValue);
        const valueObj = this.getValueObject(newValue, numAsString);

        // persist event before performing async task
        e.persist();
        this.setState({ value: newValue, numAsString }, () => {
          this.setPatchedCaretPosition(el, newCaretPosition, newValue);
          onValueChange(valueObj, e);
        });
      } else if (!negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
          newCaretPosition -= 1;
        }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
      }
    }

    if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    this.key = '';
    onKeyPress(e);
  }
  onSelectionChange = (e) => {
    const el = e.nativeEvent;
    const { selection: { start, end } } = el;
    const { value } = this.state;
    const { start: lastStart, end: lastEnd } = this.selection;

    if (this.key
      && (lastStart !== start || lastEnd !== end)) {
      setTimeout(() => {
        this.selection = { start, end };
      }, 0);
      return;
    }

    if (start === end) {
      const caretPosition = this.correctCaretPosition(value, start);
      if (caretPosition !== start) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }
    }
  }
  onFocus = (e) => {
    // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
    // (onFocus event target selectionStart is always 0 before setTimeout)
    e.persist();
    setTimeout(() => {
      const el = e.nativeEvent;
      const { onFocus } = this.props;
      const { value } = this.state;
      const { selection: { start, end } } = this;

      const caretPosition = this.correctCaretPosition(value, start);

      // setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
      if (caretPosition !== start && !(start === 0 && end === value.length)) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }

      onFocus(e);
    }, 0);
  }

  render() {
    const {
      displayType, customInput, renderText, getInputRef,
    } = this.props;
    const { value } = this.state;

    const otherProps = omit(this.props, propTypes);

    const inputProps = Object.assign({}, otherProps, {
      value,
      // selection: this.selection,
      keyboardType: 'numeric',
      onSelectionChange: this.onSelectionChange,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    });


    if (displayType === 'text') {
      return renderText ? (renderText(value) || null) : <Text {...otherProps} ref={getInputRef}>{value}</Text>;
    }

    if (customInput) {
      const CustomInput = customInput;
      return (
        <CustomInput
          {...inputProps}
        />
      );
    }

    return (
      <TextInput
        style={{
          borderColor: 'red',
          borderWidth: 1,
          width: 200,
          height: 44,
          flex: 0,
        }}
        {...inputProps}
        ref={(ref) => { this.inputRef = ref; }}
      />
    );
  }
}

NumberFormat.defaultProps = defaultProps;
NumberFormat.propTypes = propTypes;

export default NumberFormat;
