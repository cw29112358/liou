import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import th from './th.jpg';
import cnmelogo from './cnmelogo.jpg';
import roadsideassistance from './roadsideassistance.png';
import deals from './deals.png';

class InfoBlock11 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const style = !isMobile ?
      { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center' }
      : { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', marginBottom: '-50px' };

    const msg = this.props.locale === 'zh' ?
      <h2 style={{ color: '#000', fontFamily: '微软雅黑' }}>为什么选择 LendingCar</h2>
      : <h2 style={{ color: '#000' }}>Why LendingCar?</h2>;


    const msg1 = this.props.locale === 'zh' ?
            (<div >
              <h3 style={{ textAlign: 'left', fontFamily: '微软雅黑', color: '#000' }}>省钱好帮手</h3>
              <p style={{ textAlign: 'justify', fontFamily: '微软雅黑', paddingRight: '10px' }}>
              最低$5.99/天平价优惠，就可以开启您的租约。我们一直以来希望能以最低的价格提供最好的服务。
            </p>
            </div>)
            :
            (<div><h3 style={{ textAlign: 'left' }}>Save money</h3><p style={{ textAlign: 'justify', paddingRight: '10px' }}>
              Become our customer and enjoy the exclusive flat rate for the whole year. Lease cars from us with the starting price $5.99/day! We have our customer spend less but enjoy BETTER service.
            </p></div>);

    const msg2 = this.props.locale === 'zh' ?
            (<div>
              <h3 style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>驾驶新鲜感</h3>
              <p style={{ textAlign: 'justify', fontFamily: '微软雅黑', paddingRight: '10px' }}>
              探索新车型，享受驾驶不同汽车的乐趣。若您签订的租期满一年，您可以任性更换6次同级别的车辆，无需额外费用，尽情享受驾驶的新鲜感。
            </p>
            </div>)
            :
            (<div><h3 style={{ textAlign: 'left' }}>Enjoy Driving</h3><p style={{ textAlign: 'justify', paddingRight: '10px' }}>
              We offer a fantastic leasing program for our customers who lease for a year: CHANGE cars to the same class from our leasing inventory for up to 6 times per year at no cost! Enjoy driving and discover more wonders!
            </p></div>);

    const msg3 = this.props.locale === 'zh' ?
            (<div>
              <h3 style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>全方位服务</h3>
              <p style={{ textAlign: 'justify', fontFamily: '微软雅黑', paddingRight: '10px' }}>
              通过我们您可以尽情享受一周7天一天24小时的全方位优质服务。我们可以提供一年两次免费道路救援和资深的保险咨询。在您需要的时候一直陪伴在您身边。
            </p>
            </div>)
            :
            (<div><h3 style={{ textAlign: 'left' }}>24/7 Road Assistance</h3><p style={{ textAlign: 'justify', paddingRight: '10px' }}>
              Once you join our leasing program, we offer our customers free road assistance up to twice and insurance consulting. We are ALWAYS here for you.
            </p></div>);

    const msg4 = this.props.locale === 'zh' ?
            (<div>
              <h3 style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>更多优惠</h3>
              <p style={{ textAlign: 'justify', fontFamily: '微软雅黑', paddingRight: '10px' }}>
              更多优惠，更多惊喜等您来拿。我们会定期为我们忠实的客户提供超值的优惠和折扣。低价更换机油、换位轮胎、四轮定位，全年享受维修车辆的巨额折扣。
            </p>
            </div>)
            :
            (<div><h3 style={{ textAlign: 'left' }}>Great Deals</h3><p style={{ textAlign: 'justify', paddingRight: '10px' }}>
              Spending less to have better service! Start leasing cars with us and get discounts on maintenance. Low price on oil change, tire rotation, AND MORE!
            </p></div>);
    const width = !isMobile ? '150px' : '10%';
    const height = !isMobile ? '150px' : '10%';
    const height2 = !isMobile ? '130px' : '10%';
    const space = !isMobile ? {} : { marginTop: '-30px', marginBottom: '-50px' };
    const space2 = !isMobile ? <br></br> : <div></div>;
    const styleContent = { display: 'flex', paddingLeft: '35px', paddingRight: '35px' };
    const styleMessage = { textAlign: 'center', marginLeft: '20px', width: '100%' };

    return (
      <div >
        <div className="split-section" style={style}>
          {msg}
        </div>
        <div className="split-section" style={style}>
          <div className=" row " style={{ fontSize: '20px', color: '#000' }}>
            <div className="row" style={space}>
              <div className="col-sm-1 col-md-1 margin-b-30"></div>
              <div className="col-sm-5 col-md-5 margin-b-30">
                <span style={styleContent}>
                  <img src={th} alt="" width={width} height={height} />
                  <div className="overflow-hidden " style={styleMessage}>
                    {msg1}
                  </div>
                </span>
              </div>

              <div className="col-sm-5 col-md-5 margin-b-30">
                <span style={styleContent}>
                  <img src={cnmelogo} alt="" width={width} height={height} />
                  <div className="overflow-hidden" style={styleMessage}>
                    {msg2}
                  </div>
                </span>
              </div>
              <div className="col-sm-1 col-md-1 margin-b-30"></div>
            </div>
            {space2}
            <div className="row" >
              <div className="col-sm-1 col-md-1 margin-b-30"></div>
              <div className="col-sm-5 col-md-5 margin-b-30">
                <span style={styleContent}>
                  <img src={roadsideassistance} alt="" width={width} height={height} />
                  <div className="overflow-hidden" style={styleMessage}>
                    {msg3}
                  </div>
                </span>
              </div>

              <div className="col-sm-5 col-md-5 margin-b-30">
                <span style={styleContent}>
                  <img src={deals} alt="" width={width} height={height2} />
                  <div className="overflow-hidden" style={styleMessage}>
                    {msg4}
                  </div>
                </span>
              </div>
              <div className="col-sm-1 col-md-1 margin-b-30"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

InfoBlock11.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock11;
