import React, { useState } from 'react'
import { useNavigate } from '../../node_modules/react-router-dom/index'



export const Searchbox = () => {
    const [name,setname]=useState('')
   const navigate=useNavigate();

    const serachfunc=(e)=>{
        e.preventDefault();
        navigate(`/serach/name/${name}`)
        

    }

  return (
    <form className='serachbox' onSubmit={serachfunc}>
        <div>
        <input type='text' id='name'  placeholder='enter name' onChange={(e)=>setname(e.target.value)}/>
        <button>
            <i className='fa fa-serach'></i>
        </button>
        </div>

    </form>
  )
}
