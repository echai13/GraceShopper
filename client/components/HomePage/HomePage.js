import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { logout, searchProducts, getProductsThunk } from '../../store';

import './home-page.scss';

/**
 * HOMEPAGE COMPONENT
 */
class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts();
  };

  /**
  * RENDER FUNCTIONS:
  * 1. TOP BANNER
  * 2. FEATURED PRODUCTS
  * 3. NEWLY ARRIVED PRODUCTS
  * 4. BOTTOM BANNER
  * 5. FOOTER
  */
  renderTopBanner = () => {
    return (
      <div className="row home-image">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="d-flex justify-content-start catch-phrase">
              <div>
                <h4>ROBOPUP</h4>
                <p>*Limited Edition | Adopt Now</p>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-end shop-now">
              <button type="button" className="btn btn-secondary shop-now">
                <Link to="/products">SHOP NOW</Link>
              </button>
            </div>
          </div>
        </div>
    );
  };

  renderFeaturedProducts = () => {
    return (
      <div style={{ padding: '7vw' }}>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
            <span style={{ fontFamily: 'impact', fontSize: '2em' }}>- FEATURED -</span>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="row">
            {this.props.products && this.props.products
              .filter(product => product.isFeatured)
              .map(product => (
                <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                  <Link to={`/products/${product.id}`} className="product">
                    <span className="d-flex justify-content-center">
                      <img src={product.image} style={{ padding: '2vw' }} />
                    </span>
                    <h4 style={{ textAlign: 'center' }}>{product.name}</h4>
                    <p style={{ textAlign: 'center' }}>{`$${product.price}`}</p>
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  renderNewlyArrived = () => {
    return (
      <div style={{ padding: '7vw' }}>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
            <span style={{ fontFamily: 'impact', fontSize: '2em' }}>- NEWLY ARRIVED -</span>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="row">
            {this.props.products && this.props.products.sort((productA, productB) => productA.createdAt - productB.createdAt).slice(0, 3).map(product => (
              <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                <Link to={`/products/${product.id}`} className="product">
                  <span className="d-flex justify-content-center">
                    <img src={product.image} style={{ padding: '2vw' }} />
                  </span>
                  <h4 style={{ textAlign: 'center' }}>{product.name}</h4>
                  <p style={{ textAlign: 'center' }}>{`$${product.price}`}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  renderBottomBanner = () => {
    return (
      <div className="row promote-image">
        <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
          <div className="d-flex align-items-center justify-content-center">
            <h5>
              <p><span style={{ color: 'deeppink', fontSize: '2em' }}>HUMANELY RAISED</span></p>
              <p>&amp; CREATED TO BE HUMANELY <span style={{ color: 'red' }}>LOVED</span></p>
              <p>&amp; <span style={{ color: 'red' }}>CHERISHED.</span></p>
              Our borg companions are loving and come with their own personalities,
              to contribute to a more organic bonding process as you learn how your
              pet reacts to and interacts with its environment. Namely, you.
            </h5>
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <footer className="d-flex justify-content-center">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-xs-12">
            <h3>BorgPetCo</h3>
            <p>Est. 2017 ✌</p>
          </div>

          <div className="col-md-3 col-sm-12 col-xs-12">
            <form className="form-inline my-2 my-lg-0" onSubmit={this.props.handleSubmit}>
              <input className="form-control mr-sm-2" type="text" placeholder="Search" name="search" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>

          <div className="col-md-3 col-sm-12 col-xs-12">
            <p><Link to="/products">Shop Now</Link></p>
            <p><Link to="/">Shipping &amp; Delivery</Link></p>
            <p><Link to="/">Returns &amp; Exchanges</Link></p>
            <p><Link to="/">FAQs</Link></p>
          </div>

          <div className="col-md-3 col-sm-12 col-xs-12">
            <h5>About Us</h5>
            <p>
              <a href="https://www.linkedin/in/ericachai/" rel="noopener noreferrer" target="_blank">
                Erica Chai
              </a>
            </p>

            <p>
              <a href="https://www.linkedin.com/in/carynmccarthy/" rel="noopener noreferrer" target="_blank">
                Caryn McCarthy
              </a>
            </p>

            <p>
              <a href="https://www.linkedin.com/in/moyouri-bhattacharjee/" rel="noopener noreferrer" target="_blank">
                Moyouri Bhattacharjee
              </a>
            </p>

            <p>
              <a href="https://www.linkedin.com/in/zhangsamantha/" rel="noopener noreferrer" target="_blank">
                Samantha Zhang
              </a>
            </p>

            <p>
              <a href="https://github.com/cmccarthy15/GraceShopper/" rel="noopener noreferrer" target="_blank">
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  };

  render() {
    return (
      <div className="home-page">
        {this.renderTopBanner()}
        {this.renderFeaturedProducts()}
        {this.renderNewlyArrived()}
        {this.renderBottomBanner()}
        <hr />
        {this.renderFooter()}
      </div>
    );
  }
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(searchProducts(evt.target.search.value)) //searchProducts from store reducer
    },
    fetchAllProducts () {
      dispatch(getProductsThunk())
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(HomePage));

HomePage.propTypes = {
  /**
   * function to handle search term submit
   */
  handleSubmit: PropTypes.func.isRequired,
  /**
   * array of products
   */
  products: PropTypes.array.isRequired,
  /**
   * function to fetch all products
   */
  fetchAllProducts: PropTypes.func.isRequired,
};
