import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from '../../node_modules/react-router-dom/index'
import { deleteUserAction, ListUsers } from '../actions/USerActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { User_delete_reset} from '../constants/USercon'


export const Userlistscreen = () => {

    // const {search}=useLocation()
    // const sp = new URLSearchParams(search)
    // const checkifpage =Number(sp.get('page')) ||1
   const {search}=useLocation()
    const searchresult= new URLSearchParams(search).get('page')
    const checkifpage =searchresult? Number(searchresult):1

    const navigate=useNavigate()
    const {loading,error,useritems}=useSelector(state=>state.Userlist)
    const {loading:deleteloading,error:deleteerror,sucess}=useSelector(state=>state.userDELETE)


    const dispatch=useDispatch()
    
    
//     useEffect(()=>{
//   dispatch(ListUsers())
 
// },[dispatch])
const userdeleteHnadler=(x)=>{
    if (window.confirm('are you sure')) {
        dispatch(deleteUserAction(x))
        
    }
    

}
useEffect(()=>{
    if (sucess) {
        dispatch({
            type:User_delete_reset
        })
        dispatch(ListUsers(checkifpage))
    }
      
        dispatch(ListUsers(checkifpage))
        // dispatch({type:User_LIST_reset})
    

},[checkifpage, dispatch, sucess])



  return (
     <div>
         <div>
         {deleteloading?(<LoadingBox/>):deleteerror?(<MessageBox error={deleteerror}/>):loading?(<LoadingBox></LoadingBox>):error?(<MessageBox>{error}</MessageBox>):(
     
         
         <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>email</th>
                        <th>is Seller</th>
                        <th>is isAdmin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        useritems.responsesss.map((x)=>(
                    <tr key={x._id}>
                    {/* <div></div> */}

                       <td>{x._id}</td> 
                       <td>{x.name}</td> 
                       <td>{x.email}</td> 
                       <td>{x.isSeller?'seller':'no'}</td> 
                       <td>{x.isAdmin?'Admin':'no'}</td> 
                       <td><button onClick={()=>navigate(`/UserEditscreen/${x._id}/edit`)}>edit</button>
                       <button onClick={()=>userdeleteHnadler(x._id)}>delete</button>
                       </td> 

                       

                    </tr>

                        ))
                    }
                </tbody>
            </table>
            <div>
                {
                    [...Array(useritems.pages).keys()].map((x)=>(
                        <Link key={x+1} className={x+1===Number(checkifpage)?'bold':'non'} to={`/Userslist?page=${x+1}`}>
                            {x+1}
                            </Link>
                    ))
                }
                </div>

         </div>
            )}
     </div>
     </div>
    
     
  )
}
