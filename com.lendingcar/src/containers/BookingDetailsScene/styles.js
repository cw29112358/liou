import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  content: {
    backgroundColor: commonColor.white,
  },
  header: {
    zIndex: 1,
    width: deviceWidth,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    elevation: 3,
  },
  questionIcon: {
    paddingLeft: 6,
    paddingRight: 12,
    fontSize: 14,
    color: commonColor.grey650,
  },
  orangeText: {
    paddingTop: 6,
    paddingBottom: 6,
    color: commonColor.textOrange,
  },
  divisionLineItem: {
    marginLeft: 6,
    marginRight: 6,
  },
  switchButton: {
    marginTop: 1,
    marginBottom: 7,
  },
  imageViewStyle: {
    height: 200,
  },

  telText: {
    fontSize: 14,
    lineHeight: 20,
    color: commonColor.brand,
  },

  // contract
  contractContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  outCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: commonColor.grey650,
    borderRadius: 12,
  },
  innerCircle: {
    width: 6,
    height: 6,
    backgroundColor: commonColor.brand,
    borderRadius: 6,
  },
  contractText: {
    marginLeft: 8,
    marginRight: 36,
    fontSize: 14,
    lineHeight: 20,
    color: commonColor.grey650,
  },
  viewMore: {
    color: commonColor.brand,
  },
};
