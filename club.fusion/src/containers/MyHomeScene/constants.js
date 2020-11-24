/*
 *
 * MyHomeScene constants
 *
 */
import myFavouritesImage from './assets/myFavourites.png';
import myNewsImage from './assets/myNews.png';
import myBonusImage from './assets/myBonus.png';

export const TRACKS_OPTIONS = [
  {
    label: 'myFavourites',
    image: myFavouritesImage,
    sceneKey: 'myFavourites',
  },
  {
    label: 'myNews2',
    image: myNewsImage,
    sceneKey: 'myNews',
  },
  {
    label: 'myBonus',
    image: myBonusImage,
    sceneKey: 'bonus',
  },
];

export const LOAD_MEMBERSHIPS_POINT = 'src/MyHomeScene/LOAD_MEMBERSHIPS_POINT';
export const LOAD_MEMBERSHIPS_POINT_SUCCESS = 'src/MyHomeScene/LOAD_MEMBERSHIPS_POINT_SUCCESS';
export const LOAD_MEMBERSHIPS_POINT_FAIL = 'src/MyHomeScene/LOAD_MEMBERSHIPS_POINT_FAIL';
