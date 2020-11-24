/**
 *
 * ProjectDetailScene Container
 *
 */

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectAuthUserId,
} from 'containers/AppRouter/selectors';
import {
  updateFavouritesAction,
} from 'containers/MyFavouritesScene/actions';
import {
  selectIsLoading,
} from 'containers/MyFavouritesScene/selectors';

import AppHeader from 'components/AppHeader';
import ProjectCard from 'components/ProjectCard';
import ProjectButtonGroup from 'components/ProjectButtonGroup';
import Loader from 'components/Loader';

// ./
// import {} from './constants';
// import { selectIsLoading } from './selectors';
import { loadProjectDetailAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class ProjectDetailScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      projectData: props.project,
    };
  }
  componentWillMount() {
    const { project, loadProjectDetail } = this.props;
    loadProjectDetail({ projectId: project.id });
  }

  linkTo = (route, params) => {
    Actions.push(route, params);
  }

  renderButtonFooter = (item) => (
    <ProjectButtonGroup
      containerStyle={styles.buttonGroup}
      profile={item.profile}
    />
  )
  changeFavourites = (project) => {
    const { updateFavourites } = this.props;
    const { projectData } = this.state;
    const newProject = projectData;
    const data = {
      ...newProject,
      isFavourite: !projectData.isFavourite,
    };
    this.setState({ projectData: data });
    updateFavourites({ activityId: project.id });
  }

  render() {
    const { project, authUserId, isLoading } = this.props;
    const { projectData } = this.state;
    const isShowFooter = authUserId !== project.profile.id;
    return (
      <Container>
        <AppHeader title="projectDetail" />

        <Content
          contentContainerStyle={styles.containerStyle}
          style={styles.content}
        >
          <ProjectCard
            project={projectData}
            isDetail
            linkTo={this.linkTo}
            changeFavourites={this.changeFavourites}
          />
        </Content>
        { isLoading && <Loader />}
        {isShowFooter && this.renderButtonFooter(project)}

      </Container>
    );
  }
}

ProjectDetailScene.defaultProps = {
  isLoading: true,
  updateFavourites: () => null,
  loadProjectDetail: () => null,
};

ProjectDetailScene.propTypes = {
  project: PropTypes.object.isRequired,
  authUserId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  updateFavourites: PropTypes.func,
  loadProjectDetail: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavourites: (id) => dispatch(updateFavouritesAction(id)),
  loadProjectDetail: (projectId) => dispatch(loadProjectDetailAction(projectId)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'projectDetailScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(ProjectDetailScene);
