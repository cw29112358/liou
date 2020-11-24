/**
*
* AgentModal Stateless Component
*
*/

/* global translate  */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Clipboard,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  View,
  Text,
  Button,
  Icon,
} from 'native-base';

import styles from './styles';

class AgentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      showCopySuccess: false,
    };
  }
  onPressCopy = () => {
    const { agentId } = this.props;
    const { fadeAnim } = this.state;
    Clipboard.setString(agentId);
    this.setState({
      showCopySuccess: true,
    });
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        delay: 1000,
      }
    ).start();
    setTimeout(() => {
      this.setState({
        fadeAnim: new Animated.Value(0),
        showCopySuccess: false,
      });
    }, 2000);
  }
  getStyles = () => {
    const { fadeAnim } = this.state;
    const opacity = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return {
      opacity,
    };
  }
  renderCopy = () => {
    const { agentId } = this.props;
    return (
      <View style={styles.copyContent}>
        <Text style={styles.RecommendationCode}>{ translate('RecommendationCode') }</Text>
        <Text style={styles.copyText}>{agentId}</Text>
        <Button
          transparent
          onPress={this.onPressCopy}
          style={styles.copyButton}
        >
          <Text style={styles.copyButtonText}>{ translate('copy') }</Text>
        </Button>
      </View>
    );
  }
  renderCopySuccess = () => (
    <Animated.View
      style={[styles.copySuccess, this.getStyles()]}
    >
      <Text style={styles.copySuccessText}>{translate('copySuccess')}</Text>
    </Animated.View>
  )

  renderList = () => {
    const agentTextArr = [
      {
        text: 'agentText1',
        money: 1299,
      },
      {
        text: 'agentText2',
        money: 1599,
      },
      {
        text: 'agentText3',
        money: 1899,
      },
    ];
    return (
      <View>
        <Text style={[styles.agentText, styles.recommendText]}>{ translate('recommendText') }</Text>
        {
          agentTextArr.map((item) => (
            <View key={item.text} style={styles.agentTextWrapper}>
              <Text style={styles.agentText}>
                { translate(item.text) }
              </Text>
              <Text style={[styles.agentText, styles.agentTextColor]}>
                {item.money}
              </Text>
              <Text style={styles.agentText}>
                {translate('agentMoney')}
              </Text>
            </View>
          ))
        }
        <Text style={[styles.agentText, styles.agentTextColor]}> {translate('agentText4')}</Text>
      </View>
    );
  }
  render() {
    const { modalVisible, closeModal } = this.props;
    const { showCopySuccess } = this.state;
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View>
          <TouchableOpacity onPress={closeModal} style={styles.mask} />
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{translate('agentModalHeaderTitle')}</Text>
              <Button
                style={styles.button}
                onPress={closeModal}
                transparent
              >
                <Icon name="close" style={styles.icon} />
              </Button>
            </View>
            { this.renderList() }
            { this.renderCopy() }
            { showCopySuccess && this.renderCopySuccess() }
            <Text style={styles.interpretation}>{translate('interpretation')}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

AgentModal.defaultProps = {
  agentId: '',
  modalVisible: false,
  closeModal: () => null,
};

AgentModal.propTypes = {
  agentId: PropTypes.string,
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default AgentModal;
