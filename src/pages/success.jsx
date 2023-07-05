import React,{useState,useEffect} from "react";
import Link from "next/link";
import {BsBagCheckFill} from "react-icons/bs"
import { useRouter } from "next/router";
import { useStateContext } from "../stateContext/stateContext";
import fireWork from "../lib/utils/confete"
const Success = () =>{
    const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext()
    const [Order, setOrder] = useState(null)
    useEffect( () => {
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        localStorage.clear()
        fireWork()
    }, [])
    return (
        <>
        <div className="success-wrapper">
        <div className="success">
        <p className="icon">
        <BsBagCheckFill/>
        </p>
        <h2>Thank for your purchase</h2>
        <p className="email-msg">check your email inbox for receipt</p>
        <p className="description">
        if you have any questions,plaes email
        <a className="email" href="mailto:natnaelyazchew135210@gmail.com">
            order@gmail.com
        </a>
        </p>
        <Link href={"/"}>
            <button width="300px" className="btn">
        continue shopping
            </button>
        </Link>
        </div>
        </div>
        </>
    )
}

export default Success