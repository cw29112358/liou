import * as commonColor from 'commonColor';

export default {
  item: {
    justifyContent: 'space-between',
    paddingTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
  },
  itemWithMargin: {
    marginLeft: 12,
    marginRight: 12,
  },
  itemChildren: {
    flexDirection: 'column',
  },
  itemWithBorder: {
    marginBottom: 28,
    paddingBottom: 28,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  // thead
  theadText: {
    fontSize: 16,
    color: commonColor.black,
  },
  // left
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    color: commonColor.grey650,
  },
  // right
  rightView: {
    justifyContent: 'flex-end',
  },
  rightText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
  rightTextWithIcon: {
    color: commonColor.darkGrey,
  },
  rightIcon: {
    marginLeft: 13,
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: commonColor.grey650,
  },
};
