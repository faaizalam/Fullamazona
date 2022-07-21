import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from '../../node_modules/react-router-dom/index'
import { detailsProducts, Updatepro } from '../actions/ProductAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Pro_update_rest } from '../constants/productconstant'
import  Axios  from "axios"
export const Producteditscreen = () => {
    const Params=useParams()
    const {id:productid}=Params
    const [name,setname]=useState('')
    const [price,setprice]=useState('')
    const [brand,setbrand]=useState('')
    const [description,setdescription]=useState('')
    const [image,setimage]=useState('')
    const [images,setimages]=useState([])
    const [countInStock,setcountInStock]=useState('')
    const [category,setcategory]=useState('')
    const userSig= useSelector(state=>state.UseSigin)
    const {userInfo}=userSig
    const sellerc=userInfo.isSeller?'seller':''

    const {product,error,loading}=useSelector(state=>state.Productdeatilas)
    const {sucess,error:errr,loading:loadss}=useSelector(state=>state.updatepro)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log(sucess)
    useEffect(()=>{
        if(sucess){
            dispatch({
                type:Pro_update_rest
            })
            navigate(`/ProductsList/${sellerc}`)

        }
        if (!product) {
            dispatch(detailsProducts(productid))
            
        }else{
            setname(product.name)
            setbrand(product.brand)
            setcountInStock(product.countInStock)
            setcategory(product.category)
            setimage(product.image)
            setimages(product.images)
            setdescription(product.description)
            setprice(product.price)

            
        }

    },[dispatch, navigate, product, productid, sellerc, sucess])
   
  const submithandler=(e)=>{
      e.preventDefault();
      dispatch(Updatepro({_id:productid,name,image,images,category,description,countInStock,price,brand}))

  }
  const [loadinguploads,setloadinguploads]=useState(false)
  const [errorupload,seterrorupload]=useState('')
  const uploadfilehand=async(e,filemul)=>{
      const file =e.target.files[0];
      const dataform =new FormData();
      dataform.append('image', file);
      setloadinguploads(true)
      try {
          const {data} = await Axios.post('/postman/uploads', dataform, {
              headers:{
                  'Content-Type':'multipart/form-data',
                  Authorization:`Bearer ${userInfo.token}`

              }
          })
          if (filemul) {
              setimages([...images,data])
              
            }else{
              setimage(data)
          }
          setloadinguploads(false)
          
        } catch (error) {
            seterrorupload(error.message)
            setloadinguploads(false)
          
      }

    //   setimage(dataform)


  }
//   var faazi;
  const deleteimage=async (f,h)=>{
        console.log(f)
        

        console.log((images.filter((x)=> x !==f)))
   const sa= images.filter((x)=> x !==f)
   setimages(sa)
     
    // console.log(images)
     

  }
    
  return (
    <div>
            <div><h1>{productid}</h1></div>
        <form onSubmit={submithandler}>
            {loadss &&(<LoadingBox/>)}
            {errr && (<MessageBox errr={errr}/>)}
            {loading?(<LoadingBox/>):error?(<MessageBox error={error}/>):(
                
                
                <div>
             <div><h1>{product._id}</h1></div>
          <label>Name</label>
          <input type='text' placeholder='name'  value={name} onChange={(e)=>setname(e.target.value)}/>
          <label>price</label>
          <input type='number' placeholder='name'  value={price} onChange={(e)=>setprice(e.target.value)} />
          <label>countInStock</label>
          <input type='number' placeholder='name'  value={countInStock} onChange={(e)=>setcountInStock(e.target.value)} />
          <label>brand</label>
          <input type='text' placeholder='brand'  value={brand} onChange={(e)=>setbrand(e.target.value)} />
          <label>description</label>
          <input type='text' placeholder='description'  value={description} onChange={(e)=>setdescription(e.target.value)} />
          <label>image</label>
          <input type='text' placeholder='name'  value={image} onChange={(e)=>setimage(e.target.value)} />
          <div> 
          <label htmlFor='imagefile' >upload</label>
          <input type="file" id='imagefile' onChange={uploadfilehand}></input>
          <div> 
          <label htmlFor='imagefile' >multi images</label>
          {images.length===0&& <di>no image</di>}
          {
              images.map((x)=>(
                  <div key={x}>{x}
                  
                  </div>
              ))
          }

          </div>
          <input type="file" id='imagefile' onChange={(e)=>uploadfilehand(e,true)}></input>
          {loadinguploads&&<LoadingBox/>}
          {errorupload&& <MessageBox errorupload={errorupload} />}
          </div>
          <label>category</label>
          <input type='text' placeholder='name'  value={category} onChange={(e)=>setcategory(e.target.value)} />
          <button type='submit' className='buttons'>update</button>
            </div>
            )
            
        
        }

        </form>
        <div>
            {images.map((x)=>
            <div>
                {x}
                <button onClick={()=>deleteimage(x)}><i className='fa fa-times-circle'></i></button>
                </div>
                
                
                )}
        </div>
         </div>

  )
}
