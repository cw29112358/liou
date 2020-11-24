/*
 *
 * MyTripPage constants
 *
 */
export const MYTRIP_LOAD = 'app/MyTripPage/MYTRIP_LOAD';
export const MYTRIP_LOAD_SUCCESS = 'app/MyTripPage/MYTRIP_LOAD_SUCCESS';
export const MYTRIP_LOAD_FAIL = 'app/MyTripPage/MYTRIP_LOAD_FAIL';
export const MYTRIP_NOTLATEST = 'app/MyTripPage/MYTRIP_NOTLATEST';
export const USER_LOGOUT_MYTIRP = 'app/MyTripPage/USER_LOGOUT_MYTIRP';
export const tripTypes = [
  {
    propName: 'all',
    listName: 'allTrips',
    title: 'All Trip',
  },
  {
    propName: 'pending',
    listName: 'upcommingTrips',
    title: 'Upcomming',
  },
  {
    propName: 'leasing',
    listName: 'rentingTrips',
    title: 'Renting',
  },
  {
    propName: 'canceled',
    listName: 'canceledTrips',
    title: 'Canceled',
  },
  {
    propName: 'returned',
    listName: 'finishedTrips',
    title: 'Finished',
  },
];
