import React,{useState} from 'react'
import { urlFor,client } from '@/lib/client'
import { AiOutlineMinus,AiOutlinePlus, AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { Product } from '@/components'
import { useStateContext } from '@/stateContext/stateContext'

const ProductDetails = ({product,products,imageimdex}) => {
    const {decQty,incQty,qty,onAdd,cartItems,setShowCart} = useStateContext()
    const [index, setIndex] = useState(imageimdex)
    const {image,details,price,name} = product

    const buyNow = () =>{
        onAdd(product,qty)
        setShowCart(true)
    }
  return (
    <div>
        <div className='product-detail-container'>
        <div>
            <div className='image-container'>
            <img className='product-detail-image ' src={urlFor(image && image[index])}/>
            </div>
            <div className='small-images-container'>
            {image?.map((img,i) => (
                <img key={i} src={urlFor(img)}
                className={i === index ? "small-image selected-image":"small-image"}
                onMouseEnter={() => setIndex(i)}
                />
            ))}
            </div>
        </div>
        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
        <div>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
        </div>
        <p>
            (20)
        </p>
            </div>
            <h4>details:</h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={() => decQty()}><AiOutlineMinus/></span>
                    <span className='num'>{qty}</span>
                    <span className='plus' onClick={() => incQty()} ><AiOutlinePlus/></span>
                </p>
            </div>
            <div className='buttons'>
            <button type="button" onClick={() => onAdd(product,qty)} className='add-to-cart'>
                add to cart
            </button>            
            <button type="button" onClick={buyNow}  className='buy-now'>
               buy now
            </button>
            </div>
        </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>you may also like</h2>
            <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map( item => {
                    if (item.slug.current != product.slug.current){
                        return(
                            <Product key={item._id} Product={item}/>
                        )
                    }
})}
            </div>
            </div>
        </div>
    </div>
  )
}
export const getStaticPaths= async () =>{
    const queryslug = `*[_type == "product"]`;
    const product = await client.fetch(queryslug)
    const paths = product.map(item => ({
        params:{
            slug:item.slug.current
        }
    })) 
    return {
        paths:paths,
        fallback:"blocking"
    }
}
export const getStaticProps = async ({params:{slug} }) => {
    const query = `*[_type == 'product' && slug.current == "${slug}"][0]`
    const ProductsQuery = `*[_type == 'product']`
    const product = await client.fetch(query)
    const products = await client.fetch(ProductsQuery)
    const imageimdex = 0

    return {
      props :{products,product,imageimdex}
    }
  }
export default ProductDetails