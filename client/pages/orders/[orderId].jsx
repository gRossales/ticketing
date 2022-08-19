import { useEffect, useState } from "react";
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout'
import UseRequest from "../../hooks/use-request";

function OrderShow({order, currentUser}){
  const [timeLeft, setTimeLeft] = useState(0)
  const {doRequest,errors} = UseRequest({
    url: '/api/payments',
    method: 'post',
    body:{
      orderId: order.id,
    },
    onSuccess: ()=> Router.push('/orders')
  })

  useEffect(()=>{
    function findTimeLeft(){
      const msLeft = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () =>{
      clearInterval(timerId)
    }
  },[order])

  if(timeLeft<0){
    return <div>Order Expired</div>
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout 
        token={({id})=> doRequest({token: id})}
        stripeKey='pk_test_51LY9luBUjqHQfotWnBY4MBuw3WAEhR2VSURiqv9ygzEZDurrlqfUHlLhhgDs8V0cMDDGXlY9BNUZPgWXdEOR8DSr00skzvbj36'
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  )
}

OrderShow.getInitialProps = async (context, client)=>{
  const {orderId} = context.query;
  const {data} = await client.get(`/api/orders/${orderId}`)

  return {order: data}
}

export default OrderShow