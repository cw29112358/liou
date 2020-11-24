/**
 *
 * FavouriteCarScene Container
 *
 */

/*  global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { ListView, ScrollView, Animated } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  List,
  Tabs,
  Tab,
  CheckBox,
  Footer,
  FooterTab,
  View,
} from 'native-base';
import { remove } from 'lodash';

import {
  selectAvailableFavouriteCar,
  selectNotAvailableFavouriteCar,
  selectAvailableFavouriteCarId,
  selectNotAvailableFavouriteCarId,
  selectIsFavouriteError,
} from 'containers/AppRouter/selectors';
import { updateFavouriteCarAction } from 'containers/AppRouter/actions';
import { loadCarDetailAction } from 'containers/InventoryCarScene/actions';
import { withReducer } from 'containers/InventoryCarScene';

import AppHeader from 'components/AppHeader';
import SeperatorText from 'components/SeperatorText';
import EmptyList from 'components/EmptyList';

import FavouriteCarItem from './components/FavouriteCarItem';

import styles from './styles';
export class FavouriteCarScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: [],
      favouriteCarId: [],
      carId: [],
      edit: false,
      allChecked: false,
      disabledEdit: false,
      translateX: new Animated.Value(0),
    };
  }
  componentWillMount() {
    const { availableFavouriteCar, availableFavouriteCarId } = this.props;
    this.setState({
      listViewData: availableFavouriteCar,
      favouriteCarId: availableFavouriteCarId,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { availableFavouriteCar } = this.props;
    const prevLength = availableFavouriteCar.length;
    const nextLength = nextProps.availableFavouriteCar.length;
    if (prevLength !== nextLength && nextLength !== 0) {
      this.setState({
        listViewData: [...nextProps.availableFavouriteCar],
        favouriteCarId: [...nextProps.availableFavouriteCarId],
      });
    }
  }
  onEdit = () => {
    const { edit } = this.state;
    if (edit) {
      this.setState({
        carId: [],
        allChecked: false,
      });
    }
    this.setState({
      edit: !edit,
    });
  }
  disabledEdit = () => {
    this.setState({
      disabledEdit: true,
    });
  }
  allowEdit = () => {
    this.setState({
      disabledEdit: false,
    });
  }
  changeTab = (value) => {
    const {
      notAvailableFavouriteCar,
      availableFavouriteCar,
      availableFavouriteCarId,
      notAvailableFavouriteCarId,
    } = this.props;
    const { translateX } = this.state;

    const tab = value.i;
    if (tab === 0) {
      Animated.timing(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      this.setState({
        listViewData: availableFavouriteCar,
        favouriteCarId: availableFavouriteCarId,
        edit: false,
        carId: [],
        allChecked: false,
      });
    } else {
      Animated.timing(translateX, {
        toValue: styles.deviceWidth / 2,
        useNativeDriver: true,
      }).start();
      this.setState({
        listViewData: notAvailableFavouriteCar,
        favouriteCarId: notAvailableFavouriteCarId,
        edit: false,
        carId: [],
        allChecked: false,
      });
    }
  }
  linkTo = (data) => {
    const { edit } = this.state;
    if (edit) {
      const { id } = data;
      this.changeCheckoutBox(id);
    } else {
      const { loadCarInfo } = this.props;
      loadCarInfo(data, 0);
      Actions.inventoryCar({
        carInfo: data,
      });
    }
  }
  changeCheckoutBox = (id) => {
    const { carId, favouriteCarId } = this.state;
    const checked = carId.includes(id);
    const carIdLength = carId.length;
    const favouriteCarIdLength = favouriteCarId.length;
    if (checked) {
      remove(carId, (n) => n === id);
      this.setState({
        carId,
      });
      if (carIdLength === favouriteCarIdLength) {
        this.setState({
          allChecked: false,
        });
      }
    } else {
      this.setState({
        carId: [...carId, id],
      });
      if (carIdLength + 1 === favouriteCarIdLength) {
        this.setState({
          allChecked: true,
        });
      }
    }
  }
  allChecked = () => {
    const { allChecked, favouriteCarId } = this.state;
    if (allChecked) {
      this.setState({
        allChecked: false,
        carId: [],
      });
    } else {
      this.setState({
        allChecked: true,
        carId: [...favouriteCarId],
      });
    }
  }
  deleteFavouriteCar = () => {
    const { updateFavouriteCar } = this.props;
    const { carId, listViewData, favouriteCarId } = this.state;
    const initialCar = [...listViewData];
    remove(listViewData, (item) => carId.includes(item.id));
    remove(favouriteCarId, (id) => carId.includes(id));
    updateFavouriteCar(carId, listViewData, initialCar);
    this.onEdit();
  }
  deleteRow(secId, rowId, rowMap) {
    const { updateFavouriteCar } = this.props;
    const { listViewData } = this.state;
    const { id } = listViewData[rowId];
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...listViewData];
    newData.splice(rowId, 1);
    updateFavouriteCar([id], newData, listViewData);
    this.setState({ listViewData: newData });
  }
  renderHeader = () => {
    const { edit, disabledEdit } = this.state;
    const rightText = edit ? 'done' : 'edit';
    const rightButton = (
      <Button
        style={styles.rightButton}
        onPress={this.onEdit}
        disabled={disabledEdit}
      >
        <Text style={styles.rightText}>{translate(rightText)}</Text>
      </Button>
    );
    return (
      <AppHeader
        title="favourite"
        hasRight
        rightButton={rightButton}
      />
    );
  }
  renderFooter = () => {
    const { allChecked, carId } = this.state;
    const { isIphoneX } = styles;
    const carIdLength = carId.length;
    const footerButtonStyle = carIdLength === 0
      ? [styles.footerDisableButtonStyle]
      : [styles.footerButtonStyle];
    if (isIphoneX) footerButtonStyle.push(styles.iPhoneXFooterButton);
    const unAllCheckBoxStyle = allChecked ? {} : styles.unAllCheckBox;
    return (
      <Footer style={styles.footerShadow}>
        <FooterTab style={[styles.allChecked, styles.buttonFooter]}>
          <CheckBox
            checked={allChecked}
            onPress={this.allChecked}
            style={[styles.allCheckedBox, unAllCheckBoxStyle]}
          />
          <Text style={styles.selectAll}>{translate('selectAll')}</Text>
        </FooterTab>
        <FooterTab style={styles.buttonFooter}>
          <Button
            onPress={this.deleteFavouriteCar}
            disabled={carIdLength === 0}
            style={footerButtonStyle}
          >
            <Text style={styles.footerButtonText}>{translate('unFavourite')}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
  renderTabs = () => {
    const { translateX } = this.state;
    const available = translate('available');
    const notAvailable = translate('notAvailable');
    return (
      <View>
        <Tabs
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          style={styles.tabsStyle}
          onChangeTab={(value) => this.changeTab(value)}
          initialPage={0}
        >
          <Tab
            heading={available}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          >
          </Tab>
          <Tab
            heading={notAvailable}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          >
          </Tab>
        </Tabs>
        <Animated.View
          style={[styles.tabBarStyle, {
            transform: [{ translateX }],
          }]}
        >
        </Animated.View>
      </View>
    );
  }
  renderContent = () => {
    const { listViewData, edit } = this.state;
    if (listViewData.length > 0) {
      return (
        <ScrollView style={styles.scrollView}>
          <List
            style={styles.list}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(listViewData)}
            renderRow={this.renderRow}
            disableRightSwipe
            disableLeftSwipe={edit}
            renderRightHiddenRow={this.renderRightHiddenRow}
            onRowOpen={this.disabledEdit}
            onRowDidClose={this.allowEdit}
          />
          <SeperatorText
            label="noMoreCar"
            showSeperate
            seperatorStyle={styles.seperatorStyle}
          />
        </ScrollView>
      );
    }
    return (
      <EmptyList
        type="car"
        label="noFavourite"
        imageViewStyle={styles.imageViewStyle}
        activeOpacity={0.5}
        onPressFunc={this.linkToDriver}
      />
    );
  }
  renderRow = (data) => {
    const { carId, edit } = this.state;
    return (
      <FavouriteCarItem
        data={data}
        carId={carId}
        edit={edit}
        linkTo={this.linkTo}
        changeCheckoutBox={this.changeCheckoutBox}
      />
    );
  }
  renderRightHiddenRow = (data, secId, rowId, rowMap) => (
    <Button
      danger
      style={styles.deleteButton}
      onPress={() => this.deleteRow(secId, rowId, rowMap)}
    >
      <Icon active name="trash" />
    </Button>
  )
  render() {
    const { favouriteError } = this.props;
    const { edit, listViewData } = this.state;
    if (favouriteError) {
      window.toast(translate('unFavouriteFail'));
    }
    return (
      <Container>
        { this.renderHeader() }
        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
          scrollEnabled={false}
        >
          { this.renderTabs() }
          { this.renderContent() }
        </Content>
        { (edit && listViewData.length > 0) && this.renderFooter()}
      </Container>
    );
  }
}

FavouriteCarScene.defaultProps = {
  availableFavouriteCar: [],
  notAvailableFavouriteCar: [],
  favouriteError: false,
  availableFavouriteCarId: [],
  notAvailableFavouriteCarId: [],
  updateFavouriteCar: () => null,
  loadCarInfo: () => null,
};

FavouriteCarScene.propTypes = {
  availableFavouriteCar: PropTypes.array,
  notAvailableFavouriteCar: PropTypes.array,
  favouriteError: PropTypes.bool,
  availableFavouriteCarId: PropTypes.array,
  notAvailableFavouriteCarId: PropTypes.array,
  updateFavouriteCar: PropTypes.func,
  loadCarInfo: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  availableFavouriteCar: selectAvailableFavouriteCar,
  notAvailableFavouriteCar: selectNotAvailableFavouriteCar,
  favouriteError: selectIsFavouriteError,
  availableFavouriteCarId: selectAvailableFavouriteCarId,
  notAvailableFavouriteCarId: selectNotAvailableFavouriteCarId,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavouriteCar: (carId) => dispatch(updateFavouriteCarAction(carId)),
  loadCarInfo: (carInfo, key) => dispatch(loadCarDetailAction(carInfo, key)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withReducer,
  withConnect,
)(FavouriteCarScene);
