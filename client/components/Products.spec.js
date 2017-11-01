/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let products

  const borgpet007 = {
  	id: 1,
    name: 'roselia007',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1.45',
    description: 'flowery but techy bundle of cuteness',
    stock: 10,
    category: ['plant-type'],
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
}

  beforeEach(() => {
    products = shallow(<Products products={[borgpet007]}/>)
  })

  it('renders the name in an h3', () => {
  	const pooperties = Array.from(products.children().children())
  	console.log(pooperties[0].props.children);
    expect(pooperties[0].props.children).to.be.equal("roselia007")
  })
})

