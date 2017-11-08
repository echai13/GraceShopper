import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


const OurTeam = () => {
  return (
    <span>
    <h2>Our Team</h2>
      <div className="row">
        <div className="col-md-6">
          <img src="/alex-lion.png" />
        </div>
        <div className="col-md-6">
          <h3>Moyouri</h3>
          <p>Moyouri the lion is a proud representative of her species. Lions are associated with pride, courage, and strength, making them a perfect cohort symbol. Sometimes referred to as the “King of the Jungle”, she prefers that they call her “Queen”.</p>

          <p>While common knowledge places lions in grasslands and plains, Moyouri shies away from the sun, and  prefers the cool shade of the jungles. They have a mysterious, majestic air to them that draws people in, but forever a stereotype breaker, she enjoys showing affection and using humor to diffuse aggression in groups.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src="/mort.png" />
        </div>
        <div className="col-md-6">
          <h3>Erica</h3>
          <p>The Lemur is a native of Madagascar. They are also found at Comoro Islands. The word Lemur is Latin and means spirits of the night. There are many legends throughout cultures that talk about the Lemurs being active at night. They are nocturnal. </p>

          <p>Lemurs are a type of primate known Prosimians. This means ape! They are considered to be the type of primate at the highest risk of extinction. There are many different species of Lemurs. They include the Alaotran Gentle Lemur, Aye- Aye Lemur, the  Indri Lemur, Black and White Ruffed Lemur, Red Ruffed Lemur, and the Ring Tailed Lemur.</p>

          <p>The smallest species of Lemur weights about 30 grams.
          The tail is often longer than the body (In most species).
          They have pseudo-opposing thumbs. They also have long toes.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src="/gloria-hippo.png" />
        </div>
        <div className="col-md-6">
          <h3>Caryn</h3>
          <p>The magnificent hippopotamus (ancient Greek for river horse) is most commonly (and frustratingly) spotted with its enormous, bulky body submerged beneath the water with only it’s nostrils peeking out. Only very lucky or patient nature lovers get to witness their various characteristics. Though they're sometimes thought of as cute and cuddly, hippos can actually be quite dangerous.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src="/melman-giraffe.png" />
        </div>
        <div className="col-md-6">
          <h3>Samantha</h3>
          <p>Many interesting facts about giraffes aren't commonly known. For example, a giraffe has such a long tongue that it can lick almost any part of its face.</p>

          <p>The tongue and lips are tough and virtually impervious to thorns, which allows them to eat many foods that other animals can't. Likewise, the hide is so thick that it was formerly used to cover shields. Even their coat, which has a peculiar smell, provides these creatures with an unusual amount of protection— scientific analysis has shown it's full of antibiotic secretions and parasite repellents.</p>
        </div>
      </div>
    </span>
  )
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(OurTeam))
