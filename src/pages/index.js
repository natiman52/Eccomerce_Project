import React from 'react'
import { client,urlFor } from '../lib/client'
import { Product,FooterBanner,Footer,HeroBanner } from '../components'
const index = ({products,Banner}) => {
  console.log(Banner)
  return (
   <>
   <HeroBanner herobanner={Banner.length && Banner[0]}/>

   <div className='products-heading'>
    <h2>Best selling products</h2>
    <p>Speakers of many Varitions</p>
   </div>

   <div className='products-container'>
    {products?.map( item => (
      <Product key={item._id} Product={item} />
    ))}
   </div>

   <FooterBanner footerbanner={Banner && Banner[0]}/>
   </>
  )
}
export const getServerSideProps = async () => {
  const query = "*[_type == 'product']"
  const products = await client.fetch(query)
  const bannerQuery = "*[_type == 'banner']"
  const Banner = await client.fetch(bannerQuery)

  return {
    props :{products,Banner}
  }
}
export default index