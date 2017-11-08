import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addCategoriesThunk } from '../store'

const CategoryForm = (props) => {

  return (
    <div>
      <h3>Add New Category</h3>
      <form onSubmit={props.handleSubmit} className="auth-form">

        <div className="form-group">
          <label htmlFor="category"><small>Category</small></label>
          <input name="category" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <button type="submit">Add Category</button>
        </div>
      </form>
    </div>
  )
}

const mapState = null
const mapDispatch = dispatch => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      console.log(evt.target.category.value)
      dispatch(addCategoriesThunk({ name: evt.target.category.value}))
    }
  }
}

export default connect(mapState, mapDispatch)(CategoryForm)
