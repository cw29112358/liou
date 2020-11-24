/**
*
* ProjectCard Component
*
*/

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
} from 'react-native';
import {
  View,
} from 'native-base';

import UserInfo from './UserInfo';
import ProjectDescription from './ProjectDescription';
import styles from './styles';

class ProjectCard extends React.Component {
  renderUserInfo = () => {
    const {
      project, linkTo, isLinkToProfile, changeFavourites,
    } = this.props;
    return (
      <UserInfo
        project={project}
        isLinkToProfile={isLinkToProfile}
        linkTo={linkTo}
        changeFavourites={changeFavourites}
      />
    );
  }

  renderProject =() => {
    const {
      project, isDetail, projectPartStyle, linkTo,
      isShowGroupBottom, edit,
    } = this.props;
    if (!project) return null;
    return (
      <ProjectDescription
        project={project}
        isDetail={isDetail}
        edit={edit}
        projectPartStyle={projectPartStyle}
        linkTo={linkTo}
        isShowGroupBottom={isShowGroupBottom}
      />
    );
  }
  render() {
    const {
      project, cardContainerStyle, cardFooter, edit, onSelect,
    } = this.props;
    if (!project) return null;
    return (
      <TouchableWithoutFeedback
        disabled={!edit}
        onPress={() => onSelect(project.id)}
      >
        <View style={[styles.listItem, cardContainerStyle]}>
          { this.renderUserInfo() }
          { this.renderProject() }
          { cardFooter }
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

ProjectCard.defaultProps = {
  cardFooter: undefined,
  isDetail: false,
  isLinkToProfile: true, // 设置为 false 可阻止 profile 跳转
  isShowGroupBottom: true,
  edit: false,
  cardContainerStyle: {},
  projectPartStyle: {},
  onSelect: () => null,
  linkTo: () => null,
  changeFavourites: () => null,
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  cardFooter: PropTypes.any,
  isDetail: PropTypes.bool,
  isLinkToProfile: PropTypes.bool,
  isShowGroupBottom: PropTypes.bool,
  edit: PropTypes.bool,
  cardContainerStyle: PropTypes.object,
  projectPartStyle: PropTypes.object,
  onSelect: PropTypes.func,
  linkTo: PropTypes.func,
  changeFavourites: PropTypes.func,
};

export default ProjectCard;
