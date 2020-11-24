import projectImage from './assets/project.png';
import projectActiveImage from './assets/projectActive.png';
import connectionImage from './assets/connection.png';
import connectionActiveImage from './assets/connectionActive.png';
import releaseImage from './assets/release.png';
import releaseActiveImage from './assets/releaseActive.png';
import myImage from './assets/my.png';
import myActiveImage from './assets/myActive.png';

export const FOOTER_BUTTONS = {
  project: {
    label: 'project',
    greyImage: projectImage,
    activeImage: projectActiveImage,
  },
  connection: {
    label: 'connection',
    greyImage: connectionImage,
    activeImage: connectionActiveImage,
  },
  release: {
    label: 'release',
    greyImage: releaseImage,
    activeImage: releaseActiveImage,
  },
  my: {
    label: 'my',
    greyImage: myImage,
    activeImage: myActiveImage,
  },
  cardHome: {
    label: 'cardHome',
    greyImage: projectImage,
    activeImage: projectActiveImage,
  },
  cardPackage: {
    label: 'cardPackage',
    greyImage: releaseImage,
    activeImage: releaseActiveImage,
  },
};
