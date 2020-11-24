/**
*
* RentingStrategy Stateless Component
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import { openURLByLinking } from 'utils/helpers';
import { STRATEGY_CONTENT } from 'containers/FaqScene/constants';

import supportPng from './assets/support.png';
import styles from './styles';

const RentingStrategy = (props) => {
  const { item } = props;
  const {
    paragraph, attentions, note,
  } = STRATEGY_CONTENT;

  const openURL = () => {
    openURLByLinking('https://zaq.us/drivers-manual-chinese/');
  };

  return (
    <View>
      <Text style={styles.title}>{item.label}</Text>

      {paragraph && paragraph.map((content) => (
        <Text style={styles.paragraphText} key={content}>{content}</Text>
      ))}

      <Image source={supportPng} style={styles.image} />

      <Text style={styles.subTitle}>{attentions.title}</Text>

      {attentions.content && attentions.content.map((attention, index) => {
        const isLast = attentions.content.length - 1 === index;
        if (index === 2) {
          return (
            <Text key={attention} style={styles.paragraphText}>
              <Text style={styles.paragraphText}>{attention.front}</Text>
              <Text style={styles.tagFont}>{attention.license}</Text>
              <Text style={styles.paragraphText}>{attention.divider}</Text>
              <Text style={styles.tagFont}>{attention.ENbook}</Text>
              <Text style={styles.paragraphText}>{attention.and}</Text>
              <Text style={styles.tagFont}>{attention.passport}</Text>
              <Text style={styles.paragraphText}>{attention.end}</Text>
            </Text>
          );
        }
        return (!isLast
          ? <Text key={attention} style={styles.paragraphText}>{attention}</Text>
          : (
            <Text style={styles.lastText} key={attention.link}>
              <Text style={styles.paragraphText}>{attention.front}</Text>
              <Text
                style={styles.linkText}
                onPress={openURL}
              >{attention.link}
              </Text>
              <Text style={styles.paragraphText}>{attention.after}</Text>
            </Text>
          )
        );
      })}

      <Text style={[styles.paragraphText, styles.lastItem]}>{note}</Text>
    </View>
  );
};

RentingStrategy.defaultProps = {
  item: {},
};

RentingStrategy.propTypes = {
  item: PropTypes.object,
};

export default RentingStrategy;
