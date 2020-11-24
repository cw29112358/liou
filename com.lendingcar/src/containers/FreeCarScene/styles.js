import * as commonColor from 'commonColor';

export default {
  gradientColors: [commonColor.normalBlue, commonColor.brand],
  contentContainer: {},

  bgImage: {
    width: '100%',
  },

  contentView: {
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 50,
    backgroundColor: commonColor.white,
    borderRadius: 12,
    paddingTop: 43,
    paddingBottom: 42,
    paddingHorizontal: 15,
  },

  membershipPropaganda: {
    alignItems: 'center',
  },
  membershipView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  membershipImage: {
    width: 23,
    height: 19,
    marginBottom: 2,
    marginLeft: -5,
  },
  membershipText: {
    fontSize: 13,
    color: commonColor.balck,
  },
  memberText: {
    alignItems: 'center',
  },

  freeMessageText: {
    fontSize: 19,
    color: commonColor.balck,
  },
  freeText: {
    fontSize: 32,
    color: commonColor.deepYellow,
  },

  carImage: {
    marginTop: 43,
    marginBottom: 20,
  },

  decsribeText: {
    fontSize: 13,
    fontWeight: '700',
    color: commonColor.black,
  },
  carTotalText: {
    marginBottom: 16,
  },
  carTotalNumber: {
    fontSize: 20,
    color: commonColor.deepYellow,
  },
  carNoteText: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  serviceText: {
    textAlign: 'center',
    fontSize: 10,
    color: commonColor.darkGrey,
    marginBottom: 88,
  },

  list: {
    marginTop: 50,
    justifyContent: 'flex-start',
  },
  listTitleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  listTitleLineWithoutHr: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  hr: {
    height: 1,
    width: 21,
    backgroundColor: commonColor.black,
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 12,
    color: commonColor.black,
  },
  listTitleWithoutHr: {
    marginHorizontal: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  prefixText: {
    marginTop: -2,
  },
  itemText: {
    fontSize: 13,
    marginBottom: 12,
    textAlignVertical: 'center',
    lineHeight: 19,
    color: commonColor.grey750,
  },
};
