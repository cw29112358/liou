/**
*
* BasicPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import styled from 'styled-components';

const SidePanelDiv = styled.div`
  padding: 15px;
  backgroundColor: #fff;
  color: #28d89d;
`;


class BasicSidePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.state = {
      open: this.props.collapseOpen,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { title, children, collapsible } = this.props;

    // const onClick = () => {
    //   this.props.changeCategory('brand');
    // };

    return (
      <div>
        <SidePanelDiv>
          <a role="button" onClick={() => this.setState({ open: !this.state.open })} >
            {title}
          </a>
          {collapsible &&
          <a className="collapse-link pull-right" onClick={this.onCollapse}>
            {this.state.open && <i className="fa fa-minus" style={{ color: '#888' }}></i>}
            {!this.state.open && <i className="fa fa-plus" style={{ color: '#888' }}></i>}
          </a>
          }
        </SidePanelDiv>
        <Panel className="ibox-content" collapsible={collapsible} expanded={this.state.open} style={{ margin: '10px 0' }}>
          {children}
        </Panel>
      </div>
    );
  }
}

BasicSidePanel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  // closable: PropTypes.bool,
  collapsible: PropTypes.bool,
  collapseOpen: PropTypes.bool,
};

export default BasicSidePanel;
