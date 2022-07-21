import React from 'react'

export default function Rating({rating,numReviews,caption}) {
    return (
        // "fa fa-star-half-o" aria-hidden="true"
        <div class="rating">
        <span>
{/* <i class='fa fa-star-half-o'></i> */}
      <i className={  rating>=1?"fa-solid fa-star": rating>= 0.5?"fa-regular fa-star-half-stroke ":"fa-regular fa-star"}></i>
        </span>
        <span>
        {/* <i class="fa-regular fa-star-half-stroke"></i> */}
        <i className={ rating>=2?"fa-solid fa-star": rating>= 1.5?"fa-regular fa-star-half-stroke":"fa-regular fa-star"}></i>
        </span>
        <span>
        <i className={ rating>=3?"fa-solid fa-star":rating >= 2.5?"fa-regular fa-star-half-stroke":"fa-regular fa-star"}></i>
        </span>
        <span>
        <i className={ rating>=4?"fa-solid fa-star":rating >= 3.5?'fa-regular fa-star-half-stroke':"fa-regular fa-star"}></i>
        </span>
        <span>
        <i className={ rating >= 5?'fa-solid fa-star':rating >= 4.5?'fa-regular fa-star-half-stroke':'fa-regular fa-star'}></i>
        </span>

        <span>{caption?(<span>{caption}</span>):(`${numReviews + 'reviews'}`)}</span>

    </div>
    )
}
