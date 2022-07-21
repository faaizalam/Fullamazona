import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from '../../node_modules/react-router-dom/index'
import {commentsAction, detailsProducts, LikeAction } from '../actions/ProductAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import { Comments_Reset } from '../constants/Comments'


export default function Productscreen(props) {
    const navigate =useNavigate();
    const productdatils=useSelector(state=>state.Productdeatilas)
    const userSig= useSelector(state=>state.UseSigin)
    const reviwsitem=useSelector(state=>state.CommentStore)
    const {sucess,loading:loadingreview,error:errorreview}=reviwsitem
    // const userSig= useSelector(state=>state.UseSigin)
    const LIKEs=useSelector(state=>state.LIKE)
    const {loading:LoadingLike,error:errorlike,sucess:likesucess}=LIKEs;
    // console.log(Reviews.review.name)
    const {userInfo}=userSig
    const params =useParams()
    const {id:ProductId}=params
    const [qty,setqty] =useState(1)
    const [mulimg,setmulimg] =useState('')
    const [rating,setrating] =useState('')
    const [comments,setcomments] =useState('')
    // const [like,setlike] =useState(false)
    // console.log(like);
    const disptach=useDispatch()
    const {loading,error,product}=productdatils;
    // console.log(sucess)
    useEffect(()=>{
        disptach(detailsProducts(ProductId))
        if(sucess||likesucess){
            console.log("hh")
            disptach(detailsProducts(ProductId))
            
            disptach({
                type:Comments_Reset
            })
          }
       
    // disptach(homeproAction(ProductId))
    },[disptach, ProductId, sucess, likesucess])
    const Addtocart=(()=>{
        navigate(`/cart/${ProductId}?qty=${qty}`)
       


    })
const ratinghandler=((e)=>{
   
  e.preventDefault()
//   console.log(comments,rating)
if (!comments||!rating) {
    window.alert('kindly give review or comments both')
    
}
    disptach(commentsAction({comments,rating,name:userInfo.name,id:product._id}))

})

// like

const setlike=((value)=>{
   disptach(LikeAction(value,product._id,userInfo._id))

})



   return(
    <div>
    {
        loading? (<LoadingBox></LoadingBox>): error?(
            <MessageBox error={error}></MessageBox>
        ):(
            <div>
            <div className="row">
                <div >
                    <h1>{product._id}</h1>
                 
                 <a href='/'>back to screen</a>
                </div>
                <div className='col-2'>
                 <img className='large' src={ mulimg||product.image} alt={product.name}></img>
                </div>
                <div className='col-1'>
               <ul>
                   <li>
                       <h1>
                           {product.name}
                       </h1>
                   </li>
                   <li>
                       <Rating rating={product.rating} numReviews={product.numReviews} />
                   </li>
                   <li>
                     price:$ {product.price}
                   </li>
                   <li>
                    description:
                    <p>{product.description}</p>
                   </li>
               </ul>
                </div>
                <div className='col-1'>
                    <div className='cart carbody'>
                        <ul>
                            <li>
                                <div className='row'>
                                {/* <video width="320" height="240" controls>
                      
                        <source src='../vi.mp4' type="video/mp4"></source>
                    </video> */}
                                    <div>Price</div>
                                    <div>$ {product.price}</div>
                                   
 
                                </div>
                                <li>
                                    {
                                       [...product.images,product.image].map((x)=>(
                                           <div key={x}>
                                               <button onClick={()=>setmulimg(x)}>
                                                   <div>
                                                       <img src={x} alt="products" />
                                                   </div>
                                               </button>

                                           </div>

                                       ))
                                    }
                                </li>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0?(
                                            <span className='sucess'> in stock</span>):(
                                                <span className='error'> unavailable</span>
                                            )
                                     }
                                    </div>
 
                                </div>
                            </li>
                            <li>
                                {product.countInStock > 0 &&
                                <li>
                                    <>
                                    <div>QTY</div>
                                    
                                    <select value={qty} onChange={(e)=>setqty(e.target.value)}>
                                        {

                                        [...Array(product.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))
                                                }
                                    </select>
                                    
                                    
                                    </>

                                <button onClick={Addtocart} className='primary'>Add to cart</button>
                                </li>
                                
                            }

                            </li>
                        </ul>
 
                    </div>
 
                </div>
            </div>
            <h1>hhhh</h1>
            {LoadingLike&&<LoadingBox></LoadingBox>}
            {errorlike&&<MessageBox>{errorlike}</MessageBox>}
           {/* {
            <div>
            <div onClick={()=>setlike(true)}>${`Like product.`}</div><strong>{product.Like.length}</strong>
            </div>
            } */}
            {
                <div onClick={()=>setlike(true)}>
               { product.Like.length > 0 ?(<div><span className='active'>Like</span><div>{product.Like.length}</div></div>):(<div>Like</div>)}
                </div>
            }
          
            {/* {
                          product.Like.map((x)=>(
                              <div key={x._id}>
                               <div className={x.like?"active":""}>Like</div>
                               
                              </div>
                          ))
                          
                          
                      } */}

            <div>
                <h2 id='reviews'>Reviews</h2>
                <div>
                    {product.numReviews.length===0 &&<h1>no review yet</h1>}
                    </div>
             

                    
                   {
                    loadingreview&&<LoadingBox/>
                   }
                   {
                    errorreview&&<MessageBox/>
                   }

                      <div>
                        {
                          
                            product.reviews.map((x)=>(
                                <div key={x._id}>
                                    <strong>{x.name}</strong>
                                    {x.comments}
                                
                                  <p><div>$ {x.createdAt.toString().substring(0,10)}</div></p>
                                   
                                    <Rating rating={x.rating} numReviews={product.numReviews}></Rating>
                                    {/* <div className={x.like?"active":""}>Like</div> */}
                                </div>
                            ))
                            
                            
                        }
                              
                        

                       <div>
               { 
               userInfo?(
                        <form onSubmit={ratinghandler}>
                            <select value={rating} onChange={(e)=>setrating(e.target.value)}>
                                <option value=''></option>
                                <option value='1'>fair</option>
                                <option value='2'>good</option>
                                <option value='3'>v good</option>
                                <option value='4'>best</option>
                                <option value='5'>very excellent</option>

                            </select>
                            {/* <input></input> */}
                            <textarea onChange={(e)=>setcomments(e.target.value)} ></textarea>
                            <button type='submit'>comments</button>
                        </form>):(
                            <div>Write review by login</div>
                        )
}
                        </div>


                        </div>
                        
                        


                   

                </div>


        </div>

    
        )
    }
    </div>
      

  )
}
