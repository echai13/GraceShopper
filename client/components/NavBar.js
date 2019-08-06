import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { logout, removeCart, searchProducts } from '../store';

class NavBar extends Component {
  state = {
    searchToggle: false,
  };

  renderSearch() {
    return (
      this.state.searchToggle && <form
        className="form-inline my-2 my-lg-0" 
        onSubmit={this.props.handleSubmit}
      >
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          name="search"
        />

        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  };

  render() {
    const {
      handleClick,
      isLoggedIn,
      isAdmin,
    } = this.props;

    return (
      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-inverse p-4">
            <div className="row d-flex justify-content-center">
              <div className="col-md-2 col-sm-4 col-4"><Link to="/products">All Products</Link></div>
              <div className="col-md-2 col-sm-4 col-4"><a href="https://github.com/cmccarthy15/GraceShopper">Our GitHub</a></div>
              { isAdmin && <div className="col-md-2 col-sm-4 col-4"><Link to="/admin">Admin</Link></div> }
              { isLoggedIn && <div className="col-md-2 col-sm-4 col-4"><a href="/" onClick={handleClick}>Logout</a></div> }
              <div className="col-md-2 col-sm-4 col-4">FAQ</div>
            </div>
          </div>
        </div>

        <nav className="my-navbar">
          <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-3 navbrand">
              <Link className="my-navbrand" to="/">BorgPet<span style={{ color: 'lightcyan' }}>Co</span></Link>
            </div>
            <div className="col-md-9 col-sm-9 col-xs-9 d-flex justify-content-end menu-items">
              <Link to="/cart" className="shopping-cart d-flex align-items-center"><i className="fa fa-shopping-cart" /><span className="badge" /></Link>
              <button type="button" className="search-button" onClick={() => this.setState({ searchToggle: !this.state.searchToggle })}>
                <i className="fa fa-search" />
              </button>
              {this.renderSearch()}
              <Link to="/home" className="d-flex align-items-center"><i className="fa fa-user" /></Link>
              <a className="d-flex align-items-center">
                <span>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars" />
                  </button>
                </span>
              </a>
            </div>
          </div>
        </div>
        </nav>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id, //coerces empty objects to boolean
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
      dispatchEvent(removeCart)
      //dispatch removeUser (from store)
      //dispatch removeCart(from store)
    },
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(searchProducts(evt.target.search.value)) //searchProducts from store reducer
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))

NavBar.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
