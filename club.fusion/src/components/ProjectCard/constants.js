/*
 *
 * HomeScene constants
 *
 */
import { getPadSize } from 'utils/helpers';

import industryImage from './assets/industry.png';
import debtImage from './assets/debt.png';
import fundImage from './assets/fund.png';
import cityImage from './assets/city.png';
import collaborationImage from './assets/collaboration.png';
import equityImage from './assets/equity.png';

export const PROJECT_BASE_IMAGE = {
  industry: {
    source: industryImage,
    style: {
      width: getPadSize(12),
      height: getPadSize(11),
      marginRight: 4,
    },
  },
  debt: {
    source: debtImage,
    style: {
      width: getPadSize(14),
      height: getPadSize(14),
      marginRight: 4,
    },
  },
  collaboration: {
    source: collaborationImage,
    style: {
      width: getPadSize(14),
      height: getPadSize(14),
      marginRight: 4,
    },
  },
  equity: {
    source: equityImage,
    style: {
      width: getPadSize(14),
      height: getPadSize(14),
      marginRight: 4,
    },
  },
  fund: {
    source: fundImage,
    style: {
      width: getPadSize(13),
      height: getPadSize(13),
      marginRight: 4,
    },
  },
  area: {
    source: cityImage,
    style: {
      width: getPadSize(10),
      height: getPadSize(12),
      marginRight: 4,
    },
  },
};

export const DETAIL_LIST = {
  collaboration: [],
  equity: [
    'fundRequest',
    'transferPercent',
    'valuation',
  ],
  debt: [
    'fundRequest',
    'period',
    'interestPercent',
  ],
};
