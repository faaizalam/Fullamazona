import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,useParams,useLocation } from '../../node_modules/react-router-dom/index'
import { Link } from 'react-router-dom'
import { ADDTOCART, removeFromcart } from '../actions/CartAction'
import MessageBox from '../components/MessageBox'
// import { URLSearchParams } from 'url'

export default function Cartscreen(props) {
    const navigate =useNavigate();
    const params=useParams()
    const  {id:productId} =params;
    const {search}=useLocation()
    const qtyurl=  new URLSearchParams(search).get('qty');
    const qty= qtyurl? Number(qtyurl):1
    // const qty = props.location.search && Number(props.location.search.split('=')[1])
    const cart =useSelector((state)=>state.cart)
    const {cartItems,error} =cart;
  const dispatch=useDispatch()
    useEffect(()=>{
        if (productId) {
            dispatch(ADDTOCART(productId,qty))
            
        }
    },[dispatch,productId,qty])
    const removecart=((id)=>{
        dispatch(removeFromcart(id))

    
      

    })
    const proceedtocheck =(()=>{
        navigate('/sigin?redirect=/shipping')

    })
    return (
        <div className='cartc1'>
            <div className='maincol'>
                <h>
                    Shopping Cart
                    

                </h>
                {error &&(<div className='cantadd'>{error}</div>)}
                {
                    cartItems.length===0?( <MessageBox> Go shopping
                         <Link to="/"> Go shopping</Link>
                        </MessageBox>) :(
                            <ul>
                                {
                                    cartItems.map((x)=>(
                                        <li key={x.product}>
                                            <div className='mainofpro'>
                                                <div>
                                                <img className='imagesm' src={x.image} alt={x.name}/>
                                                    
                                                </div>
                                                <div>
                                                    <Link to={`/product/${x.product}`}>{x.name}</Link>

                                                </div>
                                                <div>
                                                    <select value={x.qty} onChange={e=>dispatch(ADDTOCART(x.product,Number(e.target.value)))}>
                                                        {
                                                            [...Array(x.countInStock).keys()].map((x)=>(
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))
                                                        }

                                                    </select>
                                                </div>
                                                <div>
                                                    $ {x.price}
                                                </div>
                                                <div>
                                                  <button type='button'className='primary' onClick={ ()=>removecart(x.product)}>Delete</button>
                                                </div>

                                            </div>

                                        </li>

                                    ))
                                }
                            </ul>
                        )
                    
                }
                <div className='summ'>
                    <div>
                        <ul>
                            <li>
                                <h2>
                                    Subtotaol (
                                        {
                                        cartItems.reduce((a,c)=>a+c.qty,0)
                                    }item) :$ {
                                        cartItems.reduce((a,c)=>a + c.price*c.qty,0)
                                    }
                                    <button type='button' className='primary' onClick={proceedtocheck} disabled={cartItems.length===0}>Procced to check out</button>
                                </h2>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
         
        </div>
    )
}
