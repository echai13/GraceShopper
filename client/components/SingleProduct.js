import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSingleProductThunk, addProductToCart } from '../store'

/**
*  COMPONENT: From All Products Page, the singleProduct's state is set when a single product is clicked on
*/

export class SingleProduct extends Component {
  constructor(){
    super();
    this.state = {value: 1}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchSingleProduct();
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

  render() {
    const { singleProduct } = this.props
    var quantities = [];
    for (let i = 1; i <= singleProduct.stock; i++){
      quantities.push(<option value={i}>{i}</option>)
    }
    return (

      <div>
        <h1>{singleProduct.name}</h1>
        <img src={singleProduct.image} />

        <div>
          <h3>{singleProduct.price}</h3>
          {/* Tells customers if product is in stock */}
          {
            singleProduct.isAvailable ?
            (<form
              onSubmit={this.handleSubmit}>
              <label>
                In Stock
                <select
                  value={this.state.value}
                  onChange={this.handleChange}>
                  {quantities}
                </select>
                <input type="submit" value="Add" />
              </label>
            </form>) :
            <span>Currently Out of Stock</span>
          }
          <h3>{singleProduct.category}</h3>
          <p>{singleProduct.description}</p>
          <p>{singleProduct.reviews}</p>
        </div>
      </div>
    )
  }
}

/**
* CONTAINER
*/
const mapState = (state) => {
  return {
    singleProduct: state.singleProduct
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
