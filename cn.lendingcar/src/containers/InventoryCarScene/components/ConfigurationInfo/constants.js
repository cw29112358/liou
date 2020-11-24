import carImage from './assets/car.png';
import calendarImage from './assets/calendar.png';
import mileageImage from './assets/mileage.png';
import seatImage from './assets/seat.png';

import styles from './styles';

export const CONFIGURATION_LIST = {
  mileage: {
    image: mileageImage,
    style: styles.iconCar,
  },
  year: {
    image: calendarImage,
    style: styles.icon,
  },
  size: {
    image: carImage,
    style: styles.iconCar,
  },
  occupancy: {
    image: seatImage,
    style: styles.icon,
  },
};
