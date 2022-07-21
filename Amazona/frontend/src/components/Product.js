
import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'

export default function Product({product}) {
    
    return (
        <div>
              <div key={product._id} class="card"> 
                  <Link to={`/product/${product._id}`}>
                  <img class="medium" src={product.image} alt={product.name} />
              </Link>
              <div class="card-body">
                  <Link class="name" to={`/product/${product._id}`}>
                      {product.name}
                  </Link>
              </div>
              <Rating rating={product.rating} numReviews={product.numReviews} />
             
              <div class="price">$
                  {product.price}

              </div>
              <div>
                <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}

                </Link>
              </div>

          </div>
        </div>
    )
}
