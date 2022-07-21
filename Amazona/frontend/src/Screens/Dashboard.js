import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chartaction } from '../actions/Chart'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Chart } from "react-google-charts"
export const Dashboard = () => {
   const {loading,error,summary}=useSelector((state)=>state.Chart)
   const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(Chartaction())
   },[dispatch])

  return (

    <div className='main'>
        <div>Dashboard</div>
   ${
       
       loading?(<LoadingBox/>):error?(<MessageBox error={error}/>):(
           
           
           
           
           
           <div className='row'>
        <div>
        <div>
        <h1>users<i  className='fa fa-users'></i></h1>
        <div>
            ${
                summary.userChart[0].TotalUser
            }
        </div>

        </div>
        <div>
        <h1>orders<i  className='fa fa-shipping'></i></h1>
        <div>
            ${
                summary.Orderchart[0].NumOforder?summary.Orderchart[0].NumOforder:0
            }
        </div>

        </div>
        <div>
        <h1>sales<i className='fa fa-money'></i></h1>
        <div>
            ${
                summary.Orderchart[0].TotalSales?summary.Orderchart[0].TotalSales.toFixed(2):0
            }
        </div>


        </div>
   </div>
  {
      summary.Dailyorders.length===0?(<div>no order found</div>):(
       
<div>
        <div >
            <Chart
            className="AreaChart"
            chartType="AreaChart"
            data={[["Date", "sales"], ...summary.Dailyorders.map((x)=>[x._id,x.sales])]}
            width="100%"
            height="400px"
            loader={(<div>loading Chart</div>)}
            
            />


            </div>
        {/* <div>
            <Chart
            chartType="PieChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="400px"
            legendToggle
            />


            </div> */}
    </div>
     )
    }
  {
      summary.Categorychart.length===0?(<div>no order found</div>):(
       
<div>
        <div>
         


            </div>
         <div className='Piechart'>
            <Chart
            chartType="PieChart"
            // , ...summary.Categorychart.map((x)=>[x._id,x.count]) 
            data={[["Category", "product"],...summary.Categorychart.map((x)=>[x._id,x.count])]}
            width="100%"
            height="400px"
            legendToggle
            />


            </div>
    </div>
     )
    }
    </div>
    )
}




    </div>
  )
}
