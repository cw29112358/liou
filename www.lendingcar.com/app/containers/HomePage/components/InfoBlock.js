import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


class InfoBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div style={{ marginTop: '0' }}>

        <div className="split-section" style={{ backgroundColor: '#ddd', textAlign: 'left' }}>
          <span style={{ display: 'flex', paddingLeft: '30%' }}>
            <h2 style={{ color: '#15aa9c' }}>Join our Membership Club?</h2>
            <Button bsStyle="primary" style={{ marginLeft: '20px', marginRight: '20px', height: '50%' }}>Join Now</Button>
            <a role="button">Learn More</a></span>
        </div>
      </div>


    );
  }
}

InfoBlock.propTypes = {

};

export default InfoBlock;
