import * as commonColor from 'commonColor';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_FORMAT_YMD = 'YYYY/MM/DD';
export const CALCULATE_DATE_FORMAT = 'YYYY-MM-DD';

// PHONE_AREA_CODE
export const PHONE_AREA_CODE = [
  { label: 'usa', value: 1 },
  { label: 'chinaPhone', value: 86 },
];
export const PHONE_AREA = {
  1: {
    area: 'en-US',
    min: 10,
    max: 10,
  },
  86: {
    area: 'zh-CN',
    min: 11,
    max: 11,
  },
};

export const LIST_LIMIT = 10;

export const LINEAR_PROPS = {
  linearStart: { x: 0.1, y: 1 },
  linearEnd: { x: 0.9, y: 1 },
  linearColors: [commonColor.purple, commonColor.brand],
};

export const JMESSAGE_INIT_PARAMS = {
  appkey: 'e2c8cdb1b1415d3a4ce190f2',
  isOpenMessageRoaming: true,
  isProduction: true,
};

export const MEMBER_TEL = '833-206-0789';
export const VERIFY_CONTACT_EMAIL = 'contact@globalmerchantsunion.com';

// image size
export const MOBILE_IMG_DIM = { // width x height
  carImages: '320x240',
  profileLogo: '',
  notificationImages: '',
  notificationPromotionImages: '',
};
export const NORMAL_IMG_DIM = {
  carImages: '640x480',
  profileLogo: '300x300',
};

// DateTimeSelectInput
export const DATE_CONFIG = {};

// Avatar
export const PHOTO_UPLOAD_CONFIG = {
  zh: {
    photoPickerTitle: '选取照片',
    imagePickerProps: {
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册中选择照片',
      cancelButtonTitle: '取消',
    },
  },
};
export const AVATAR_DATE_SEPARATOR = '-';

// ReactCalendar
export const WEEK_DAYS_NAMES = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
export const TIME_SEPARATOR = '/';

// money unit
export const MONEY_UNIT = {
  unit: '$',
  negativeUnit: '- $',
};

