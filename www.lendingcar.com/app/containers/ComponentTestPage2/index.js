/*
 *
 * ComponentTestPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import InsuranceModal from './components/InsuranceModal';

export class ComponentTestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      IsInsuranceModalShow: true,
    };
  }

  hideInsuranceModal = () => {
    this.setState({ IsInsuranceModalShow: false });
  }

  render() {
    return (
      <div>
        <div className="container page-container" >
          <InsuranceModal show={this.state.IsInsuranceModalShow} onHide={this.hideInsuranceModal} />
        </div>
      </div>
    );
  }
}

ComponentTestPage.propTypes = {

};

const mapStateToProps = createPropsSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTestPage);
