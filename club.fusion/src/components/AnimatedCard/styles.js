import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  deviceWidth,
  cardWidth: deviceWidth * 0.72,
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};
