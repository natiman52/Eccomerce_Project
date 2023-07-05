import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req,res){
    if(req.method === "POST"){
        console.log(req.body)
        try{
            const params = {
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
                payment_method_types:["card"],
                billing_address_collection:"auto",
                shipping_options:[
                    {shipping_rate:"shr_1NQcfECkCEAsu3yEHzlWouoI"},
                    {shipping_rate:"shr_1NQciQCkCEAsu3yE3YvSJDdk"},
                ],
                line_items:req.body.map( item => {
                     return {
                        price_data :{
                            currency:"usd",
                            product_data :{
                                name:item.name,
                            },
                            unit_amount:item.price * 100,
                        },
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1,
                        },
                        quantity:item.quantity
                     }
                }),

              }

            const session =await stripe.checkout.sessions.create(params)
              res.status(200).json(session)
        }catch(eror){
            res.status(500).json({satusCode:500,message:eror.message})
        }
    }else{
        res.setHeader("Allow","POST");
        res.status(405).end("Method Not Allowed")
    }
}