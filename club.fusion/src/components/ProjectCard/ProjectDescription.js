/**
*
* ProjectCard Component
*
*/

/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  Text,
  View,
  Button,
} from 'native-base';

import BaseInfoGroup from './BaseInfoGroup';
import CardResources from './components/CardResources';
import DetailList from './components/DetailList';
import {
  DETAIL_LIST,
} from './constants';
import lookImage from './assets/look.png';
import styles from './styles';

class ProjectDescription extends React.Component {
  getIsShowSmallImages = () => {
    const { project, isDetail } = this.props;
    return project.images.length >= 2 && isDetail;
  }
  goToProjectDetail = () => {
    const { linkTo, project } = this.props;
    linkTo('projectDetail', { project });
  }

  renderProjectBaseInfoGroup = () => {
    const { isDetail, project, isShowGroupBottom } = this.props;
    return <BaseInfoGroup isDetail={isDetail} project={project} isShowGroupBottom={isShowGroupBottom} />;
  }
  renderCardTitle = () => {
    const { isDetail, edit } = this.props;
    const buttonStyles = [styles.detailButton];
    if (edit) {
      buttonStyles.push(styles.disabled);
    }
    return (
      <View style={styles.projectTitleLine}>
        <Text style={styles.projectTitleLabel}>{translate('projectIntroduction')}</Text>
        {!isDetail && (
          <Button
            transparent
            disabled={edit}
            style={buttonStyles}
            onPress={this.goToProjectDetail}
          >
            <Text style={styles.detailButtonText}>{translate('viewDetails')}</Text>
          </Button>
        )}
      </View>
    );
  }
  renderCardResources = (images) => {
    const { edit } = this.props;
    const isShowSmall = this.getIsShowSmallImages();
    const isVideo = images[0] && images[0].mime.indexOf('video') !== -1;
    const resourceSizeStyles = [styles.resourceSize];
    if (isShowSmall) {
      resourceSizeStyles.push(styles.resourceDetailSize);
    }
    return (
      <View style={resourceSizeStyles}>
        <CardResources
          images={images}
          isShowSmall={isShowSmall}
          isVideo={isVideo}
          edit={edit}
          goToProjectDetail={this.goToProjectDetail}
        />
      </View>
    );
  }
  renderProjectBaseInfoMessage = () => {
    const { project } = this.props;
    const { createdAt, viewCount } = project;
    return (
      <View style={styles.baseInfo}>
        <Text style={styles.dateText}>{window.momentFormat(createdAt)}</Text>
        <View style={styles.viewCountLine}>
          <Image source={lookImage} style={styles.lookImage} />
          <Text style={styles.countText}>{viewCount || 0}</Text>
        </View>
      </View>
    );
  }
  renderDetailList = (project) => {
    const { financingType, type } = project;
    let listKey = 'collaboration';
    if (type !== 'collaboration' && financingType) {
      listKey = financingType;
    }
    const listData = DETAIL_LIST[listKey];
    if (listData.length <= 0) return null;
    return <DetailList listData={listData} project={project} />;
  }

  render() {
    const { project, isDetail, projectPartStyle } = this.props;
    if (!project) return null;
    const { message = '', images = [] } = project;
    return (
      <View style={[styles.projectPart, projectPartStyle]}>
        { this.renderCardTitle() }
        <Text numberOfLines={isDetail ? undefined : 1} style={styles.messageText}>{message}</Text>
        { images.length > 0 && this.renderCardResources(images) }
        { this.renderProjectBaseInfoMessage() }
        { this.renderProjectBaseInfoGroup() }
        { isDetail && this.renderDetailList(project) }
      </View>
    );
  }
}

ProjectDescription.defaultProps = {
  isDetail: false,
  isShowGroupBottom: false,
  edit: false,
  projectPartStyle: {},
  linkTo: () => null,
};

ProjectDescription.propTypes = {
  project: PropTypes.object.isRequired,
  isDetail: PropTypes.bool,
  isShowGroupBottom: PropTypes.bool,
  edit: PropTypes.bool,
  projectPartStyle: PropTypes.object,
  linkTo: PropTypes.func,
};

export default ProjectDescription;
