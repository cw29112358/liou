/*
 * 在这里添加新建的formFields
 */
// IMPORT FORM_FIELDS
import InternationalPhoneField from './InternationalPhoneField';
import AreaPickerInput from './AreaPickerInput';
import TextareaInput from './TextareaInput';
import NumberInput from './NumberInput';
import Avatar from './Avatar';
import DateTimeSelectInput from './DateTimeSelectInput';
import RadioButton from './RadioButton';
import SelectInputPhone from './SelectInputPhone';
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
  areaPickerInput: AreaPickerInput,
  internationalPhoneField: InternationalPhoneField,
  selectInputPhone: SelectInputPhone,
};
