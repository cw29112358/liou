import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

import imageRight from './1.jpg';
import imageLeft from './2.jpg';
import './InfoBlock12.scss';


class InfoBlock12M extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.state = {
      hide: false,
    };
  }

  render() {
    const style = !isMobile ?
      { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', marginBottom: '-60px' }
      : { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', marginBottom: '-50px' };

    const msg = this.props.locale === 'zh' ?
      <h2 style={{ color: '#000', fontFamily: '微软雅黑' }}>为什么选择 LendingCar</h2>
      : (<div><h2 style={{ color: '#000' }}>SAME CAR. MORE VALUES.</h2>
        <h4>LendingCars business model has fewer expensive.</h4></div>);

    // const space = !isMobile ? { } : { marginTop: '-30px', marginBottom: '-50px' };

    const styleNoGutter = { marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' };

    // const styleLeftSideColor = { backgroundColor: '#26eead' };
    // const styleMiddleSideColor = { backgroundColor: '#fff' };
    const styleRightSideColor = { backgroundColor: '#ddd' };

    const styleLineOne = { fontSize: '25px', marginTop: '20px' };
    const styleLineTwo = { fontSize: '9px', marginBottom: '5px' };

    // const styleHr = this.state.hide ? { display: 'none' } : { margin: '0', padding: '0' };
    const styleHide = this.state.hide ? { display: 'none' } : {};
    const styleShow = !this.state.hide ? { display: 'none' } : {};

    const styleHeader = { color: '#fff', fontSize: '14px' };
    const styleHeaderBg = { marginRight: '1px', paddingTop: '15px', paddingBottom: '15px', borderBottom: '1px solid #fff' };

    const styleFontSize = { fontSize: '9px' };
    const styleMarginTop = { marginTop: '15px', fontSize: '9px' };
    const styleMarginBottom = { paddingBottom: '11px', fontSize: '9px' };

    const styleBgGray = { backgroundColor: '#c0c0c0', marginRight: '1px' };
    const styleBgGreen = { backgroundColor: '#26eead', marginRight: '1px', borderBottom: '1px solid #c0c0c0' };

    return (
      <div >
        <div className="split-section" style={style}>
          {msg}
        </div>
        <div className="split-section " style={style}>
          <div className=" row divSectionDivRow" style={{ marginTop: '-30px' }}>

            <div className="row noShow" >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-5  col-sm-5 margin-b-1 noGutter" >
                <img src={imageLeft} alt="" width="100%" className="imgHeight" />
                <div className="imgDescLeft" >Lease from LendingCar</div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-5  col-sm-5 margin-b-1 noGutter" >
                <img src={imageRight} alt="" width="100%" className="imgHeight" />
                <div className="imgDescRight" >Buy from Dealers</div>
                <hr className="noMarginPadding" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row center noShow" style={{ position: 'relative', textAlign: 'center' }}>
              <div className="col-xs-1 col-sm-1 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
              <div className="col-xs-4  col-sm-4 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
              <div className="col-xs-2  col-sm-2  margin-b-1 divCircle" ><i className="fa fa-circle vsCircle" ><div
                className="vsLetters"
              >VS</div></i></div>
              <div className="col-xs-4  col-sm-4 margin-b-1" style={{ marginTop: '0', marginBottom: '0' }}></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1 "></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden bgOCgreen" style={styleHeaderBg}>

                  <div className="middleFont" style={styleHeader} >Experience</div>

                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden bgOCgreen" style={styleHeaderBg}>
                  <div className="middleFont" style={styleHeader}>LendingCar</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden bgOCgreen" style={styleHeaderBg}>
                  <div className="middleFont" style={styleHeader}>Lease from LendingCar</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden bgOCgreen" style={styleHeaderBg}>
                  <div className="middleFont" style={styleHeader}>Buy from Dealers</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden bgOCgreen" style={styleHeaderBg}>
                  <div className="middleFont" style={styleHeader}>Dealers</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1 "></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <div className="" style={styleFontSize} >FLEXIBILITY</div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo} > Get cars more easily</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>Need more time and energy to make decision</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>


            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <div className="" style={styleMarginTop}>DRIVING</div>
                  <div className="" style={styleMarginBottom}>FRESHNESS</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>Free car change in same-level for up 6 times</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>No change is allowed</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <div className="" style={styleFontSize}>CASH FLOW</div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$793</div>
                  <div className="" style={styleLineTwo}>Monthly payment of Toyota Camry 2016</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$21,994</div>
                  <div className="" style={styleLineTwo}>KBB invoice price for Toyota Camry 2016</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <div className="" style={styleFontSize}>DEPRECIATION</div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <a role="button" onClick={() => this.setState({ hide: !this.state.hide })} >
                    {this.state.hide && <i className="fa fa-angle-left fa-2x collapseColor" style={{ marginBottom: '12px' }}></i>}

                  </a>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>No responsibility</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$4,352</div>
                  <div className="" style={styleLineTwo}>First year 20%, 2nd-5th year 15%</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <a role="button" onClick={() => this.setState({ hide: !this.state.hide })} >
                    {!this.state.hide && <i className="fa fa-angle-right fa-2x collapseColor" style={{ marginBottom: '12px' }}></i>}
                  </a>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <div className="" style={styleFontSize}>TAX</div>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>Tax free</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$2,266</div>
                  <div className="" style={styleLineTwo}>9.2% tax of Toyota Camry 2016</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <div className="" style={styleMarginTop}>ADDITIONAL</div>
                  <div className="" style={styleMarginBottom} >FEE</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>No registration, documentation and hidden fee</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$410</div>
                  <div className="" style={styleLineTwo}>Registration, documentation and service fee</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row " >
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" >
                <div className="overflow-hidden " style={styleBgGray}>
                  <div className="" style={styleMarginTop}>CREDIT</div>
                  <div className="" style={styleMarginBottom} >CHECK</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGreen}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>High credit score is not necessary</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-6 col-sm-4 margin-b-1 noGutter" style={styleShow}>
                <div className="overflow-hidden " style={styleRightSideColor}>
                  <div className="" style={styleLineOne}>$0</div>
                  <div className="" style={styleLineTwo}>High credit score is required</div>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-2 col-sm-2  margin-b-1 noGutter" style={styleHide}>
                <div className="overflow-hidden " style={styleBgGray}>
                  <br ></br>
                  <br ></br>
                  <br ></br>
                </div>
                <hr className="noMarginPadding noShow" ></hr>
              </div>
              <div className="col-xs-1 col-sm-1 col-sm-1 margin-b-1"></div>
            </div>

            <div className="row margin-b-50" style={{ marginTop: '5px' }}>
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
              <div className="col-xs-10  col-sm-4  margin-b-1" style={styleNoGutter}>
                <div className="overflow-hidden bgOCgreen" >
                  <div className="summaryUpper" >YOUR TOTAL SAVING</div>

                  <div className="summaryLower" >$7,028</div>
                </div>
              </div>
              <div className="col-xs-1 col-sm-1 margin-b-1"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

InfoBlock12M.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock12M;
