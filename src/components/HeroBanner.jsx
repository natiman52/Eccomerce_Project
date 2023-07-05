import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'
const HeroBanner = ({herobanner}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{herobanner.smallText}</p>
        <h3>{herobanner.midText}</h3>
        <img src={urlFor(herobanner.image)} alt="haedphoners" style={{objectFit:"contain"}}  className='hero-banner-image'/>

        <div>
          <Link href={`/product/${herobanner.product}`}>
            <button type='button'>{herobanner.buttonText}</button> 
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{herobanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner