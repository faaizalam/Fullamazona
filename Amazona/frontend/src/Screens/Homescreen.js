import React ,{useEffect} from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'
import { homeproAction } from '../actions/ProductAction';
import 'react-responsive-carousel/lib/styles//carousel.min.css'
import {Carousel} from 'react-responsive-carousel'
import { Topseller } from '../actions/USerActions';
import { Link } from '../../node_modules/react-router-dom/index';
import Head from '../components/Head';



export default function Homescreen() {


  
    
    const {loading,error,products}=useSelector((state)=>state.Homes)
    const {loading:loadingtopseller,error:errortopseller,topsellers}=useSelector((state)=>state.Topsellers)
    const dispatch =useDispatch()
    // const {loading,error,products}=productlist
    // const Topseller= useSelector(state=>state.UseSigin.userInfo)
   

    useEffect(()=>{
        dispatch(homeproAction())
        dispatch(Topseller())
    },[dispatch])
    

   
    return (
        
        <div>
            <h2>Top sellers</h2>
            {
                loadingtopseller?(<LoadingBox></LoadingBox>):errortopseller?(<MessageBox error={errortopseller}/>):(
                    <>
                    {topsellers.length===0 && <div>No seller found</div>}
                    <Carousel showArrows autoplay showThumbs={false}>
               {
                topsellers.map((seller)=>(
                    <div key={seller._id}>
                    <Link  to={`/seller/${seller._id}`}>
                   <img src={seller.seller.logo} alt={seller.seller.name}></img>
                    <p className="legend">{seller.seller.name}</p>

                    </Link>


                    </div>
                ))
               }



                    </Carousel>



                    </>



                )
            }
            <h2>featuers product</h2>
 {

    
            loading? (<LoadingBox></LoadingBox>): error?(
                <MessageBox  error={error}/>
            ):(
                <>
                {products.length===0 && <div>No products</div>}
                <div class="product-cont">
          
          {
            products.map(product=>(
                <>
                <Product key={product._id} product={product}/>
                 
                </>
              

            ))
            }
           
       </div>



                </>
       
            )
        }
        </div>
    )
}
