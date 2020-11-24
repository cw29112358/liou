/*
 *
 * AboutUs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Button } from 'react-bootstrap';
import { sendContactUsEmail } from 'apis/firebase';
import ContactForm from 'forms/ContactForm';
import { reset } from 'redux-form/immutable';

import LinkList from './components/LinkList';
// import selectAboutUs from './selectors';
import messages from './messages';
import './style.scss';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import finger from './finger.jpg';

export class AboutUs extends React.Component { // eslint-disable-line react/prefer-stateless-function

  submitContactUs = (formMap) => {
    const formObject = formMap.toJS();
    const { intl } = this.props;
    sendContactUsEmail(formObject)
    .then((data) => {
      const type = data.error ? 'error' : 'success';
      const msg = data.error ? 'Oops, something went wrong, please try again!'
        : 'Thank You. Your message has been sent, we are going to contact you shortly!';
      window.alert(intl.formatMessage(messages[type]), msg, type);
    })
    .catch((err) => {
      // 'Oops, something went wrong, please try again!'
      window.alert(intl.formatMessage(messages.error), err.message, 'error');
    });
    this.props.resetForm();
  }

  render() {
    return (
      <div className="about-us-container">
        <div className="about-us-introduce">
          <img src={img1} alt="" />
          <div>
            <h1>关于我们</h1>
            <p>前所未有的驾驶体验</p>
          </div>
          <p>
            LendingCar 2017年创立于美国西海岸金融和科技中心之誉的旧金山硅谷，是北美第一家专为海外华人提供长短期租车服务得互联网科技公司。公司一直致力于通过创新的租车理念和个性化的服务模式
            让用户在使用汽车的同时无需承担汽车维护、折旧、信用、注册和税务上的责任，让客户轻松租车、放心用车。
          </p>
        </div>
        <div className="about-us-part row about-us-row">
          <div className="col-sm-7">
            <img src={img2} alt="" />
          </div>
          <div className="col-sm-5">
            <div className="part-text">
              <h2>宗旨和愿景</h2>
              <p>LendingCar 是北美第一家专为海外华人提供长短期租车服务得互联网科技公司。我们一直致力成为在美华人首选的汽车租赁服务品牌。我们希望LendingCar的每一个客户在选择自己最心仪的
                出行工具之余还具有享受到最优惠的价格和最贴心的服务。我们承诺在未来的发展中，着眼未来，立足现在，持续创新，建立一个和谐、值得信任的服务平台。</p>
            </div>
          </div>
        </div>
        <div className="about-us-part row about-us-row">
          <div className="col-sm-5">
            <div className="part-text">
              <h2>我们的团队</h2>
              <p>我们的团队由经验丰富和值得信赖的专业人士组成，他们在IT和汽车租赁行业拥有多年的经验。在成立公司之前，我们已经是一个队客户和市场需求有完全了解的团队。这就是为什么我们能够
                以效率，信任，诚信，合作和协同的品质来保证我们的成功。我们重视打造一个团队合作的环境，并使我们的团队成为一个不分割的整体，并提供创新和高效的解决方案。</p>
            </div>
          </div>
          <div className="col-sm-7" style={{ paddingRight: '0' }}>
            <div style={{ position: 'relative' }}>
              <img src={img3} alt="" />
              <div className="join-us">
                <h3>成为我们的一员</h3>
                <h3>就现在 <Button>立即加入</Button></h3>
              </div>
            </div>
          </div>
        </div>
        <div className="about-us-part-end">
          <div>
            <h4>更好的价格和服务</h4>
            <h2>优质的租赁网络</h2>
          </div>
          <div>
            <p>无论您是商务旅行，自驾游，公路旅行，度假还是搬家，工作和学习，我们可以为您个性化定制租期并提供各种品牌和类型的汽车，以满足不同的客户需求。此外，我们还拥有玛莎拉蒂，林肯，兰博基尼等豪车品牌，
              无论您想要什么车，我们都能提供。无论是国际客户还是本地客户，LendingCar无疑已成为用户最受欢迎的汽车租赁助手。</p>
          </div>
        </div>
        <div className="about-us-footer">
          <div>
            <div className="col-sm-3">
              <h2>联系我们</h2>
              <img src={finger} alt="" />
            </div>
            <div className="col-sm-7">
              <ContactForm {...this.props} onSubmit={this.submitContactUs} />
              <LinkList />
            </div>
            <div className="col-sm-2">
              <p>如果您遇到任何的问题，请随时联系我们，我们愿意以最诚恳的态度为您解答</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutUs.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  resetForm: PropTypes.func,
};

const mapStateToProps = createPropsSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetForm: () => dispatch(reset('ContactForm')),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(AboutUs));
