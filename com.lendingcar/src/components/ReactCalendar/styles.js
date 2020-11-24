import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIOS,
} = variables;

export default {
  deviceWidth,
  calendarView: {
    marginTop: 25,
  },
  arrow: {
    color: commonColor.greyLight,
  },
  themeStyle: {
    textDisabledColor: commonColor.greyLight,
    // Sun Mon的颜色
    textSectionTitleColor: commonColor.black,
    textDayHeaderFontSize: 14,
    todayTextColor: commonColor.black,
    selectedDayTextColor: commonColor.white,
    textMonthFontSize: 20,
    textMonthFontWeight: '700',
    monthTextColor: commonColor.black,
    calendarWidth: deviceWidth,
    'stylesheet.calendar.main': {
      container: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    'stylesheet.calendar.header': {
      week: {
        marginTop: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: commonColor.white,
        shadowColor: commonColor.shadowColorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1.2,
        borderBottomWidth: isIOS ? 0 : 0.5,
        borderBottomColor: commonColor.greyer,
        marginBottom: isIOS ? 32 : 20,
      },
      dayHeader: {
        width: 35,
        textAlign: 'center',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: deviceWidth + 65,
        marginLeft: -30,
      },
    },
    'stylesheet.day.basic': {
      selected: {
        backgroundColor: commonColor.brand,
        borderRadius: 16,
        shadowColor: commonColor.shadowColorBrand,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
      },
      today: {
        backgroundColor: commonColor.greyer,
        borderRadius: 16,
      },
    },
  },
};
