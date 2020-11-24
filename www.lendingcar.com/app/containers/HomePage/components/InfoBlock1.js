import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

class InfoBlock1 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const style = !isMobile ? { marginTop: '0', width: '100%', backgroundColor: '#ddd' }
    :
    { marginTop: '0', paddingTop: '0', width: '100%', backgroundColor: '#ddd', paddingBottom: '0' };

    const msgTitle1 = this.props.locale === 'zh' ?
      <h2 style={{ color: '#000', textAlign: 'left', fontFamily: '微软雅黑' }}>最佳的驾驶体验，</h2>
      : <h2 style={{ color: '#000', textAlign: 'left' }}>A WONDERFUL DRIVING EXPERIENCE</h2>;

    const msgTitle2 = this.props.locale === 'zh' ?
      <h2 style={{ fontFamily: '微软雅黑' }}>LendingCar为<span style={{ color: '#15aa9c' }}>您</span>打造</h2>
      :
      <h2>JUST FOR <span style={{ color: '#15aa9c' }}>YOU</span></h2>
    ;


    const msg = this.props.locale === 'zh' ?
    (<p style={{ textAlign: 'left', color: '#000', fontSize: '20px', fontFamily: '微软雅黑' }}>
      LendingCar于2017年成立于美国硅谷，是北美首家专注于为海外华人开发的多平台租车服务的互联网科技公司。作为行业先锋，公司旨在利用最前沿的高新技术，分析最准确的数据信息，引领最潮流的租车理念，全方位保障用户享受高质低价，轻松便捷的体验。
    </p>)
    : (<p style={{ textAlign: 'left', color: '#000', fontSize: '20px' }}>
      LendingCar has been established as an information technology company providing car leasing and flooring services. Founded in 2017 and headquartered in Santa Clara, CA, LendingCar is a fast-growing and full-service company providing travel and transportation solutions for our clients. We have already helped our customers find their dream car for lease with the best rate and smart service.
    </p>);

    return (
      <div className="container" style={style}>

        <div className="split-section" style={{ backgroundColor: '#ddd' }}>
          <div className=" row">
            <div className="col-sm-1"></div>
            <div className="col-xs-12 col-md-10">
              {msgTitle1}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-xs-12 col-md-10">
              {msgTitle2}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              {msg}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

InfoBlock1.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock1;
