/**
*
* BenefitPart Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import TranslateText from 'components/TranslateText';
import Button from 'components/Button';

import styles from './styles';

const BenefitPart = (props) => {
  const { options, onPress, points } = props;

  return (
    <View style={styles.view}>
      <View style={styles.titleView}>
        <TranslateText label="membershipBenefits" style={styles.title} />
        <TranslateText
          label="myPoints"
          style={styles.subTitle}
          rightChildren={<TranslateText label={translate(points, 'number')} style={styles.subTitleGold} isTranslate={false} />}
        />
      </View>

      <View style={styles.list}>
        {
          options.map((item, index) => {
            const { title, detail, point } = item;
            return (
              <View key={title} style={styles.item}>
                <View style={[styles.blackShadow, styles.itemTop]}>
                  <TranslateText label={title} style={styles.titleText} />
                  <TranslateText label={detail} style={styles.detailText} numberOfLines={2} />
                </View>
                <Button
                  onPress={() => onPress({
                    item, index, options, points,
                  })}
                  shadowStyle={[styles.brandShadow, styles.pointShadow]}
                  {...styles.linearProps}
                  linearStyle={{ borderRadius: 6 }}
                  style={styles.ponitButton}
                  textLabel="pointsOneTime"
                  textStyle={styles.pointText}
                  textOtherProps={{
                    leftChildren: point,
                  }}
                />
              </View>
            );
          })
        }
      </View>


    </View>
  );
};

BenefitPart.defaultProps = {
  options: [],
  onPress: () => null,
  points: 0,
};

BenefitPart.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  points: PropTypes.number,
};

export default BenefitPart;
