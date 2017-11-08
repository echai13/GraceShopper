import React from 'react'
import { Link } from 'react-router-dom'

const CartRow = (props) => {
  const element = props.element;
  const handleQuantity = props.handleQuantity;
  const handleDelete = props.handleDelete;

  return (
    <tr key={element.id}>
      <td>
        <div className="img-container">
          <Link to={`/products/${element.productId}`}>
            <img src={element.image} alt="..." />
          </Link>
        </div>
      </td>
      <td className="td-name">
        <Link to={`/products/${element.productId}`}>
          {element.name}
        </Link>
        <br /><small>from {element.category}</small>
      </td>
      <td className="td-number">
        <small>&#36;</small>{element.currentPrice}
      </td>
      <td className="td-number">
        {element.quantity}
        <div className="btn-group">

          {element.quantity > 1 ? (
            <button
            className="btn btn-round btn-info btn-xs"
            onClick={() => {
              const updateQuantity = Object.assign({}, element, { quantity: element.quantity - 1 })
              handleQuantity(updateQuantity)
            }}>
          -</button>)
            : (
              <button
                className="btn btn-round btn-info btn-xs"
                onClick={() => {
                  handleDelete(element.id)
                }}>
                -</button>)}

          <button
            disabled={element.quantity === element.stock}
            className="btn btn-round btn-info btn-xs"
            onClick={() => {
              const updateQuantity = Object.assign({}, element, { quantity: element.quantity + 1 })
              handleQuantity(updateQuantity)
            }}>
            <i className="material-icons">+</i> </button>
        </div>
      </td>
      <td className="td-number">
        <small>&#36;</small>{element.subtotal.toFixed(2)}
      </td>
      <td className="td-actions">
        <button type="button" rel="tooltip" data-placement="left" title="Remove item" className="btn btn-simple" onClick={() => handleDelete(element.id)}>
          <i className="material-icons">Remove</i>
        </button>
      </td>
    </tr>
  )
}

export default CartRow;
