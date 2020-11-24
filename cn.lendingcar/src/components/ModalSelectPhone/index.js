import AndroidPicker from './AndroidPicker';
import IOSPicker from './IOSPicker';
import styles from './styles';
export const ModalSelect = styles.isIOS ? IOSPicker : AndroidPicker;
export default ModalSelect;
