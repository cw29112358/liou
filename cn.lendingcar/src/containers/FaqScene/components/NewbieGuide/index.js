/**
*
* NewbieGuide Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import styles from './styles';

const NewbieGuide = (props) => {
  const { item } = props;
  return (
    <View>
      <Text style={styles.title}>{item.label}</Text>
      <Text style={[styles.paragraphText, styles.titleDescribe]}>
        IC Cars成立于2017年，是北美第一家专为海外华人提供长期与短期平价租车服务的互联网
        科技公司。自成立以来，公司一直致力于通过创新的租车理念和个性化的服务模式让用户在使用汽
        车的同时无须承担汽车维护、折旧、信用、注册和税务上的责任，让客户轻松租车、放心用车。
      </Text>

      <Text style={styles.subTitle}>如何发起租车？</Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        在IC Cars的主页中，您可以轻松定位我们现有的所有车辆库存，并可以根据喜好（比如品
        牌、颜色、价格区间等）筛选您心仪的车型。筛选过后，可以通过点击
        <Text style={[styles.paragraphText, styles.tagFont]}>“查看细节”</Text>
        按钮，进入到汽车详情页面查询汽车的图片、价格、租期、性能等详细信息。通过点击
        <Text style={[styles.paragraphText, styles.tagFont]}>
          “我要租车”
        </Text>
        按钮，页面右下角会出现聊天对话框，我们的客服人员会与您线上进行沟通并给出报价单。
      </Text>

      <Text style={[styles.paragraphText, styles.lastText]}>
        * 相关提示：为了更好地服务客户并了解客户需求，在查看租车详情以前，我们需要客户提交姓
        名，邮箱和推荐码等信息。
      </Text>

      <Text style={styles.subTitle}>租车所需材料</Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        租车人需满足年龄要求25岁或以上。请您携带有效的本国驾照/国际驾照原件，国际信用卡，提供
        三个月银行存款或流水账（建议）。国际租车请携带本人护照原件。
      </Text>

      <Text style={styles.subTitle}>如何提取车辆？</Text>
      <Text style={styles.paragraphText}>
        客服人员收到已签名的报价单后，会告知客户在指定时间去指定地点取车。这时客户需携带个人驾
        照、信用卡和近三个月的银行存款或流水账刷卡提车。
      </Text>
      <Text style={styles.paragraphText}>
        请仔细阅读租车合同中的内容条款及合同内相关的增值服务项，如有任何疑问请立即询问门店工作
        人员并确认，确认无误后签字。前台工作人员将会为您提供租车合同、费用清单小票和车钥匙。办
        理完相关登记手续之后，请您注意保管好所有的合同和相关单据。
      </Text>
      <Text style={styles.paragraphText}>
        请您按照您合同单上的车辆信息在指定位置提取或等待您的车辆。 出发之前，请您检查车辆是否
        有损坏，例如车辆的开关、车灯、油箱（是否满油）、转弯提示灯、雨刷、备用轮胎、潜在安全隐
        患和车身刮痕等，确认您的车辆没有任何故障。
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        * 相关提示：如果您需要购买汽车保险或者租赁其他设备，例如行车导航仪，儿童安全座椅，收
        费站一卡通等，请在取车前询问前台工作人员。
      </Text>

      <Text style={styles.subTitle}>如何返还车辆？</Text>
      <Text style={styles.paragraphText}>
        请您在租车时限到期前将车开到指定返还地点，按照指示牌停到指定区域。门店工作人员会对您
        的租车进行简单的车辆检查，然后双方签署收车记录。
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        返还车辆之后，我们会根据实际车辆使用情况，从信用扣款或返还押金。
      </Text>

      <Text style={styles.subTitle}>什么是押金/预授权？</Text>
      <Text style={styles.paragraphText}>
        提车时请您携带有本人名下的Mastercard/Visa国际信用卡，所有在门店支付的费用和车辆押
        金都是以信用卡支付。请携带有足够额度的国际信用卡。
      </Text>
      <Text style={styles.paragraphText}>
        押金的数额根据不同的车型组而不同，通常其数额同起赔额的数额一致。若您希望降低押金额度，
        您可以自由选择购买门店的额外保险，通常在购买门店保险后，相应的押金数额亦会降低。
      </Text>
      <Text style={styles.paragraphText}>
        由于租车公司需要核实您在租期内是否有交通违章等行为，车辆押金通常会在您还车后被租车公司
        冻结一至两个月左右。
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        *相关提示：在您顺利还车后，车辆押金不是即时退还／解冻。租车公司需要一些时间确认用户在
        租期内是否有违章记录以及车损等，通常押金会在还车后被租车公司冻结一至两个月左右退还。若
        您的押金是被直接扣款的，其中所产生的信用卡费用和管理费用不会退还。
      </Text>

      <Text style={styles.subTitle}>常见问题：</Text>
      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        1.可以修改或取消我的订单吗？
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        您可以修改或取消订单。预定时，IC Cars工作人员会告知您详细流程。如有任何疑问请与我
        们的客服联系。
      </Text>
      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        2.租车期间出了交通意外怎么办？
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        当交通意外发生，您必须立即拨打租车公司电话。该租车公司一定要授权, 方可修理或更换车辆。
        保存所有有关文件的复印件。
      </Text>
      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        3.租车期间可以换车吗？
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        可以，租期一年或以上的顾客可以享受一年免费更换六次同等级的车。不满一年的租客在租车期间
        换车会产生额外费用。详细了解请联系我们的客服。
      </Text>

      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        4.可以异地还车吗？
      </Text>
      <Text style={[styles.paragraphText, styles.lastText]}>
        异地换车请提前与我们联系，方便我们为您找到到合适的还车地点。可能产生额外费用。
      </Text>
      <Text style={[styles.paragraphText, styles.tagFont, styles.thirdTitle]}>
        5.我可以续租吗？
      </Text>
      <Text style={[styles.paragraphText, styles.lastItem]}>
        可以。您可以在租车时间结束前与我们联系续租。可能产生额外费用。
      </Text>

    </View>
  );
};

NewbieGuide.defaultProps = {
  item: {},
};

NewbieGuide.propTypes = {
  item: PropTypes.object,
};

export default NewbieGuide;
