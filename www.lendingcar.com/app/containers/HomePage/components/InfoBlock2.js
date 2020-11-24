import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

class InfoBlock2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const style = !isMobile ?
      { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center' }
      : { backgroundColor: '#fff', textAlign: 'center', alignItems: 'center', paddingTop: '30px', paddingBottom: '30px' };

    const msg = this.props.locale === 'zh' ?
      <h2 style={{ color: '#15aa9c', fontFamily: '微软雅黑' }}>为什么选择 LendingCar</h2>
      : <h2 style={{ color: '#15aa9c' }}>Why LendingCar?</h2>;

    return (
      <div >
        <div className="split-section" style={style}>
          {msg}
        </div>
      </div>
    );
  }
}

InfoBlock2.propTypes = {
  locale: PropTypes.string,
};

export default InfoBlock2;
