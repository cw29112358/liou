import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';

export const selectMemberSceneReducer = (state) => state.get('memberBenefitScene', Immutable.Map());

export const selectisLoading = createGetSelector(
  selectMemberSceneReducer, 'isLoading', false,
);
export const selectMemberBenefitsData = createGetSelector(
  selectMemberSceneReducer, 'benefitsData', Immutable.Map(),
);

export const selectUserAppointments = createGetSelector(
  selectMemberSceneReducer, 'appointments', Immutable.List(),
);

export const selectSuperCarAppointment = createSelector(
  selectUserAppointments,
  (appoinments) => {
    if (appoinments.size <= 0) return null;
    return appoinments.filter((item) => item.get('type') === 'supercar');
  }
);
export const selectPickupAppointment = createSelector(
  selectUserAppointments,
  (appoinments) => {
    if (appoinments.size <= 0) return null;
    return appoinments.filter((item) => item.get('type') === 'pickup')
      .sortBy((item) => {
        const createdDate = item.get('createdAt');
        const unix = moment(createdDate).unix();
        return -unix;
      });
  }
);
