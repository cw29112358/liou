/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';


function CartNavMenu() {
  return (
    <aside id="cartNavmenu" className="navmenu navmenu-default navmenu-fixed-right offcanvas">
      <div className="cart-inner">
        <h4>Your cart (3)</h4>
        <hr />
        <ul className="list-unstyled cart-list margin-b-30">
          <li className="clearfix">
            <div className="cart-thumb">
              <a role="button">
                <img src="images/products/thumb3.jpg" alt="" className="img-responsive" width="60" />
              </a>
            </div>
            <div className="cart-content">
              <span className="close"><i className="fa fa-times"></i></span>
              <h5><a role="button">Dip-Dye Tote Bag</a></h5>
              <p><span className="price">$48.00</span>  x 2</p>
            </div>
          </li>
          <li className="clearfix">
            <div className="cart-thumb">
              <a role="button">
                <img src="images/products/thumb1.jpg" alt="" className="img-responsive" width="60" />
              </a>
            </div>
            <div className="cart-content">
              <span className="close"><i className="fa fa-times"></i></span>
              <h5><a role="button">Nackless Jewelery</a></h5>
              <p><span className="price">$48.00</span>  x 2</p>
            </div>
          </li>
          <li className="clearfix">
            <div className="cart-thumb">
              <a role="button">
                <img src="images/products/thumb2.jpg" alt="" className="img-responsive" width="60" />
              </a>
            </div>
            <div className="cart-content">
              <span className="close"><i className="fa fa-times"></i></span>
              <h5><a role="button">10-Unit System Chair</a></h5>
              <p><span className="price">$48.00</span>  x 2</p>
            </div>
          </li>
          <li>
            <div className="text-center">
              <a href="checkout.html" className="btn btn-default">Checkout</a>
              <a href="cart.html" className="btn btn-primary">View Cart</a>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

CartNavMenu.propTypes = {

};

export default CartNavMenu;
