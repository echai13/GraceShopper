import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSingleProductThunk, addProductToCart } from '../../store';
import { EditProduct } from '../Product';
import { ReviewForm } from '../Review/';

/**
*  COMPONENT: From All Products Page, the singleProduct's state is set when a single product is clicked on
*/
export class SingleProduct extends Component {
  constructor(){
    super();
    this.state = {
      value: 1,
      showEditForm: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateToggle = this.updateToggle.bind(this);
  }

  componentDidMount(){
    this.props.fetchSingleProduct();
    window.scrollTo(0, 0)
  }

  handleChange(evt) {
    this.setState({value: evt.target.value});
  }

  handleSubmit(evt) {
    const { singleProduct } = this.props
    evt.preventDefault();
    const handleAdd = this.props.handleAdd;
    return handleAdd({
      productId: singleProduct.id,
      quantity: this.state.value,
      currentPrice: singleProduct.price
    })
  }

  updateToggle() {
    this.setState({ showEditForm: !this.state.showEditForm })
  }

  handleToggleEditForm = () => this.setState(prevState => ({
    showEditForm: !prevState.showEditForm,
  }));

  render() {
    const { singleProduct, isAdmin } = this.props
    var quantities = [];
    for (let i = 1; i <= singleProduct.stock; i++){
      quantities.push(<option key={i} value={i}>{i}</option>)
    }
    return (

      <div className="single-product-page">
        { isAdmin &&
          <button  className="btn btn-info btn-round" type="submit" onClick={this.updateToggle}>{this.state.showEditForm ? 'Close Edit' : 'Edit Product Details'}</button>
        }
        {isAdmin && this.state.showEditForm && <EditProduct toggleEditForm={this.handleToggleEditForm} />
        }
        <div className="row single-product">
          <div className="col-md-6 d-flex justify-content-center">
            <img src={singleProduct.image} />
          </div>

          <div className="col-md-6">
            <h1>{singleProduct.name}</h1>
            <h4><strong>Price:</strong> &nbsp;${singleProduct.price}</h4>
            {/* Tells customers if product is in stock */}
            {
              singleProduct.isAvailable ?
              (<form
                onSubmit={this.handleSubmit}>
                <label>
                  <span>In Stock</span>
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}>
                    {quantities}
                  </select>
                  <input className="btn btn-primary btn-round" type="submit" value="Add" />
                </label>
              </form>) :
              <span>Currently Out of Stock</span>
            }
            <p>
              <span className="sublabel">Categories:</span> {singleProduct.categories && singleProduct.categories.map(category => category.name).join(', ')}</p>
            <p><span className="sublabel">Details:</span> {singleProduct.description}</p>
          </div>
        </div>

        <div className="row review-heading">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <h3>Customer Reviews</h3>
          </div>
        </div>
        <div className="row reviews">
          {singleProduct && singleProduct.reviews && singleProduct.reviews.length > 0 ? singleProduct.reviews.map(review => {
            return (
              <div key={review.id} className="col-md-12 col-sm-12 col-xs-12 individual-reviews">
                <p > {review.reviewText} </p>
              </div>)
          }) : <div className="col-md-12 col-sm-12 col-xs-12 individual-reviews"><p style={{ textAlign: 'center' }}>No reviews yet</p></div>}
        </div>
        <ReviewForm history={this.props.history} />
      </div>
    )
  }
}

/**
* CONTAINER
*/
const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchSingleProduct () {
      dispatch(setSingleProductThunk(ownProps.match.params.productId))
    },
    handleAdd(productInfo) {
      dispatch(addProductToCart(productInfo));
    }
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