// select options
export const OPTIONS_STATE = [
  { label: 'AL', value: 'al' },
  { label: 'AK', value: 'ak' },
  { label: 'AZ', value: 'az' },
  { label: 'AR', value: 'ar' },
  { label: 'CA', value: 'ca' },
  { label: 'CO', value: 'co' },
  { label: 'CT', value: 'ct' },
  { label: 'DE', value: 'de' },
  { label: 'DC', value: 'dc' },
  { label: 'FL', value: 'fl' },
  { label: 'GA', value: 'ga' },
  { label: 'HI', value: 'hi' },
  { label: 'ID', value: 'id' },
  { label: 'IL', value: 'il' },
  { label: 'IN', value: 'in' },
  { label: 'IA', value: 'ia' },
  { label: 'KS', value: 'ks' },
  { label: 'KY', value: 'ky' },
  { label: 'LA', value: 'la' },
  { label: 'ME', value: 'me' },
  { label: 'MD', value: 'md' },
  { label: 'MA', value: 'ma' },
  { label: 'MN', value: 'mn' },
  { label: 'MS', value: 'ms' },
  { label: 'MO', value: 'mo' },
  { label: 'MT', value: 'mt' },
  { label: 'NE', value: 'ne' },
  { label: 'NV', value: 'nv' },
  { label: 'NH', value: 'nh' },
  { label: 'NJ', value: 'nj' },
  { label: 'NM', value: 'nm' },
  { label: 'NY', value: 'ny' },
  { label: 'NC', value: 'nc' },
  { label: 'ND', value: 'nd' },
  { label: 'OH', value: 'oh' },
  { label: 'OK', value: 'ok' },
  { label: 'OR', value: 'or' },
  { label: 'PA', value: 'pa' },
  { label: 'RI', value: 'ri' },
  { label: 'SC', value: 'sc' },
  { label: 'SD', value: 'sd' },
  { label: 'TN', value: 'tn' },
  { label: 'TX', value: 'tx' },
  { label: 'UT', value: 'ut' },
  { label: 'VT', value: 'vt' },
  { label: 'VA', value: 'va' },
  { label: 'WA', value: 'wa' },
  { label: 'WV', value: 'wv' },
  { label: 'WI', value: 'wi' },
  { label: 'WY', value: 'wy' },
];
export const OPTIONS_GENDER = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
];
export const OPTIONS_DRIVER_LICENSE_TYPE = [
  { label: 'international', value: 'international' },
  { label: 'foreign', value: 'foreign' },
  { label: 'unitedStates', value: 'unitedStates' },
];
export const OPTIONS_COUNTRY = [
  { label: 'Afghanistan', value: 'afghanistan' },
  { label: 'Albania', value: 'albania' },
  { label: 'Algeria', value: 'algeria' },
  { label: 'Andorra', value: 'andorra' },
  { label: 'Angola', value: 'angola' },
  { label: 'Anguilla', value: 'anguilla' },
  { label: 'Antigua Barbuda', value: 'antiguaBarbuda' },
  { label: 'Argentina', value: 'argentina' },
  { label: 'Armenia', value: 'armenia' },
  { label: 'Aruba', value: 'aruba' },
  { label: 'Australia', value: 'australia' },
  { label: 'Austria', value: 'austria' },
  { label: 'Azerbaijan', value: 'azerbaijan' },
  { label: 'Bahamas', value: 'bahamas' },
  { label: 'Bahrain', value: 'bahrain' },
  { label: 'Bangladesh', value: 'bangladesh' },
  { label: 'Barbados', value: 'barbados' },
  { label: 'Belarus', value: 'belarus' },
  { label: 'Belgium', value: 'belgium' },
  { label: 'Belize', value: 'belize' },
  { label: 'Benin', value: 'benin' },
  { label: 'Bermuda', value: 'bermuda' },
  { label: 'Bhutan', value: 'bhutan' },
  { label: 'Bolivia', value: 'bolivia' },
  { label: 'Bosnia Herzegovina', value: 'bosniaHerzegovina' },
  { label: 'Botswana', value: 'botswana' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'British Virgin Islands', value: 'britishVirginIslands' },
  { label: 'Brunei', value: 'brunei' },
  { label: 'Bulgaria', value: 'bulgaria' },
  { label: 'Burkina Faso', value: 'burkinaFaso' },
  { label: 'Burundi', value: 'burundi' },
  { label: 'Cambodia', value: 'cambodia' },
  { label: 'Cameroon', value: 'cameroon' },
  { label: 'Canada', value: 'canada' },
  { label: 'Cape Verde', value: 'capeVerde' },
  { label: 'Cayman Islands', value: 'caymanIslands' },
  { label: 'Chad', value: 'chad' },
  { label: 'Chile', value: 'chile' },
  { label: 'China', value: 'china' },
  { label: 'Colombia', value: 'colombia' },
  { label: 'Congo', value: 'congo' },
  { label: 'Cook Islands', value: 'cookIslands' },
  { label: 'Costa Rica', value: 'costaRica' },
  { label: 'Cote D Ivoire', value: 'coteDIvoire' },
  { label: 'Croatia', value: 'croatia' },
  { label: 'Cuba', value: 'cuba' },
  { label: 'Cyprus', value: 'cyprus' },
  { label: 'Czech Republic', value: 'czechRepublic' },
  { label: 'Denmark', value: 'denmark' },
  { label: 'Djibouti', value: 'djibouti' },
  { label: 'Dominica', value: 'dominica' },
  { label: 'Dominican Republic', value: 'dominicanRepublic' },
  { label: 'Ecuador', value: 'ecuador' },
  { label: 'Egypt', value: 'egypt' },
  { label: 'El Salvador', value: 'elSalvador' },
  { label: 'Equatorial Guinea', value: 'equatorialGuinea' },
  { label: 'Estonia', value: 'estonia' },
  { label: 'Ethiopia', value: 'ethiopia' },
  { label: 'Falkland Islands', value: 'falklandIslands' },
  { label: 'Faroe Islands', value: 'faroeIslands' },
  { label: 'Fiji', value: 'fiji' },
  { label: 'Finland', value: 'finland' },
  { label: 'France', value: 'france' },
  { label: 'French Polynesia', value: 'frenchPolynesia' },
  { label: 'French West Indies', value: 'frenchWestIndies' },
  { label: 'Gabon', value: 'gabon' },
  { label: 'Gambia', value: 'gambia' },
  { label: 'Georgia', value: 'georgia' },
  { label: 'Germany', value: 'germany' },
  { label: 'Ghana', value: 'ghana' },
  { label: 'Gibraltar', value: 'gibraltar' },
  { label: 'Greece', value: 'greece' },
  { label: 'Greenland', value: 'greenland' },
  { label: 'Grenada', value: 'grenada' },
  { label: 'Guam', value: 'guam' },
  { label: 'Guatemala', value: 'guatemala' },
  { label: 'Guernsey', value: 'guernsey' },
  { label: 'Guinea', value: 'guinea' },
  { label: 'Guinea Bissau', value: 'guineaBissau' },
  { label: 'Guyana', value: 'guyana' },
  { label: 'Haiti', value: 'haiti' },
  { label: 'Honduras', value: 'honduras' },
  { label: 'Hong Kong', value: 'hongKong' },
  { label: 'Hungary', value: 'hungary' },
  { label: 'Iceland', value: 'iceland' },
  { label: 'India', value: 'india' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Iran', value: 'iran' },
  { label: 'Iraq', value: 'iraq' },
  { label: 'Ireland', value: 'ireland' },
  { label: 'Isle of Man', value: 'isleOfMan' },
  { label: 'Israel', value: 'israel' },
  { label: 'Italy', value: 'italy' },
  { label: 'Jamaica', value: 'jamaica' },
  { label: 'Japan', value: 'japan' },
  { label: 'Jersey', value: 'jersey' },
  { label: 'Jordan', value: 'jordan' },
  { label: 'Kazakhstan', value: 'kazakhstan' },
  { label: 'Kenya', value: 'kenya' },
  { label: 'Kuwait', value: 'kuwait' },
  { label: 'Kyrgyz Republic', value: 'kyrgyzRepublic' },
  { label: 'Laos', value: 'laos' },
  { label: 'Latvia', value: 'latvia' },
  { label: 'Lebanon', value: 'lebanon' },
  { label: 'Lesotho', value: 'lesotho' },
  { label: 'Liberia', value: 'liberia' },
  { label: 'Libya', value: 'libya' },
  { label: 'Liechtenstein', value: 'liechtenstein' },
  { label: 'Lithuania', value: 'lithuania' },
  { label: 'Luxembourg', value: 'luxembourg' },
  { label: 'Macau', value: 'macau' },
  { label: 'Macedonia', value: 'macedonia' },
  { label: 'Madagascar', value: 'madagascar' },
  { label: 'Malawi', value: 'malawi' },
  { label: 'Malaysia', value: 'malaysia' },
  { label: 'Maldives', value: 'maldives' },
  { label: 'Mali', value: 'mali' },
  { label: 'Malta', value: 'malta' },
  { label: 'Mauritania', value: 'mauritania' },
  { label: 'Mauritius', value: 'mauritius' },
  { label: 'Mexico', value: 'mexico' },
  { label: 'Moldova', value: 'moldova' },
  { label: 'Monaco', value: 'monaco' },
  { label: 'Mongolia', value: 'mongolia' },
  { label: 'Montenegro', value: 'montenegro' },
  { label: 'Montserrat', value: 'montserrat' },
  { label: 'Morocco', value: 'morocco' },
  { label: 'Mozambique', value: 'mozambique' },
  { label: 'Namibia', value: 'namibia' },
  { label: 'Nepal', value: 'nepal' },
  { label: 'Netherlands', value: 'netherlands' },
  { label: 'Netherlands Antilles', value: 'netherlandsAntilles' },
  { label: 'New Caledonia', value: 'newCaledonia' },
  { label: 'New Zealand', value: 'newZealand' },
  { label: 'Nicaragua', value: 'nicaragua' },
  { label: 'Niger', value: 'niger' },
  { label: 'Nigeria', value: 'nigeria' },
  { label: 'North Korea', value: 'northKorea' },
  { label: 'Norway', value: 'norway' },
  { label: 'Oman', value: 'oman' },
  { label: 'Pakistan', value: 'pakistan' },
  { label: 'Palestine', value: 'palestine' },
  { label: 'Panama', value: 'panama' },
  { label: 'Papua New Guinea', value: 'papuaNewGuinea' },
  { label: 'Paraguay', value: 'paraguay' },
  { label: 'Peru', value: 'peru' },
  { label: 'Philippines', value: 'philippines' },
  { label: 'Poland', value: 'poland' },
  { label: 'Portugal', value: 'portugal' },
  { label: 'Puerto Rico', value: 'puertoRico' },
  { label: 'Qatar', value: 'qatar' },
  { label: 'Reunion', value: 'reunion' },
  { label: 'Romania', value: 'romania' },
  { label: 'Russia', value: 'russia' },
  { label: 'Rwanda', value: 'rwanda' },
  { label: 'Saint Pierre Miquelon', value: 'saintPierreMiquelon' },
  { label: 'Samoa', value: 'samoa' },
  { label: 'San Marino', value: 'sanMarino' },
  { label: 'Saudi Arabia', value: 'saudiArabia' },
  { label: 'Senegal', value: 'senegal' },
  { label: 'Serbia', value: 'serbia' },
  { label: 'Seychelles', value: 'seychelles' },
  { label: 'Sierra Leone', value: 'sierraLeone' },
  { label: 'Singapore', value: 'singapore' },
  { label: 'Slovakia', value: 'slovakia' },
  { label: 'Slovenia', value: 'slovenia' },
  { label: 'South Africa', value: 'southAfrica' },
  { label: 'South Korea', value: 'southKorea' },
  { label: 'Spain', value: 'spain' },
  { label: 'Sri Lanka', value: 'sriLanka' },
  { label: 'St Kitts Nevis', value: 'stKittsNevis' },
  { label: 'St Lucia', value: 'stLucia' },
  { label: 'Sudan', value: 'sudan' },
  { label: 'Suriname', value: 'suriname' },
  { label: 'Swaziland', value: 'swaziland' },
  { label: 'Sweden', value: 'sweden' },
  { label: 'Switzerland', value: 'switzerland' },
  { label: 'Syria', value: 'syria' },
  { label: 'Taiwan', value: 'taiwan' },
  { label: 'Tajikistan', value: 'tajikistan' },
  { label: 'Tanzania', value: 'tanzania' },
  { label: 'Thailand', value: 'thailand' },
  { label: 'Timor L`Este', value: 'timorLEste' },
  { label: 'Togo', value: 'togo' },
  { label: 'Tonga', value: 'tonga' },
  { label: 'Trinidad Tobago', value: 'trinidadTobago' },
  { label: 'Tunisia', value: 'tunisia' },
  { label: 'Turkey', value: 'turkey' },
  { label: 'Turkmenistan', value: 'turkmenistan' },
  { label: 'Turks Caicos', value: 'turksCaicos' },
  { label: 'Uganda', value: 'uganda' },
  { label: 'Ukraine', value: 'ukraine' },
  { label: 'United Arab Emirates', value: 'unitedArabEmirates' },
  { label: 'United Kingdom', value: 'unitedKingdom' },
  { label: 'United States', value: 'unitedStates' },
  { label: 'Uruguay', value: 'uruguay' },
  { label: 'Uzbekistan', value: 'uzbekistan' },
  { label: 'Venezuela', value: 'venezuela' },
  { label: 'Vietnam', value: 'vietnam' },
  { label: 'Virgin Islands (US)', value: 'virginIslandsUs' },
  { label: 'Yemen', value: 'yemen' },
  { label: 'Zambia', value: 'zambia' },
  { label: 'Zimbabwe', value: 'zimbabwe' },
];
export const SEEK_METHODS = [
  { label: 'collaboration', value: 'collaboration' },
  { label: 'fundraising', value: 'fundraising' },
];
export const OPTIONS_FUND_UNIT = [
  { label: '10kusd', value: '10kusd' },
  { label: '10kcny', value: '10kcny' },
];
// placeholder

// labels

// validate

// format
export const FORMAT_ZIP_CODE = {
  format: '#####',
  mask: '#',
};

// array(string)
