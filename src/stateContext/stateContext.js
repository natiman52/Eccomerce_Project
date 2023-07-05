import React,{createContext,useState,useEffect, useContext} from "react"
import { Toast, toast } from "react-hot-toast"

const Context =createContext()

export const StateContext = ({children}) => {
    const [showCart,setShowCart] =useState(false)
    const [cartItems,setCartItems] = useState([])
    const [ totalPrice,setTotalPrice] = useState(0)
    const [totalQuantities,setTotalQuantities] =useState(0)
    const [qty,setQty] =useState(1)
    let foundProduct;
    let index;
    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id == product._id) 
        let newCartItems = cartItems.filter(item => item._id !== product._id)

        setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevData => prevData - foundProduct.quantity)
        setCartItems(newCartItems)
    }
    const toggleCartItemQuantity = (id,value) => {
        foundProduct = cartItems.find(item => item._id == id)
        index =cartItems.findIndex( item => item._id === id)
        let newCartItems = cartItems.filter(item => item._id !== id)
        if (value === "inc"){
            setCartItems([...newCartItems.slice(0,index),{...foundProduct,quantity:foundProduct.quantity + 1},...newCartItems.slice(index)])
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQuantities(prevData => prevData + 1)
        }else if(value === "dec"){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems.slice(0,index),{...foundProduct,quantity:foundProduct.quantity - 1},...newCartItems.slice(index)])
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQuantities(prevData => prevData - 1)
            }
        }
    }
    const onAdd = (product,quantity) => {
        const checkproductcart = cartItems.find( item => item._id === product._id);
        if (!!(checkproductcart)){
            setTotalPrice(prev => prev + product.price * quantity)
            setTotalQuantities(prev => prev + quantity)

            const updatedCartItem = cartItems.map( item => {
                if(item._id == product._id){
                    return {...item, quantity:item.quantity + quantity}
                }else{
                    return item
                }
            })

            setCartItems(updatedCartItem)
        }else{
            setTotalPrice(prev => prev + product.price * quantity)
            setTotalQuantities(prev => prev + quantity)
            setCartItems(prev => [...prev,{...product,quantity:quantity}])
        }
        toast.success(`${quantity} ${product.name} added to the cart`)
    }
    const incQty = () => {
        setQty((prev) => prev + 1)
    }   
     const decQty = () => {
        setQty((prev) =>prev - 1 >= 1 ? prev - 1: 1)
    }
    return (
        <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)