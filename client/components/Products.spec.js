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
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }

  const categories = [
    {id: 1, name: 'plant-type'},
    {id: 2, name: 'water-type'}
  ]


  beforeEach(() => {
    products = shallow(<Products products={[borgpet007]} categories={categories} />)
  })

  it('renders the name in an h3', () => {
    // once we have classNames query based on those for more flexible specificity
    const mainDiv = Array.from(products.children())
    const catDiv = mainDiv[0].props.children;
    const productDiv = mainDiv[1].props.children;
    expect(catDiv[0].props.children).to.be.equal('plant-type')
    expect(productDiv[0].props.children).to.be.equal('roselia007')
  })
})

