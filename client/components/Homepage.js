import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { logout } from "../store"

/**
 * COMPONENT
 */
const Homepage = props => {
  const {handleClick, isLoggedIn, handleSubmit} = props
  // eventually find a few products from all products and display them on home?
  return (
    <div className="homepage">
      <div className="page-header header-filter">
        <div className="row">
            <div className="col-md-6">
              <h1 className="title">Buy Our Robot Pals</h1>
              <h4>
                 Humanely raised and created to be humanely loved and cherished.
                 Our borg companions are loving and come with their own personalities,
                 to contribute to a more organic bonding process as you learn how your
                 pet reacts to and interacts with its environment. Namely, you.
              </h4>
              <br />
              <Link to="/products">
                <div className="btn btn-primary btn-raised btn-lg">
                  See Our Robots
                </div>
              </Link>
            </div>
          </div>
      </div>
      <hr />
      <h2>Our Team</h2>
        <div className="row">
          <div className="col-md-6">
            <img src="/alex-lion.png" />
          </div>
          <div className="col-md-6">
            <h3>Name</h3>
            <p>Brownie icing macaroon jelly tiramisu caramels jujubes oat cake cheesecake. Jelly beans jelly-o jelly beans. Cake jelly beans sesame snaps halvah lemon drops halvah chupa chups. Carrot cake soufflé candy canes. Marshmallow sugar plum jelly dessert biscuit pudding ice cream apple pie wafer. Muffin fruitcake jelly-o sugar plum. Bonbon tiramisu cupcake danish tart biscuit jelly tiramisu powder. Sweet roll tiramisu sweet jujubes. Jelly cheesecake marshmallow muffin macaroon tootsie roll wafer toffee. Cotton candy powder fruitcake liquorice tart gummi bears pudding. </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img src="/mort.png" />
          </div>
          <div className="col-md-6">
            <p>Brownie icing macaroon jelly tiramisu caramels jujubes oat cake cheesecake. Jelly beans jelly-o jelly beans. Cake jelly beans sesame snaps halvah lemon drops halvah chupa chups. Carrot cake soufflé candy canes. Marshmallow sugar plum jelly dessert biscuit pudding ice cream apple pie wafer. Muffin fruitcake jelly-o sugar plum. Bonbon tiramisu cupcake danish tart biscuit jelly tiramisu powder. Sweet roll tiramisu sweet jujubes. Jelly cheesecake marshmallow muffin macaroon tootsie roll wafer toffee. Cotton candy powder fruitcake liquorice tart gummi bears pudding. </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img src="/gloria-hippo.png" />
          </div>
          <div className="col-md-6">
            <p>Brownie icing macaroon jelly tiramisu caramels jujubes oat cake cheesecake. Jelly beans jelly-o jelly beans. Cake jelly beans sesame snaps halvah lemon drops halvah chupa chups. Carrot cake soufflé candy canes. Marshmallow sugar plum jelly dessert biscuit pudding ice cream apple pie wafer. Muffin fruitcake jelly-o sugar plum. Bonbon tiramisu cupcake danish tart biscuit jelly tiramisu powder. Sweet roll tiramisu sweet jujubes. Jelly cheesecake marshmallow muffin macaroon tootsie roll wafer toffee. Cotton candy powder fruitcake liquorice tart gummi bears pudding. </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img src="/melman-giraffe.png" />
          </div>
          <div className="col-md-6">
            <p>Brownie icing macaroon jelly tiramisu caramels jujubes oat cake cheesecake. Jelly beans jelly-o jelly beans. Cake jelly beans sesame snaps halvah lemon drops halvah chupa chups. Carrot cake soufflé candy canes. Marshmallow sugar plum jelly dessert biscuit pudding ice cream apple pie wafer. Muffin fruitcake jelly-o sugar plum. Bonbon tiramisu cupcake danish tart biscuit jelly tiramisu powder. Sweet roll tiramisu sweet jujubes. Jelly cheesecake marshmallow muffin macaroon tootsie roll wafer toffee. Cotton candy powder fruitcake liquorice tart gummi bears pudding. </p>
          </div>
        </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id //coerces empty objects to boolean
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    handleSubmit (evt) {
      dispatch(searchProducts(evt.target.search.value)) //searchProducts from store reducer
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Homepage))

Homepage.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
