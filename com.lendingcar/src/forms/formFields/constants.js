/*
 * 在这里添加新建的formFields
 */

// IMPORT FORM_FIELDS
import InternationalPhoneField from './InternationalPhoneField';
import LoanFormFieldsArray from './LoanFormFieldsArray';
import MultiRadioButtonInput from './MultiRadioButtonInput';
import MonthYearInput from './MonthYearInput';
import DateTimeSelectRangeInput from './DateTimeSelectRangeInput';
import TextareaInput from './TextareaInput';
import NumberInput from './NumberInput';
import Avatar from './Avatar';
import DateTimeSelectInput from './DateTimeSelectInput';
import RadioButton from './RadioButton';
import SelectInput from './SelectInput';
import TextInput from './TextInput';

export const ALL_FIELDS = {
  textInput: TextInput,
  selectInput: SelectInput,
  radioButton: RadioButton,
  dateTimeSelectInput: DateTimeSelectInput,
  avatar: Avatar,
  textareaInput: TextareaInput,
  numberInput: NumberInput,
  dateTimeSelectRangeInput: DateTimeSelectRangeInput,
  monthYearInput: MonthYearInput,
  multiRadioButtonInput: MultiRadioButtonInput,
  loanFormFieldsArray: LoanFormFieldsArray,
  internationalPhoneField: InternationalPhoneField,
};
