import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  // render
  content: {
    flex: 1,
    paddingBottom: 60,
  },
  // renderChatHeader
  chatItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    backgroundColor: commonColor.white,
    borderColor: commonColor.greyer,
  },
  chatItemIsShown: {
    borderBottomWidth: 0,
  },
  chatHeaderContent: {
    backgroundColor: commonColor.white,
    paddingLeft: 16,
  },
  chatHeaderShadow: {
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  chatItemLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: isPad ? 60 : 40,
    height: isPad ? 60 : 40,
  },
  chatLabel: {
    marginLeft: 12,
    fontSize: getPadSize(14),
    color: commonColor.black,
  },
  forwardIcon: {
    fontSize: getPadSize(24),
    color: commonColor.grey650,
  },

  // renderConnectionCard
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  connectionCard: {
    flexDirection: 'column',
    marginTop: 10,
    width: (deviceWidth - 15 - getPadSize(32)) / 2,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: commonColor.white,
    elevation: 3,
    borderRadius: 6,
    shadowColor: commonColor.transparentBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  avatar: {
    marginBottom: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: getPadSize(16),
    marginBottom: 8,
  },
  position: {
    fontSize: getPadSize(13),
    color: commonColor.black3,
  },
  company: {
    fontSize: getPadSize(12),
    color: commonColor.darkGrey,
    textAlign: 'center',
  },

  // renderConnectionButton
  connectionRightIcon: {
    width: getPadSize(18),
    height: getPadSize(18),
  },
};
