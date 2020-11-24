/**
*
* ServiceItem Stateless Component
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import { openURLByLinking } from 'utils/helpers';

import { SERVICE_CONTENT } from 'containers/FaqScene/constants';

import styles from './styles';


const ServiceItem = (props) => {
  const { item } = props;
  const {
    sections, divider, note, link,
  } = SERVICE_CONTENT;

  const openEmail = () => {
    openURLByLinking('mailto:service@lendingcar.com', 'notSupportEmailUrl');
  };

  return (
    <View>
      <Text style={styles.title}>{item.label}</Text>
      {sections && sections.map((section) => (
        <View key={section.subTitle}>
          <Text style={styles.subTitle}>{section.subTitle}</Text>
          {section.paragraph
              && section.paragraph.map(
                (paragraph, index) => {
                  const isLast = section.paragraph.length - 1 === index;
                  const textStyle = [styles.paragraphText];
                  if (isLast) textStyle.push(styles.lastText);

                  return (
                    <Text style={textStyle} key={paragraph}>{paragraph}</Text>
                  );
                }
              )
          }
        </View>
      ))}
      <Text style={styles.divider}>{divider}</Text>
      <Text style={styles.noteText}>{note}</Text>
      <Text
        style={[styles.linkText, styles.lastItem]}
        onPress={openEmail}
      >
        {link}
      </Text>
    </View>
  );
};

ServiceItem.defaultProps = {
  item: {},
};

ServiceItem.propTypes = {
  item: PropTypes.object,
};

export default ServiceItem;
