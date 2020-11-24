/**
*
* PrivilegeList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import PrivilegeModal from '../PrivilegeModal';
import privilege1 from './assets/privilege1.png';
import privilege2 from './assets/privilege2.png';
import privilege3 from './assets/privilege3.png';
import privilege4 from './assets/privilege4.png';
import privilege5 from './assets/privilege5.png';
import privilege6 from './assets/privilege6.png';
import privilege7 from './assets/privilege7.png';
// import privilege8 from './assets/privilege8.png';
import styles from './styles';
export class PrivilegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  onPressButton = (index) => {
    const { openPrivilegeModal } = this.props;
    openPrivilegeModal();
    this.setState({
      index,
    });
  }
  render() {
    const {
      displayImage,
      membership,
      modalVisible,
      closeModal,
    } = this.props;
    const { index } = this.state;
    const privilegeArr1 = [
      {
        image: privilege1,
        text: 'privilege1Text',
        modalText: 'privilege1ModalText',
      },
      {
        image: privilege2,
        text: 'privilege2Text',
        modalText: 'privilege2ModalText',
      },
      {
        image: privilege3,
        text: 'privilege3Text',
        modalText: 'privilege3ModalText',
      },
    ];
    const privilegeArr2 = [
      {
        image: privilege4,
        text: 'privilege4Text',
        modalText: 'privilege4ModalText',
      },
      {
        image: privilege5,
        text: 'privilege5Text',
        modalText: 'privilege5ModalText',
      },
    ];
    const privilegeArr3 = [
      {
        image: privilege6,
        text: 'privilege6Text',
        modalText: 'privilege6ModalText',
      },
      {
        image: privilege7,
        text: 'privilege7Text',
        modalText: 'privilege7ModalText',
      },
      // {
      //   image: privilege8,
      //   text: 'privilege8Text',
      //   modalText: 'privilege8ModalText',
      // },
    ];
    const scrollStyle = [styles.scrollView];
    if (membership && !styles.isShowAllBUtton && !styles.isIOS) scrollStyle.push({ height: 160 });
    let privilegeArr = privilegeArr1;
    if (displayImage === 1) {
      privilegeArr = [...privilegeArr, ...privilegeArr2];
    } else if (displayImage === 2) {
      privilegeArr = [...privilegeArr, ...privilegeArr2, ...privilegeArr3];
    }
    const clilePrivilege = privilegeArr[index];
    return (
      <View style={styles.contentBottomView}>
        <Text style={styles.privilegeTitle}>{translate('privilegeTitle')}</Text>
        <ScrollView
          style={scrollStyle}
          contentContainerStyle={styles.contentPrivilegeView}
          scrollEnabled={!styles.isShowAllBUtton}
        >
          {
            privilegeArr.map((item, i) => (
              <TouchableOpacity
                key={item.text}
                style={styles.childView}
                onPress={() => this.onPressButton(i)}
              >
                <Image
                  style={styles.privilegeImage}
                  source={item.image}
                />
                <Text style={styles.privilegeText}>{translate(item.text)}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <PrivilegeModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          clilePrivilege={clilePrivilege}
        />
      </View>
    );
  }
}

PrivilegeList.defaultProps = {
  displayImage: 0,
  membership: true,
  modalVisible: false,
  openPrivilegeModal: () => null,
  closeModal: () => null,
};

PrivilegeList.propTypes = {
  displayImage: PropTypes.number,
  membership: PropTypes.bool,
  modalVisible: PropTypes.bool,
  openPrivilegeModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default PrivilegeList;
