import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';


class InfoBlock21 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const style = !isMobile ?
      { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center' }
      : { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', paddingTop: '30px', paddingBottom: '30px' };

    const msg = this.props.locale === 'zh' ? (<div style={{ color: '#000', textAlign: 'center' }}>
      <h2 style={{ color: '#000', fontWeight: 'bold', fontFamily: '微软雅黑' }}>开启投资新航线</h2>
      <br></br>
      <p style={{ fontFamily: '微软雅黑' }}>如果您是投资者，</p>
      <p style={{ fontFamily: '微软雅黑' }}>希望通过汽车租赁和进货贷款等多样化组合投资，</p>
      <p style={{ fontFamily: '微软雅黑' }}>我们可以帮助您，为您提供高质量的投资。</p>
      <p style={{ fontFamily: '微软雅黑' }}>起投门槛低，收益平均8-10%，</p>
      <p style={{ fontFamily: '微软雅黑' }}>投资周期短，平均12个月或更短。</p>
    </div>)
      : (<div style={{ color: '#000', textAlign: 'center', display: 'none' }}>
        <h2 >Start your Investment</h2>
        <br></br>
        <p style={{ paddingLeft: '5%', paddingRight: '5%', fontSize: '24px', textAlign: 'center' }}>If you&#39;re an investor looking to diversify your portfolio with car
        leasing and flooring, we can help.</p>
        <p style={{ paddingLeft: '5%', paddingRight: '5%', fontSize: '24px', textAlign: 'center' }}>We offer high-quality investments with returns averaging 8-10%
        and durations of 12 months or less.</p>
      </div>)
    ;

    const buttonStyle = this.props.locale === 'zh' ? { backgroundColor: '#ddd', marginTop: '20px' } : { display: 'none' };

    // const onClick = () => {
    //
    // };

    return (
      <div >
        <div className="split-section" style={style}>
          {msg}
          <Button bsStyle="primary" style={buttonStyle}><TranslatedMessage messages={messages} messageId="becomeInvestor" tagName="span" /></Button>
        </div>
      </div>
    );
  }
}

InfoBlock21.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock21;
