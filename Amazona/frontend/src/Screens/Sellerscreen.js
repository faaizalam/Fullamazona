import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from '../../node_modules/react-router-dom/index';
import { listproducts } from '../actions/ProductAction';
import { Userinfo } from '../actions/USerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Rating from '../components/Rating';

export default function Sellerscreen() {
  const {id:seller}=useParams()
  const {loading,useredit,error}=useSelector((state)=>state.UserInfos)
  const disptach= useDispatch();
  const ProdcutList =useSelector(state=>state.produclist)
  const {loading:loadingpro,error:errorpro,product,pages}=ProdcutList;
  // const {loadingpro,errorpro,products}=productlist



    const page=1
    useEffect(()=>{
        disptach(Userinfo(seller))
        disptach(listproducts(page,seller))
      


    },[disptach, seller])
    

  return (
    <div>
<div className='userinfos'>
  
  {
    
    loading?(<LoadingBox></LoadingBox>):error?(<MessageBox></MessageBox>):

  <div>
   <img src={useredit.seller.logo} alt={useredit.seller.name}></img>
   <div>
     {useredit.seller.name}
    <Rating
     rating={useredit.seller.rating.length}
     numReviews={`${useredit.seller.numReview}`} 
     >

    </Rating>
    <div>
      <a href={`mailto:${useredit.email}`}>contact seller</a>
      </div>
      <div>
        {useredit.seller.description}
        </div>
    </div>
  </div>
  




}
</div>

<div className='pro'>
{
    
    loadingpro?(<LoadingBox></LoadingBox>):errorpro?(<MessageBox errorpro={errorpro}></MessageBox>):(
     

      product.map((x)=>(
        <div>{x.name}</div>

      ))


      
    )


}

</div>

</div>


   
  )
}
