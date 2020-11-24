import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import imageRight from './1.jpg';
import imageLeft from './2.jpg';
import './InfoBlock12.scss';


class InfoBlock12 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.state = {
      hide: true,
    };
  }

  render() {
    const style = !isMobile ?
      { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', marginBottom: '-60px' }
      : { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', marginBottom: '-50px' };

    const msg = this.props.locale === 'zh' ?
      (<div><h2 style={{ color: '#000', fontFamily: '微软雅黑', fontWeight: 'bold' }}>同一款车，更高价值</h2>
        <h4 style={{ fontFamily: '微软雅黑', fontWeight: 'bold' }}>LendingCar 新型商务模式更加实惠</h4></div>)
      : (<div><h2 style={{ color: '#000' }}>SAME CAR, MORE VALUES</h2>
        <h4>LendingCar business model has fewer expensive</h4></div>);

    // const space = !isMobile ? { } : { marginTop: '-30px', marginBottom: '-50px' };

    const styleNoGutter = { marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' };

    const fontFamily = this.props.locale === 'zh' ? { fontFamily: '微软雅黑' } : {};

    const styleLeftSideColor = this.props.locale === 'zh' ? { backgroundColor: '#26eead', fontFamily: '微软雅黑' } : { backgroundColor: '#26eead' };
    const styleMiddleSideColor = this.props.locale === 'zh' ? { backgroundColor: '#fff', fontFamily: '微软雅黑' } : { backgroundColor: '#fff' };
    const styleRightSideColor = this.props.locale === 'zh' ? { backgroundColor: '#ddd', fontFamily: '微软雅黑' } : { backgroundColor: '#ddd' };

    // const styleLineOne = { fontSize: '40px', marginTop: '20px' };
    // const styleLineTwo = { fontSize: '15px', marginBottom: '5px' };

    const styleHr = this.state.hide ? { display: 'none' } : { margin: '0', padding: '0' };
    const styleHide = this.state.hide ? { display: 'none' } : {};

    const imgdescLC = !isMobile ? <div className="imgDescLeft" style={fontFamily}><TranslatedMessage messages={messages} messageId="leaseFromLC" tagName="span" /></div> : <div className="imgDescLeft"><div className="imgDescLeftLineOne" style={fontFamily}><TranslatedMessage messages={messages} messageId="leaseFromLCMobileLine1" tagName="span" /></div><div className="imgDescLeftLineTwo" style={fontFamily} ><TranslatedMessage messages={messages} messageId="leaseFromLCMobileLine2" tagName="span" /></div></div>;

    const imgdescDealer = !isMobile ? <div className="imgDescRight" style={fontFamily} ><TranslatedMessage messages={messages} messageId="buyFromDealer" tagName="span" /></div> : <div className="imgDescRight"><div className="imgDescRightLineOne" style={fontFamily}><TranslatedMessage messages={messages} messageId="leaseFromDealerMobileLine1" tagName="span" /></div><div className="imgDescRightLineTwo" style={fontFamily}><TranslatedMessage messages={messages} messageId="leaseFromDealerMobileLine2" tagName="span" /></div></div>;

    const flexLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="getCarEasy" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="getCarEasyMobileLine1" tagName="span" /></div><div className="styleLineThree" > <TranslatedMessage messages={messages} messageId="getCarEasyMobileLine2" tagName="span" /></div></div>;

    const flexDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="needMoreTime" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="needMoreTimeMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="needMoreTimeMobileLine2" tagName="span" /></div></div>;

    const drivingLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="freeCarChange" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="freeCarChangeMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="freeCarChangeMobileLine2" tagName="span" /></div></div>;

    const drivingDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="noCarChange" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="noCarChangeMobileLine1" tagName="span" /></div><div className="styleLineThree" > <TranslatedMessage messages={messages} messageId="noCarChangeMobileLine2" tagName="span" /></div></div>;

    const cashflowLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="monthlyPayCamry" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="monthlyPayCamryMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="monthlyPayCamryMobileLine2" tagName="span" /></div></div>;

    const cashflowDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="priceCamry" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="priceCamryMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="priceCamryMobileLine2" tagName="span" /></div></div>;

    const depreciationLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="noResponsibility" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="noResponsibilityMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="noResponsibilityMobileLine2" tagName="span" /></div></div>;

    const depreciationDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="yearlyDepreciation" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="yearlyDepreciationMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="yearlyDepreciationMobileLine2" tagName="span" /></div></div>;

    const taxLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="taxFee" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="taxFeeMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="taxFeeMobileLine2" tagName="span" /></div></div>;

    const taxDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="camryTax" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="camryTaxMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="camryTaxMobileLine2" tagName="span" /></div></div>;

    const additionfeeLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="noHiddenFee" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="noHiddenFeeMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="noHiddenFeeMobileLine2" tagName="span" /></div></div>;

    const additionfeeDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="serviceFee" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="serviceFeeMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="serviceFeeMobileLine2" tagName="span" /></div></div>;

    const creditcheckLC = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="noHighCreditScore" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="noHighCreditScoreMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="noHighCreditScoreMobileLine2" tagName="span" /></div></div>;

    const creditcheckDealer = !isMobile ? <div className="styleLineTwo" ><TranslatedMessage messages={messages} messageId="highCreditScore" tagName="span" /></div> : <div><div className="styleLineTwo"><TranslatedMessage messages={messages} messageId="highCreditScoreMobileLine1" tagName="span" /></div><div className="styleLineThree" ><TranslatedMessage messages={messages} messageId="highCreditScoreMobileLine2" tagName="span" /></div></div>;


    return (
      <div >
        <div className="split-section" style={style}>
          {msg}
        </div>
        <div className="split-section " style={style}>
          <div className=" row divSectionDivRow">

            <div className="row " >
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-4  col-sm-4 margin-b-1 noGutter" >
                <img src={imageLeft} alt="" width="100%" className="imgHeight" />
                {imgdescLC}
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-4  col-sm-4 margin-b-1 noGutter" >
                <img src={imageRight} alt="" width="100%" className="imgHeight" />
                {imgdescDealer}
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row center " style={{ position: 'relative', textAlign: 'center' }}>
              <div className="col-xs-1 col-sm-1 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
              <div className="col-xs-4  col-sm-4 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
              <div className="col-xs-2  col-sm-2  margin-b-1 divCircle" ><i className="fa fa-circle vsCircle" ><div
                className="vsLetters"
              >VS</div></i></div>
              <div className="col-xs-4  col-sm-4 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
            </div>

            <div className="row " >
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3 col-sm-3 margin-b-1" style={styleNoGutter} >
                <div className="overflow-hidden " style={styleLeftSideColor} >
                  <div className="styleLineOne" >$0</div>
                  {flexLC}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor} >
                  <br ></br>
                  <div className="middleFont" ><TranslatedMessage messages={messages} messageId="flexibility" tagName="span" /></div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-3 col-sm-3 margin-b-1 " style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor} >
                  <div className="styleLineOne" >$0</div>
                  {flexDealer}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$0</div>
                  {drivingLC}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2  col-sm-2 margin-b-1 " style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <div className="marginTop" ><TranslatedMessage messages={messages} messageId="driving" tagName="span" /></div>
                  <div className="marginBottom" ><TranslatedMessage messages={messages} messageId="freshness" tagName="span" /></div>
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$0</div>
                  {drivingDealer}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$793</div>
                  {cashflowLC}
                </div>
                <hr style={styleHr}></hr>
              </div>
              <div className="col-xs-2  col-sm-2  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <br ></br>
                  <div className="middleFont" ><TranslatedMessage messages={messages} messageId="cashflow" tagName="span" /></div>
                  <br ></br>
                </div>
                <hr style={styleHr}></hr>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$21,994</div>
                  {cashflowDealer}
                </div>
                <hr style={styleHr}></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row " style={styleHide}>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$0</div>
                  {depreciationLC}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2  col-sm-2  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <br ></br>
                  <div className="middleFont" ><TranslatedMessage messages={messages} messageId="depreciation" tagName="span" /></div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$4,352</div>
                  {depreciationDealer}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row " style={styleHide}>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$0</div>
                  {taxLC}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2  col-sm-2  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <br ></br>
                  <div className="middleFont" ><TranslatedMessage messages={messages} messageId="tax" tagName="span" /></div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$2,266</div>
                  {taxDealer}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row " style={styleHide}>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$0</div>
                  {additionfeeLC}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2  col-sm-2 margin-b-1 " style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <div className="marginTop" ><TranslatedMessage messages={messages} messageId="additional" tagName="span" /></div>
                  <div className="marginBottom" ><TranslatedMessage messages={messages} messageId="fee" tagName="span" /></div>
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$410</div>
                  {additionfeeDealer}
                </div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <div className="row " style={styleHide}>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleLeftSideColor}>
                  <div className="styleLineOne">$0</div>
                  {creditcheckLC}
                </div>
              </div>
              <div className="col-xs-2  col-sm-2  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleMiddleSideColor}>
                  <br ></br>
                  <div className="middleFont" ><TranslatedMessage messages={messages} messageId="creditcheck" tagName="span" /></div>
                  <br ></br>
                </div>
              </div>
              <div className="col-xs-3  col-sm-3 margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="styleLineOne">$0</div>
                  {creditcheckDealer}
                </div>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1"></div>
            </div>

            <a role="button" onClick={() => this.setState({ hide: !this.state.hide })} >
              {this.state.hide && <i className="fa fa-caret-down fa-2x collapseColor" ></i>}
              {!this.state.hide && <i className="fa fa-caret-up fa-2x collapseColor" ></i>}
            </a>

            <div className="row margin-b-50" style={{ marginTop: '5px' }}>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
              <div className="col-xs-8  col-sm-8  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden bgOCgreen" >
                  <div className="summaryUpper" style={{ fontFamily: '微软雅黑' }}><TranslatedMessage messages={messages} messageId="saving" tagName="span" /></div>

                  <div className="summaryLower" >$7,028</div>
                </div>
              </div>
              <div className="col-xs-2 col-sm-2 margin-b-1"></div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

InfoBlock12.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock12;
