/**
*
* BenefitCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  Image,
} from 'react-native';

import TranslateText from 'components/TranslateText';

import styles from './styles';

const BenefitCard = (props) => {
  const {
    style, item: {
      title, moreDetail, point, image,
    },
  } = props;
  return (
    <View key={title} style={[styles.blackShadow, styles.item, style]}>
      <View style={styles.imageView}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleView}>
          <TranslateText label={title} style={styles.title} />
          <TranslateText
            leftChildren={<TranslateText label={`${point} `} isTranslate={false} style={styles.pointText} />}
            label="pointsOneTime"
            style={styles.pointUnitText}
          />
        </View>

        <TranslateText
          label={moreDetail}
          style={styles.detailText}
          numberOfLines={6}
        />
      </View>
    </View>
  );
};

BenefitCard.defaultProps = {
  item: {},
  style: {},
};

BenefitCard.propTypes = {
  item: PropTypes.object,
  style: PropTypes.object,
};

export default BenefitCard;
