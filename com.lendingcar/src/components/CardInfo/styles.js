import * as commonColor from 'commonColor';

export default {
  cardInfoView: {
    width: 343,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    position: 'absolute',
    top: 20,
    right: 15,
    fontSize: 20,
    color: commonColor.white,
  },
  cardTitleColor: {
    color: commonColor.brand,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '43%',
    left: '25%',
    width: '50%',
  },
  cardNum: {
    fontSize: 24,
    lineHeight: 28,
    color: commonColor.white,
  },
  maskNum: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 28,
    color: commonColor.white,
  },
  cardBttomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  textKey: {
    fontSize: 12,
    lineHeight: 16,
    color: commonColor.textGrey,
  },
  textValue: {
    fontSize: 14,
    lineHeight: 20,
    color: commonColor.white,
  },
};
