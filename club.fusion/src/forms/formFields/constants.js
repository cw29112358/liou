/*
 * 在这里添加新建的formFields
 */
// IMPORT FORM_FIELDS
import Media from './Media';
import MonthYearInput from './MonthYearInput';
import AdderButton from './AdderButton';
import TextareaInput from './TextareaInput';
import NumberInput from './NumberInput';
import Avatar from './Avatar';
import DateTimeSelectInput from './DateTimeSelectInput';
import RadioButton from './RadioButton';
import Switch from './Switch';
import SelectInput from './SelectInput';
import TextInput from './TextInput';

export const ALL_FIELDS = {
  textInput: TextInput,
  selectInput: SelectInput,
  radioButton: RadioButton,
  switch: Switch,
  dateTimeSelectInput: DateTimeSelectInput,
  avatar: Avatar,
  textareaInput: TextareaInput,
  numberInput: NumberInput,
  adderButton: AdderButton,
  monthYearInput: MonthYearInput,
  media: Media,
};
