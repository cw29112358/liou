import { getScaleSize } from 'utils/helpers';

export default {
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 14,
    paddingHorizontal: getScaleSize(16),
  },
  avatarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    marginLeft: 12,
  },
  avatarName: {
    fontSize: 20,
    lineHeight: 28,
  },
  agentInfoText: {
    marginTop: 9,
    fontSize: 12,
  },
};
