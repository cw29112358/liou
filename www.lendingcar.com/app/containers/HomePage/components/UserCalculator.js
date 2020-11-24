import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Jumbotron, Button, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import { isMobile } from 'react-device-detect';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './InfoBlock12.scss';


class UserCalculator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.changeTerm = this.changeTerm.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeCarType = this.changeCarType.bind(this);
    this.changeDriverLicense = this.changeDriverLicense.bind(this);
    this.getTermOptionName = this.getTermOptionName.bind(this);
    this.getLocationOptionName = this.getLocationOptionName.bind(this);
    this.getCarTypeOptionName = this.getCarTypeOptionName.bind(this);
    this.getDriverLicenseOptionName = this.getDriverLicenseOptionName.bind(this);

    // this.changeCarTypeAll = this.changeCarTypeAll.bind(this);
    // this.changeCarTypeEconomy = this.changeCarTypeEconomy.bind(this);
    // this.changeCarTypeStandard = this.changeCarTypeStandard.bind(this);
    // this.changeCarTypeLuxury = this.changeCarTypeLuxury.bind(this);
    // this.changeCarTypeConvertible = this.changeCarTypeConvertible.bind(this);
    // this.changeCarTypeSUV = this.changeCarTypeSUV.bind(this);
    // this.changeCarTypeVan = this.changeCarTypeVan.bind(this);
    // this.changeCarTypeSportCar = this.changeCarTypeSportCar.bind(this);
    // this.changeCarTypeOther = this.changeCarTypeOther.bind(this);
  }

  getTermOptionName() {
    const term = this.props.calculator.term;
    return term === '1' ? `1 ${this.props.intl.formatMessage(messages.month)}`
                        : `${term} ${this.props.intl.formatMessage(messages.months)}`;
  }

  getLocationOptionName() {
    const area = this.props.calculator.area;
    return !area ? `${this.props.intl.formatMessage(messages.bayArea)}`
                     : `${this.props.intl.formatMessage(messages[area])}`;
  }

  getCarTypeOptionName() {
    const carType = this.props.calculator.carType;
    return !carType ? `${this.props.intl.formatMessage(messages.all)}`
                     : `${this.props.intl.formatMessage(messages[carType])}`;
  }

  getDriverLicenseOptionName() {
    const driverLicense = this.props.calculator.dlType;
    return !driverLicense ? `${this.props.intl.formatMessage(messages.usDL)}`
                     : `${this.props.intl.formatMessage(messages[driverLicense])}`;
  }

  changeTerm(evtKey) {
    if (isMobile) {
      this.props.changeCalculator({ term: this.selectTerm.value });
    } else {
      this.props.changeCalculator({ term: evtKey });
    }
  }

  changeLocation(evtKey) {
    if (isMobile) {
      this.props.changeCalculator({ area: this.selectLocation.value });
    } else {
      this.props.changeCalculator({ area: evtKey });
    }
  }

  changeCarType(evtKey) {
    if (isMobile) {
      this.props.changeCalculator({ carType: this.selectCarType.value });
    } else {
      this.props.changeCalculator({ carType: evtKey });
    }
  }

  changeDriverLicense(evtKey) {
    if (isMobile) {
      this.props.changeCalculator({ dlType: this.selectDriverLicense.value });
    } else {
      this.props.changeCalculator({ dlType: evtKey });
    }
  }


  render() {
    const chooseLocation = isMobile ?
      (<FormControl
        componentClass="select" placeholder="select" onChange={this.changeLocation}
        inputRef={(ref) => { this.selectLocation = ref; }} defaultValue="bayArea" className="calcFieldLocation"
      >
        <option value="bayArea" >{this.props.intl.formatMessage(messages.bayArea)}</option>
      </FormControl>)
      :
      (<DropdownButton
        bsStyle="default" title={this.getLocationOptionName()} id="location"
        onSelect={this.changeLocation} className="calcFieldLocation"
      >
        <MenuItem eventKey="bayArea">{this.props.intl.formatMessage(messages.bayArea)}</MenuItem>
      </DropdownButton>);

    const chooseTerm = isMobile ?
      (<FormControl
        componentClass="select" placeholder="select" onChange={this.changeTerm}
        inputRef={(ref) => { this.selectTerm = ref; }} value={this.props.term} className="calcFieldTerm"
      >
        <option value="1">1 {this.props.intl.formatMessage(messages.month)}</option>
        <option value="2">2 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="3">3 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="4">4 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="5">5 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="6">6 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="7">7 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="8">8 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="9">9 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="10">10 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="11">11 {this.props.intl.formatMessage(messages.months)}</option>
        <option value="12">12 {this.props.intl.formatMessage(messages.months)}</option>
      </FormControl>)
      :
      (<DropdownButton
        bsStyle="default" title={this.getTermOptionName()} id="term"
        onSelect={this.changeTerm} className="calcFieldTerm"
      >
        <MenuItem eventKey="1">1 <TranslatedMessage messages={messages} messageId="month" tagName="span" /></MenuItem>
        <MenuItem eventKey="2">2 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="3">3 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="4">4 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="5">5 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="6">6 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="7">7 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="8">8 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="9">9 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="10">10 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="11">11 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
        <MenuItem eventKey="12">12 <TranslatedMessage messages={messages} messageId="months" tagName="span" /></MenuItem>
      </DropdownButton>);

    const chooseCarType = isMobile ?
        (<FormControl
          componentClass="select" placeholder="select" onChange={this.changeCarType}
          inputRef={(ref) => { this.selectCarType = ref; }} defaultValue="all" className="calcFieldCarType"
        >
          <option value="all" >{this.props.intl.formatMessage(messages.all)}</option>
          <option value="economy" >{this.props.intl.formatMessage(messages.economy)}</option>
          <option value="standard" >{this.props.intl.formatMessage(messages.standard)}</option>
          <option value="luxury" >{this.props.intl.formatMessage(messages.luxury)}</option>
          <option value="suv" >{this.props.intl.formatMessage(messages.suv)}</option>
          <option value="minivanVan" >{this.props.intl.formatMessage(messages.minivanVan)}</option>
          <option value="sportsConvertible" >{this.props.intl.formatMessage(messages.sportsConvertible)}</option>
          <option value="hybridElectric" >{this.props.intl.formatMessage(messages.hybridElectric)}</option>
          <option value="other" >{this.props.intl.formatMessage(messages.other)}</option>
        </FormControl>)
        :
        (<DropdownButton
          bsStyle="default" title={this.getCarTypeOptionName()} id="carType"
          onSelect={this.changeCarType} className="calcFieldCarType"
        >
          <MenuItem eventKey="all">{this.props.intl.formatMessage(messages.all)}</MenuItem>
          <MenuItem eventKey="economy">{this.props.intl.formatMessage(messages.economy)}</MenuItem>
          <MenuItem eventKey="standard">{this.props.intl.formatMessage(messages.standard)}</MenuItem>
          <MenuItem eventKey="luxury">{this.props.intl.formatMessage(messages.luxury)}</MenuItem>
          <MenuItem eventKey="suv">{this.props.intl.formatMessage(messages.suv)}</MenuItem>
          <MenuItem eventKey="minivanVan">{this.props.intl.formatMessage(messages.minivanVan)}</MenuItem>
          <MenuItem eventKey="sportsConvertible">{this.props.intl.formatMessage(messages.sportsConvertible)}</MenuItem>
          <MenuItem eventKey="hybridElectric">{this.props.intl.formatMessage(messages.hybridElectric)}</MenuItem>
          <MenuItem eventKey="other">{this.props.intl.formatMessage(messages.other)}</MenuItem>
        </DropdownButton>);

    const chooseDriverLicense = isMobile ?
          (<FormControl
            componentClass="select" placeholder="select" onChange={this.changeDriverLicense}
            inputRef={(ref) => { this.selectDriverLicense = ref; }} defaultValue="usDL" className="calcFieldDL"
          >
            <option value="usDL" >{this.props.intl.formatMessage(messages.usDL)}</option>
            <option value="intlDL" >{this.props.intl.formatMessage(messages.intlDL)}</option>
            <option value="foreignDL" >{this.props.intl.formatMessage(messages.foreignDL)}</option>
          </FormControl>)
          :
          (<DropdownButton
            bsStyle="default" title={this.getDriverLicenseOptionName()} id="driverLicense"
            onSelect={this.changeDriverLicense} className="calcFieldDL"
          >
            <MenuItem eventKey="usDL">{this.props.intl.formatMessage(messages.usDL)}</MenuItem>
            <MenuItem eventKey="intlDL">{this.props.intl.formatMessage(messages.intlDL)}</MenuItem>
            <MenuItem eventKey="foreignDL">{this.props.intl.formatMessage(messages.foreignDL)}</MenuItem>
          </DropdownButton>);


    const onClick = () => {
      this.props.linkTo('/inventory');
    };


    // const bayarea = <TranslatedMessage messages={messages} messageId="bayArea" tagName="span" />;
    // const leaseTerm = this.props.term === '1' ? `1 ${this.props.intl.formatMessage(messages.month)}` : `${this.props.term} ${this.props.intl.formatMessage(messages.months)}`;


    const msgTitle = this.props.locale === 'zh' ?
    '最佳汽车租赁平台' : 'Best car leasing';

    const msgDesc = this.props.locale === 'zh' ?
    '优惠好车，超高性价比，无信用检查。' : 'Great Cars. Better Deals. No credit checking.';

    const msg = this.props.locale === 'zh' ?
    '*根据租赁期限，价格将有所不同。通常您租借的期限越长，您可以获得越低的月付款。'
    :
    '*The price will be different based on leasing or rental term. Typically, the longer term you lease, the lower monthly payment you could get. ';

    const styleFont = this.props.locale === 'zh' ? { fontFamily: '微软雅黑' } : {};

    return (

      <Jumbotron className="calcJumbotron" >
        <div className="calcJumbotronDiv" >
          <Row className="show-grid" >
            <Col xs={12} md={12} className="calcMsgTitle" >
              <h2
                className="calcMsgTitleH2"
                style={styleFont}
              >{msgTitle}</h2>
            </Col>
          </Row>
          <Row className="show-grid" >
            <Col xs={12} md={12} className="calcMsgDesc" >
              <p style={styleFont}>{msgDesc}</p>
            </Col>
          </Row>

          <div className="row" >
            <Row className="show-grid calcMarginBottom" style={styleFont}>
              <Col xs={5} md={5} className="calcLabelTerm"><TranslatedMessage messages={messages} messageId="location" tagName="span" />
              </Col>
              <Col xs={6} md={6} style={{ textAlign: 'center' }}>
                {chooseLocation}
              </Col>
            </Row>
            <Row className="show-grid calcMarginBottom" style={styleFont}>
              <Col xs={5} md={5} className="calcLabelTerm" ><TranslatedMessage messages={messages} messageId="term" tagName="span" /></Col>
              <Col xs={6} md={6} style={{ textAlign: 'center' }}>
                {chooseTerm}
              </Col>
            </Row>

            <div style={{ display: 'none' }}> {/* TODO: need to add function to carType and chooseDriverLicense */}
              <Row className="show-grid calcMarginBottom" style={styleFont}>
                <Col xs={5} md={5} className="calcLabelCarType" ><TranslatedMessage messages={messages} messageId="carType" tagName="span" /></Col>
                <Col xs={6} md={6} style={{ textAlign: 'center' }}>
                  {chooseCarType}
                </Col>
              </Row>
              <Row className="show-grid calcMarginBottom" style={styleFont}>
                <Col xs={5} md={5} className="calcLabelDL" ><TranslatedMessage messages={messages} messageId="driverLicense" tagName="span" /></Col>
                <Col xs={6} md={6} style={{ textAlign: 'center' }}>
                  {chooseDriverLicense}
                </Col>
              </Row>
            </div>

          </div>

          <Row className="show-grid calcMsg" >
            <p style={styleFont}>{msg}</p>
          </Row>
        </div>

        <hr className="calcHr" ></hr>

        <div className="hide">
          <div className="row">
            <p style={{ marginTop: '0', marginBottom: '0', fontSize: '16px' }}>Pick-up Time</p>

            <Row className="show-grid" >
              <Col xs={12} md={3} >
                <DropdownButton bsStyle="default" title="Date Start" id="location" style={{ fontSize: '16px' }} >
                  <MenuItem eventKey="1">Date Start</MenuItem>
                </DropdownButton>
              </Col>
              <Col xs={12} md={3}>
                <DropdownButton bsStyle="default" title="Time" id="location" style={{ fontSize: '16px' }}>
                  <MenuItem eventKey="1">Time</MenuItem>
                </DropdownButton>
              </Col>
            </Row>

            <p style={{ marginTop: '0', marginBottom: '0', fontSize: '16px' }}>Return Time</p>

            <Row className="show-grid">
              <Col xs={12} md={3}>
                <DropdownButton bsStyle="default" title="Date Return" id="location" style={{ fontSize: '16px' }}>
                  <MenuItem eventKey="1">Date ReturnStart</MenuItem>
                </DropdownButton>
              </Col>
              <Col xs={12} md={3}>
                <DropdownButton bsStyle="default" title="Time" id="location" style={{ fontSize: '16px' }}>
                  <MenuItem eventKey="1">Time</MenuItem>
                </DropdownButton>
              </Col>
            </Row>
          </div>
        </div>

        <div className="row hide">
          <p style={{ marginTop: '0', marginBottom: '0', fontSize: '16px' }}>Prefer Car Type</p>
          <Row className="show-grid">
            <Col xs={12} md={6}>
              <DropdownButton bsStyle="default" title={this.props.selectedCarType} id="carTypeSearch" style={{ fontSize: '16px' }}>
                <MenuItem eventKey="1" onClick={this.changeCarTypeAll}>All</MenuItem>
                {/* <MenuItem eventKey="2" onClick={this.changeCarTypeEconomy}>Economy</MenuItem>
                <MenuItem eventKey="3" onClick={this.changeCarTypeStandard}>Standard</MenuItem>
                <MenuItem eventKey="4" onClick={this.changeCarTypeLuxury}>Luxury</MenuItem>
                <MenuItem eventKey="5" onClick={this.changeCarTypeConvertible}>Convertible</MenuItem>
                <MenuItem eventKey="6" onClick={this.changeCarTypeSUV}>SUV</MenuItem>
                <MenuItem eventKey="7" onClick={this.changeCarTypeVan}>Van</MenuItem>
                <MenuItem eventKey="8" onClick={this.changeCarTypeSportCar}>Sport Car</MenuItem>
                <MenuItem eventKey="9" onClick={this.changeCarTypeOther}>Other</MenuItem>*/}
              </DropdownButton>
            </Col>
          </Row>
        </div>

        <div className="text-center" onClick={onClick}>
          <Button bsStyle="primary" style={styleFont}><TranslatedMessage messages={messages} messageId="searchCars" tagName="span" /></Button>
        </div>

      </Jumbotron>

    );
  }
}

UserCalculator.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  changeCalculator: PropTypes.func,
  selectedCarType: PropTypes.string,
  linkTo: PropTypes.func,
  term: PropTypes.string,
  calculator: PropTypes.object,
};

export default injectIntl(UserCalculator);
