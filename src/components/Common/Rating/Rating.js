"use client"
import React from 'react'
import StarRatings from 'react-star-ratings'
import { ratingCountShow } from '../../Util/commonFunctions'

export default function RatingComponentRatingComponent({ value }) {
    return (
        <StarRatings
            rating={ratingCountShow(value) || value}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            readonly
            starDimension="19"
            starSpacing='0'
        />
    )
}
