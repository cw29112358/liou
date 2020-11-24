/**
*
* ProjectLargeList Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import {
  RefreshControl,
} from 'react-native';
import {
  View,
  Spinner,
} from 'native-base';

import { LIST_LIMIT } from 'utils/constants';

import {
  selectAuthUserId,
  selectLanguage,
} from 'containers/AppRouter/selectors';
import {
  updateFavouritesAction,
} from 'containers/MyFavouritesScene/actions';

import ProjectCard from 'components/ProjectCard';
import SeperatorText from 'components/SeperatorText';
import ProjectButtonGroup from 'components/ProjectButtonGroup';

import styles from './styles';
import itemStyles from '../ProjectCard/styles';
import buttonStyles from '../ProjectButtonGroup/styles';

const ViewTypes = {
  IMAGES: 0,
  NO_IMAGES: 1,
  OTHERS: 2,
};

class ProjectLargeList extends React.Component {
  dataProvider = new DataProvider((r1, r2) => r1 !== r2);
  layoutProvider = LayoutProvider;

  constructor(props) {
    super(props);
    const {
      language, listData, itemWidth,
    } = props;
    this.layoutProvider = this.setLayoutProvider(listData);
    this.itemWidth = itemWidth;
    // list 中每个 item 的基础高度
    this.itemBaseHeight = language === 'zh'
      ? itemStyles.itemBaseHeight + itemStyles.itemBorder - 15
      : itemStyles.itemBaseHeight + itemStyles.itemBorder;
    if (!styles.isIOS) {
      this.itemBaseHeight = language === 'zh'
        ? itemStyles.itemBaseHeight + itemStyles.itemBorder
        : itemStyles.itemBaseHeight + itemStyles.itemBorder + 20;
    }
    this.itemButtonHeight = buttonStyles.buttonHeight;
    this.imageHeight = itemStyles.resourceHeight;
    this.baseHeight = this.itemBaseHeight + this.itemButtonHeight + this.imageHeight;

    this.offset = (this.itemWidth - styles.deviceWidth) / 2;
    this.state = {
      endReach: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { listData } = this.props;
    if (nextProps.listData !== listData) {
      this.layoutProvider = this.setLayoutProvider(nextProps.listData);
    }
  }
  isShowItemFooter = (project) => {
    const { authUserId, isShowCardFooter } = this.props;
    return project && project.profile && authUserId !== project.profile.id && isShowCardFooter;
  }
  setLayoutProvider = (listData) => new LayoutProvider(
    (index) => {
      const hasResources = listData[index] && listData[index].images && listData[index].images.length > 0;
      const hasDimHeight = listData[index] && !!listData[index].dimHeight;

      if (hasResources) {
        return {
          type: ViewTypes.IMAGES,
          person: this.isShowItemFooter(listData[index]),
        };
      }
      if (hasDimHeight) {
        return {
          type: ViewTypes.OTHERS,
          dimHeight: listData[index].dimHeight,
        };
      }
      return {
        type: ViewTypes.NO_IMAGES,
        person: this.isShowItemFooter(listData[index]),
      };
    },
    (params, dimOriginal) => {
      const dim = dimOriginal;
      switch (params.type) {
        case ViewTypes.IMAGES:
          dim.width = this.itemWidth;
          dim.height = this.baseHeight - (params.person ? 0 : this.itemButtonHeight);
          break;
        case ViewTypes.NO_IMAGES:
          dim.width = this.itemWidth;
          dim.height = this.baseHeight - this.imageHeight - (params.person ? 0 : this.itemButtonHeight);
          break;
        case ViewTypes.OTHERS:
          dim.width = this.itemWidth;
          dim.height = params.dimHeight;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  )
  onEndReached = () => {
    const { loadMore, loadContentLength } = this.props;
    if (loadContentLength >= LIST_LIMIT) {
      loadMore();
      this.setState({ endReach: false });
    } else {
      this.setState({ endReach: true });
    }
  }

  emptyFunc = () => null
  changeFavourites = (project) => {
    const { updateFavourites, listData, isChangeListSize } = this.props;
    if (!isChangeListSize) {
      const changeIndex = listData.findIndex((item) => item === project);
      this.listView.scrollToIndex(changeIndex >= 0 ? changeIndex : 0, true);
    }
    updateFavourites({ activityId: project.id });
  }

  renderFooter = () => {
    const { isShowListFooter } = this.props;
    const { endReach } = this.state;
    if (isShowListFooter && endReach) {
      return (
        <SeperatorText
          label="noMoreProject"
          showSeperate
          viewStyle={{
            width: this.itemWidth,
            backgroundColor: styles.greyF,
            paddingLeft: this.offset,
            paddingRight: this.offset,
            marginBottom: styles.seperatorBottom,
          }}
        />
      );
    }
    return (
      <Spinner
        color={styles.brand}
        style={{
          marginBottom: styles.isIphoneX ? 50 : 20,
          width: this.itemWidth,
        }}
      />
    );
  };
  renderButtonGroup = (item) => {
    const { edit } = this.props;
    if (this.isShowItemFooter(item)) {
      return (
        <ProjectButtonGroup
          profile={item.profile}
          disabled={edit}
        />
      );
    }
    return null;
  }
  renderListItem = (type, item) => {
    const {
      linkTo, isLinkToProfile, renderCheckBox, edit, onSelect,
    } = this.props;
    if (!item) return null;
    if (item.rowRenderer) return item.rowRenderer();

    const linkFunc = !edit ? linkTo : this.emptyFunc;
    const changeFavourites = !edit ? this.changeFavourites : this.emptyFunc;
    return (
      <View style={[styles.listItem, { paddingRight: this.offset }]}>
        { renderCheckBox && renderCheckBox(item)}
        <ProjectCard
          project={item}
          cardFooter={this.renderButtonGroup(item)}
          isShowGroupBottom={!this.isShowItemFooter(item)}
          linkTo={linkFunc}
          edit={edit}
          onSelect={onSelect}
          isLinkToProfile={!edit && isLinkToProfile}
          changeFavourites={changeFavourites}
        />
      </View>
    );
  }

  render() {
    const {
      style, listData, refList,
      noRefresh, isListRefreshing, onRefresh, edit,
      ...otherProps
    } = this.props;

    return (
      <RecyclerListView
        {...otherProps}
        style={[{ width: this.itemWidth }, style]}
        ref={(c) => { this.listView = c; refList(c); }}
        refreshControl={
          !noRefresh && !edit ? (
            <RefreshControl
              refreshing={isListRefreshing}
              onRefresh={onRefresh}
              title={translate('loading')}
            />
          ) : null
        }
        layoutProvider={this.layoutProvider}
        dataProvider={this.dataProvider.cloneWithRows(listData)}
        rowRenderer={this.renderListItem}
        renderFooter={this.renderFooter}
        onEndReachedThreshold={0.8}
        onEndReached={this.onEndReached}
      />
    );
  }
}

ProjectLargeList.defaultProps = {
  listData: [],
  isChangeListSize: false,
  itemWidth: styles.deviceWidth,
  isLinkToProfile: true,
  isShowCardFooter: true,
  isShowListFooter: true,
  renderCheckBox: undefined,
  edit: false,
  noRefresh: false,
  isListRefreshing: false,
  style: {},
  loadContentLength: 0,
  onSelect: () => null,
  linkTo: () => null,
  updateFavourites: () => null,
  onRefresh: () => null,
  refList: () => null,
  loadMore: () => null,
};

ProjectLargeList.propTypes = {
  authUserId: PropTypes.string.isRequired,
  // 判断每个卡片高度必须的元素
  language: PropTypes.string.isRequired,
  isChangeListSize: PropTypes.bool,
  // 列表数据
  listData: PropTypes.array,
  // 卡片宽度
  itemWidth: PropTypes.number,
  // 是否跳转用户详情页
  isLinkToProfile: PropTypes.bool,
  // 显示底部按钮组
  isShowCardFooter: PropTypes.bool,
  // 显示列表结束提示
  isShowListFooter: PropTypes.bool,
  // 编辑时使用
  renderCheckBox: PropTypes.any,
  edit: PropTypes.bool,
  onSelect: PropTypes.func,
  // 路由跳转
  linkTo: PropTypes.func,
  updateFavourites: PropTypes.func,
  // refresh
  onRefresh: PropTypes.func,
  noRefresh: PropTypes.bool,
  isListRefreshing: PropTypes.bool,
  style: PropTypes.object,
  refList: PropTypes.func,
  // pull up
  loadMore: PropTypes.func,
  loadContentLength: PropTypes.number,
};

const mapStateToProps = () => createPropsSelector({
  authUserId: selectAuthUserId,
  language: selectLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavourites: (id) => dispatch(updateFavouritesAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectLargeList);
