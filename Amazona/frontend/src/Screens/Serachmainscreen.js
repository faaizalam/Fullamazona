import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from '../../node_modules/react-router-dom/index'
import { homeproAction, ListaCatogery } from '../actions/ProductAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'
import Rating from '../components/Rating'
import { prices, rating } from '../components/Utils'

export const Serachmainscreen = () => {
    // const ProdcutList =useSelector(state=>state.produclist)
    // const {loading,error,product}=ProdcutList;
    const {loading,error,products}=useSelector((state)=>state.Homes)
    const {loading:loadcategory,error:errorcategory,category}=useSelector((state)=>state.CAT)
    const {name}=useParams()
   
    const [categoriesfil,setcat]=useState('')
    const [maxp,setmax]=useState({})
    const [status,setstatus]=useState({})
    const [ratings,setRating]=useState('')
    const [orders,setorder]=useState('')

    const dispatch=useDispatch()
    // const name=name!=='all'?name:''
    // const names=name!=='all'?name:''
    const max=maxp.max
    const min=maxp.min
    const smax=status.max
    const smin=status.min
    console.log(orders)
    // console.log(max,min)
    // console.log(smax,smin)
    const names=name||''
    // useEffect(()=>{
   
    

    // },[categoriesfil, navigate])
 
    // const names=name
    // console.log(names)
    
    // console.log(prices)
    useEffect(()=>{
        if (!category) {
                   dispatch(ListaCatogery())
                   
                }else{
      dispatch(homeproAction(names,categoriesfil,min,max,ratings,orders))

  }
 },[categoriesfil, category, dispatch, max, min, names, orders, ratings])
// useEffect(()=>{
        // console.log(categoriesfil)

    // },[dispatch])
   
    //   const getfilter=(filter)=>{
        

//      return `/serach/categories?category=${filter.x}`
     
//   }




  return (




    <div>

<div>
  
  <div >
    <h1>high-to-low</h1>
    <select className='serachitem' value={orders} onChange={(e)=>setorder(e.target.value)}>
        <option value="newest">newest</option>
        <option value="lowest">lowest</option>
        <option value="highest">highest</option>
        <option value="Toprated">Toprated</option>

    </select>
        
  </div>
    <div>
        <h1>Department</h1>
         {
            loadcategory?(<LoadingBox/>):errorcategory?(<MessageBox error={error}/>):(

                <div>


                    {/* {
                        category.map((x)=>(

                            <Link to={getfilterurl}>
                            {x}
                            </Link>
                        ))
                    } */}


        <select  onChange={(e)=>setcat(e.target.value)}>
                    {['all',...category].map((x)=>(
                        <>  
                          
                          <option>{x}</option>  
                        </>
                           
                          ))}
                          </select>
                    <div>{category.length}
                        </div>

                    </div>
                    
                    
            )

        }
    </div>
    </div>








        <div>
            
    <h1>Category 1</h1>
        <div className='catg'>
    {/* {
       
        category.map((x)=>(
            <div key={x} onClick={()=>setcat(x)}>
                 {x}
                </div>

        ))
    } */}
    </div>
    </div>

        {
            loading?(<LoadingBox/>):error?(<MessageBox error={error}/>):(

//          category.map((x)=>(
//          <div key={x} onClick={()=>setcat(x)}>
//                  {x}
//                 </div>
               
//  )
   <div>{products.length}</div>
         
            )
        

        // ))




            
        }
        {
        <div className='pricesort'>
            <div>
            {prices.map((x)=>(
                <div key={x.name}>

                <div className={(`${x.max}&&${x.min}`===`${smax}&&${smin}`)?'statustrue':''}  onClick={()=>(setmax({min:x.min,max:x.max}))(setstatus({min:x.min,max:x.max}))}><div>{x.name}</div></div>
                </div>

            ))}


                </div>
            </div>

        }
        {
        <div className='ratingsort'>
            <div>
            {rating.map((x)=>(
                <div>

                <div  onClick={()=>setRating(x.rating)} >{x.name}
                <Rating caption={'$ up'} rating={x.rating}></Rating>
                </div>
                </div>

            ))}


                </div>
            </div>

        }


<div>

  
    

    
    {

    
loading? (<LoadingBox></LoadingBox>): error?(
    <MessageBox  error={error}/>
):(
    <>
    {products.length===0 && <div>No seller</div>}
    <div class="product-cont">

{
products.map(product=>(
  
<Product key={product._id} product={product}/>

))
}



    </div>
    






    </>

)
}



</div>







    </div>
  )
}
