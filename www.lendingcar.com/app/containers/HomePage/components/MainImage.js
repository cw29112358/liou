import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
// import styled from 'styled-components';
// import HeadImage from './pexels-photo-88628.jpg';
// import HeadImage from './bg.png';
import UserCalculator from './UserCalculator';
import './InfoBlock12.scss';
import './MainImage.scss';

class MainImage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // const Wrapper = styled.div`
    //   background: linear-gradient(
    //                      rgba(20,20,20, .5),
    //                      rgba(20,20,20, .5)),
    //                      url(${HeadImage});
    //   background-attachment: fixed;
    //   background-size: cover;
    //   background-position: -0 -0%;
    //   // padding-top: 100px;
    //   // padding-bottom: 50px;
    //   background-color: rgba(0, 0, 0, 0.7);
    //
    //   height: 600px;
    // `;

    const style = !isMobile ? { opacity: 0.9, width: '420px', zIndex: '800', paddingTop: '-0%', paddingBottom: '2%' }
      : { opacity: 0.9, width: '100%', zIndex: '800', paddingTop: '2%' };
    const spaceV = !isMobile ? <div></div> : <span></span>;
    const spaceH = !isMobile ? { } : { paddingTop: '30px', paddingLeft: '25px', paddingRight: '25px' };

    // const styleTitle1 = !isMobile ?
    // { color: '#fff', textAlign: 'left', fontSize: '25px', fontWeight: 'bold' }
    // : { color: '#000', textAlign: 'left', fontSize: '36px', fontWeight: 'bold' };

    // const styleTitle2 = !isMobile ?
    // { fontSize: '35px', fontWeight: 'bold' }
    // : { fontSize: '36px', fontWeight: 'bold' };

    // const styleTitle22 = !isMobile ?
    // { color: '#15aa9c', fontSize: '35px', fontWeight: 'bold' }
    // : { color: '#15aa9c', fontSize: '44px', fontWeight: 'bold' };

    const msgTitle1 = this.props.locale === 'zh' ?
      <h2 className="mainImgMsgTitle1Zh" >前所未有的驾驶体验</h2>
          : <h2 className="mainImgMsgTitle1" >A WONDERFUL DRIVING EXPERIENCE</h2>;

    const msgTitle2 = this.props.locale === 'zh' ?
      <h2 className="mainImgMsgTitle2Zh" ><span className="mainImgMsgTitle22Zh" >LendingCar</span>为您创造</h2>
          :
      <h2 className="mainImgMsgTitle2" >LENDINGCAR FOR <span className="mainImgMsgTitle22">YOU</span></h2>
        ;

    return (
      <div className="mainimage">
        <div className="spaceH" style={spaceH}>
          {spaceV}
          <div className=" row">

            <div className="col-xs-12 col-sm-4 col-md-6">
              {msgTitle2}
            </div>
          </div>
          <div className="row">

            <div className="col-xs-12 col-sm-4 col-md-6">
              {msgTitle1}
            </div>
          </div>
        </div>

        <div className="row center-block" >
          <div className="col-xs-12 col-sm-6 col-md-6  col-xs-offset-7 mainImgCalc" style={style}>
            <UserCalculator {...this.props} />
          </div>
        </div>
        {/* <div className="slider-main" style={{ overflow: 'hidden', textAlign: 'center', backgroundColor: '#ddd' }}>
        <div >
          <img src={HeadImage} alt="" className="img-responsive" role="presentation" width="100%" />
        </div>
      </div>*/}
      </div>
    );
  }
}

MainImage.propTypes = {
  locale: PropTypes.string,
};

export default MainImage;
