/**
*
* BasicPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Panel } from 'react-bootstrap';
// import styled from 'styled-components';


class BasicPanelOption extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { showHeader, showBackground, title, children, closable, collapsible } = this.props;
    const headerStyle = showHeader ? {} : { display: 'none' };
    const backgroundStyle = showBackground ? {} : { backgroundColor: '#f3f3f4', borderStyle: 'none' };
    return (
      <Col >
        <div className="ibox float-e-margins" >
          <div className="ibox-title" style={headerStyle}>
            <h5>{title}</h5>
            <div className="ibox-tools">
              {collapsible &&
                <a className="collapse-link" onClick={this.onCollapse}>
                  {this.state.open && <i className="fa fa-chevron-up"></i>}
                  {!this.state.open && <i className="fa fa-chevron-down"></i>}
                </a>
              }
              {closable &&
                <a className="close-link">
                  <i className="fa fa-times"></i>
                </a>
              }
            </div>
          </div>
          <Panel className="ibox-content" collapsible={collapsible} expanded={this.state.open} style={backgroundStyle}>
            {children}
          </Panel>
        </div>
      </Col>
    );
  }
}

BasicPanelOption.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  closable: PropTypes.bool,
  collapsible: PropTypes.bool,
  showHeader: PropTypes.bool,
  showBackground: PropTypes.bool,
};

export default BasicPanelOption;
