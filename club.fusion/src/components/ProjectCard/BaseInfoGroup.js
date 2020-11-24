/**
*
* ProjectCard Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { Image } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import { PROJECT_BASE_IMAGE } from './constants';
import styles from './styles';

const BaseInfoGroup = (props) => {
  const { isDetail, project, isShowGroupBottom } = props;
  const { financingType, type } = project;
  if (!project) return null;

  // 判断商机类型
  let seekKey = 'collaboration';
  if (type !== 'collaboration' && financingType) {
    seekKey = financingType;
  }
  // style
  const baseLineStyles = [styles.baseLine];
  if (isShowGroupBottom) {
    baseLineStyles.push(styles.withoutFooter);
  }
  if (isDetail) {
    baseLineStyles.push(styles.detailBaseLine);
  }
  // pick 展示的数据
  const infoMessage = pick(project, ['industry', 'area', 'fundRequest', 'fund']);

  return (
    <View style={baseLineStyles}>
      {
        Object.keys(infoMessage).map((item, index) => {
          // 商机类型
          const isCollaboration = seekKey === 'collaboration';
          const imageKey = index === 2 ? seekKey : item;

          let baseValue = '';
          if (index < 2) {
            // 地址 & 产业
            baseValue = translate(project[item]);
          }
          // 展示数据可能为数字时
          const baseMoney = project[item] ? project[item] : 0;
          if (index === 2) {
            baseValue = isCollaboration ? translate(seekKey) : translate(baseMoney, 'dollar');
          }
          if (index === 3) {
            baseValue = translate(baseMoney, 'dollar');
          }
          return (
            <View style={styles.baseInfoBlock} key={item}>
              <Text style={styles.baseValue}>{baseValue || ' '}</Text>
              <View style={styles.projectBaseImageBlock}>
                <Image {...PROJECT_BASE_IMAGE[imageKey]} />
                <Text style={styles.baseLabel}>{translate(item)}</Text>
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

BaseInfoGroup.defaultProps = {
  isDetail: false,
  isShowGroupBottom: false,
};

BaseInfoGroup.propTypes = {
  project: PropTypes.object.isRequired,
  isDetail: PropTypes.bool,
  isShowGroupBottom: PropTypes.bool,
};

export default BaseInfoGroup;
