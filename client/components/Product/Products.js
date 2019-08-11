import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { addProductToCart, getProductsThunk } from '../../store';

import { ProductPreview } from './';
import './product.scss';

const stars = [];
let numberOfStars = '';

const buildStarsForReviewSection = () => {

  for (let i = 5; i >= 1; i--) {
    for (let j = i; j >= 1; j--) {
      numberOfStars += '★'
    }

    for (let k = 5 - i; k >= 1; k--) {
      numberOfStars += '☆'
    }

    stars.push(numberOfStars);
    numberOfStars = '';
  };
};

const sortOptions = [
  {
    label: 'Select option ...',
    value: 'Select option',
  },
  {
    label: 'name: A to Z',
    value: 'ALPHABET_ASCENDING',
  },
  {
    label: 'name: Z to A',
    value: 'ALPHABET_DESCENDING',
  },
  {
    label: 'price: low to high',
    value: 'PRICE_ASCENDING',
  },
  {
    label: 'price: high to low',
    value: 'PRICE_DESCENDING',
  },
];

const sortByAlphabetAscending = (first, second) => first.name.localeCompare(second.name);
const sortByAlphabetDescending = (first, second) => second.name.localeCompare(first.name);
const sortByPriceAscending = (first, second) => parseInt(first.price) - parseInt(second.price);
const sortByPriceDescending = (first, second) => parseInt(second.price) - parseInt(first.price);

/**
 * COMPONENT
 */
export class Products extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentCategory: 'All',
      sortFilter: '',
      reviewFilter: '',
    }
    this.updateCategory = this.updateCategory.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.array,
        createdAt: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        isAvailable: PropTypes.bool,
        isFeatured: PropTypes.bool,
        name: PropTypes.string,
        reviews: PropTypes.array,
        stock: PropTypes.number,
      })
    ),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        updatedAt: PropTypes.string,
      })
    ),
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    // TOOD: Need to build this out
    // buildStarsForReviewSection();
  }

  updateCategory = (currentCategory) => {
    this.setState({ currentCategory });
    this.props.fetchAllProducts();
  };

  // TODO: this could be used in the product preview to add a single product to the cart
  // but it is not working currently and it's low priority
  addProductToCart = (productId) => {
    this.props.handleAdd({
      productId,
      quantity: 1
    });
  };

  renderCategory = ({ id, name }) => (
    <label key={id}>
      <input
        type="radio"
        value={name}
        checked={this.state.currentCategory === name}
        onChange={() => this.updateCategory(name)}
      />
        {name}
    </label>
  );

  handleSelectSort = (event) => {
    this.setState({ sortFilter: event.target.value });
  };

  sortProducts = (products) => {
    console.log('products: ', products);

    switch(this.state.sortFilter) {
      case 'ALPHABET_ASCENDING':
        return products.sort(sortByAlphabetAscending);
      case 'ALPHABET_DESCENDING':
        return products.sort(sortByAlphabetDescending);
      case 'PRICE_ASCENDING':
        return products.sort(sortByPriceAscending);
      case 'PRICE_DESCENDING':
        return products.sort(sortByPriceDescending);
      default:
        return products;
    };
  };

  renderSortOption = ({ label, value }, index) => (
    <option
      key={value}
      value={value}
      selected={index === 0}
      disabled={index === 0}
    >
      {label}
    </option>
  );

  // TODO: Implement this rating system
  // renderStarRow = (star, index) => (
  //   <li key={star}>{star.length - index} stars {star}</li>
  // );

  filterProductByCategory = (product) => {
    const productCategories = product.categories.map(category => category.name);
    const { currentCategory } = this.state;

    const shouldShowProductPreview = (
      (currentCategory === 'All'
      || productCategories.indexOf(currentCategory) > -1)
      && product.isAvailable
    );

    return shouldShowProductPreview;
  }

  renderProduct = (product) => {
    return <ProductPreview
      key ={product.id}
      product={product}
      handleAdd={this.addProductToCart}
    />
  };

  renderSortByCategories = () => (
    <React.Fragment>
        <div className="col-md-12 col-sm-6 col-xs-12">
          <h6 className="d-flex justify-content-center align-items-center">
            Select Categories
          </h6>

          <div className="filter-options">
            <label>
              <input
                type="radio"
                key={0}
                checked={this.state.currentCategory === 'All'}
                onChange={() => this.updateCategory('All')} />All
            </label>

            {this.props.categories.map(this.renderCategory)}
          </div>
        </div>

        {/* <span>
          <div className="col-md-12 col-sm-6 col-xs-12">
            
        </span> */}
    </React.Fragment>
  );

  renderSort = () => (
    <React.Fragment>
        <div className="col-md-12 col-sm-6 col-xs-12">
          <h6 className="d-flex justify-content-center align-items-center">
            Sort Product Listings
          </h6>

          <div className="filter-options">
            <select onChange={this.handleSelectSort}>
              {sortOptions.map(this.renderSortOption)}
            </select>
          </div>
        </div>
      {/* </div> */}

      {/* <div className="row sortDropdown"> */}
        {/* <div className="col-md-12 col-sm-6 col-xs-12 d-flex justify-content-center">
          
        </div> */}
    </React.Fragment>
  );

  // renderSortByReviews = () => (
  //   <div className="row sortByReviews">
  //     <div className="col-md-12 col-sm-6 col-xs-12">
  //       <h6 className="d-flex justify-content-center align-items-center">By Reviews</h6>
  //       <ul>
  //         {stars.map(this.renderStarRow)}
  //       </ul>
  //     </div>
  //   </div>
  // );

  // Left rail
  renderFilters = () => {
    return (
      <div className="col-md-3 col-sm-12 col-xs-12 categories">
        <div className="row">
          {this.renderSortByCategories()}
          {this.renderSort()}
          {/* {this.renderSortByReviews()} */}
        </div>
      </div>
    );
  };

  // Right rail
  renderProducts = () => (
    <div className="col-md-9 col-sm-12 col-xs-12 all-products">
      <div className="row">
        {this.sortProducts(this.props.products.filter(this.filterProductByCategory)).map(this.renderProduct)}
      </div>
    </div>
  );

  render() {
    return (
      <div className="product-page">
        <div className="row product-page-image" />

        <div className="row show-products">
          {this.renderFilters()}
          {this.renderProducts()}
        </div>
      </div>
    );
  };
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAdd(productInfo) {
      dispatch(addProductToCart(productInfo));
    },
    fetchAllProducts () {
      dispatch(getProductsThunk())
    },
  };
};

export default connect(mapState, mapDispatch)(Products);
