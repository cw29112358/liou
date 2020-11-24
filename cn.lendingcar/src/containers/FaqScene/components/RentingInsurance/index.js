/**
*
* RentingInsurance Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import insurancePng from './assets/insurance.png';

import styles from './styles';

const RentingInsurance = (props) => {
  const { item } = props;
  return (
    <View>
      <Text style={styles.title}>{item.label}</Text>
      <Text style={[styles.paragraphText, styles.titleDescribe]}>
        随着中国游客出境自助游的现象越来越普遍，更多游客来到美国选择在当地车行租车自驾游。因
        为没有车在美国出行会极不方便，而且大型的租车行比如 Hertz ,Enterprise等都需要很大的
        开销，很多游客会选择IC Cars的租车服务。IC Cars与车行直接对接，没有中间商与
        中介，让您的租车游变得更省钱便利！
      </Text>

      <Text style={styles.subTitle}>保险种类介绍</Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        租车保险主要包括：
        <Text style={[styles.paragraphText, styles.tagFont]}>责任险（Liability)</Text>
        ，
        <Text style={[styles.paragraphText, styles.tagFont]}>撞车放弃索赔险（CDW)</Text>
        ，以及
        <Text style={[styles.paragraphText, styles.tagFont]}>个人意外险(PAI)</Text>
      </Text>

      <Text style={styles.paragraphText}>
        <Text style={[styles.paragraphText, styles.tagFont]}>
          1.责任险 Liability Insurance Supplement(LIS)
        </Text>
        , 类似险种在国内叫交强险。是指当车祸发生责任在你时，赔偿对方车辆及人员死伤的险种。根
        据美国法律要求，司机必须在买好责任险后才能开车上路。
      </Text>

      <Text style={[styles.paragraphText, styles.lastText]}>
        在美国有车的人，自有保险大多数可以包括责任险，但各个保险条款不同，详情需要打电话询问
        自己的保险公司。
      </Text>

      <Text style={styles.paragraphText}>
        <Text style={[styles.paragraphText, styles.tagFont]}>
          2.事故放弃索赔协议 Collision Damage Waiver (CDW)
        </Text>
        , 指通过此协议，一旦发生事故导致所租车辆受损，租车公司将不会向你索赔。其中大部分CDW包
        含LDW。Loss Damage Waiver（LDW) 包括车辆被盗，被抢等其他原因造成的损失。CDW能够
        保障自己租车所出现的大部分情况。
      </Text>

      <Text style={styles.paragraphText}>
        如果在美有车，且购买的是全保（Comprehensive car insurance), 有可能会包含租车的
        CDW，请仔细阅读保险条款。
      </Text>
      <Text style={styles.paragraphText}>
        同时，在美选用合适的信用卡提供也提供CDW服务。Visa, MasterCard, American
         Express, Discover四大信用卡大部分提供相关服务。需要用这信用卡支付全部的租车费且持
        卡人是primary renter，就能获得免费的CDW。
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        信用卡提供的CDW分为优先保险(Primary)和第二保险(Secondary)两种, 大部分普通信用卡
        提供的是二次保险。区别在于，发生事故后，信用卡提供的租车保险直接赔偿就是优先保险；反之
        需要先走自己的保险，当自己保险额多无法全部覆盖赔付额度时，才能使用信用卡公司提供的保险
        赔偿是第二保险。了解自己的信用卡的具体保险方式需要联系信用卡公司。
      </Text>

      <Text style={styles.paragraphText}>
        <Text style={[styles.paragraphText, styles.tagFont]}>
          3.个人意外险 Personal Accident Insurance (PAI)
        </Text>
        , 一般是指自己的旅游或意外伤害险。
      </Text>

      <Text style={[styles.paragraphText, styles.lastText]}>
        大部分PAI还包括租车期间车内物品受损被盗的赔偿，即Personal Effects Coverage(PEC)
        。大部分已购买的医疗保险或旅游险，会包含个人意外险。
      </Text>

      <Text style={styles.subTitle}>保险种类介绍</Text>
      <Text style={styles.paragraphText}>
        通过上述简介，相信你对在美租车的保险有了一定的认识和重视。根据客户的需求，我公司与合
        作伙伴推出了针对同时确保服务品质，性价比和便捷性的租车保险服务。帮助客户在租车的同时，
        保证安全出行。
      </Text>
      <Image source={insurancePng} style={[styles.image, styles.lastText]} />

      <Text style={styles.subTitle}>租车保险总结与其它注意事项</Text>

      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        1.需要注意的是，租车前必须要保证至少购买CDW+Liability。
      </Text>
      <Text style={styles.paragraphText}>
        在美国自有车险的客户需要权衡两个问题。
        1. 出了事故，使用自己的车险要先预付多少钱？
        2.第二年保费会上涨多少？所以一部分有车险的客户根据自身情况也会选择购买公司提供的CDW
         + Liability.
      </Text>

      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        2.Additional driver需要登记在案。在除了租车人之外还有其他人驾驶的情况下，需要事先
        告知租车公司，并会被要求多付额外金额。
      </Text>
      <Text style={styles.paragraphText}>
        但这样能保证在非租车人驾驶的情况下发生意外时，保险公司的赔付。如果没有登记在案，根据法
        律合同，所有损失需租车人自己承担。
      </Text>
      <Text style={styles.lastItem}>
        <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
          关键字
        </Text>
        <Text style={styles.paragraphText}>
          : 车险，责任险，事故放弃索赔协议，信用卡车险，个人意外险，其它驾驶人
        </Text>
      </Text>
    </View>
  );
};

RentingInsurance.defaultProps = {
  item: {},
};

RentingInsurance.propTypes = {
  item: PropTypes.object,
};

export default RentingInsurance;
