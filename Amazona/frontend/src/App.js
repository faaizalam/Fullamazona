import React from 'react'
// import {useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom'
import { Routes } from '../node_modules/react-router-dom/index';
// import { signout } from './actions/USerActions';
import { Adminroutes } from './components/Adminroutes';
import Head from './components/Head';
import Privt from './components/Privt';
import { Seller } from './components/Seller';
import Cartscreen from './Screens/Cartscreen';
import Homescreen from './Screens/Homescreen';
import Orderhistry from './Screens/Orderhistry';
import { Orderlistscreen } from './Screens/Orderlistscreen';
import Orderscreen from './Screens/Ordersreen';
import Payment from './Screens/Payment';
import Placeorder from './Screens/Placeorder';
import { Producteditscreen } from './Screens/Producteditscreen';
import { ProductListscreen } from './Screens/ProductListscreen';
import Productscreen from './Screens/Productscree';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import { Searchbox } from './components/Searchbox';
import Sellerscreen from './Screens/Sellerscreen';
import ShippingAddress from './Screens/ShippingAddress';
import SigninScreen from './Screens/SigninScreen';
import { UserEditscreen } from './Screens/UserEditscreen';
import { Userlistscreen } from './Screens/Userlistscreen';
import { Serachmainscreen } from './Screens/Serachmainscreen';
import { Support } from './Screens/Support';
import { useSelector } from 'react-redux';
import { Chatbox } from './components/Chatbox';
import { Dashboard } from './Screens/Dashboard';
// import { userInfo } from 'os';


function App() {
    const USersig= useSelector (state=>state.UseSigin)

const {userInfo}=USersig;

    // const cart =useSelector(state=>state.cart)
    // const USersig= useSelector(state=>state.UseSigin)
    // const {cartItems}= cart;
    // const {userInfo}=USersig;
    // const dispatch = useDispatch()
    // const signouthandler =(()=>{
    //     dispatch(signout());

    // })
  return (
      <BrowserRouter>
      
    <div class="grid-cont">
        <Head/>
    
    <main>
        <Routes>  
    <Route path="/seller/:id" element={<Sellerscreen/>}></Route>
    <Route path='/products/:id/edit' element={<Producteditscreen/>}></Route>
    <Route path="/cart" element={<Cartscreen/>}></Route>
    <Route path="/cart/:id" element={<Cartscreen/>}></Route>
     <Route path="/product/:id" element={<Productscreen/>} exact></Route>
     <Route path="/sigin" element={<SigninScreen/>}></Route>
     <Route path="/register" element={<Register/>}></Route>
     <Route path='/shipping' element={<ShippingAddress/>}></Route>
     <Route path='/payment' element={<Payment/>}></Route>
     <Route path='/placeorder' element={<Placeorder/>}></Route>
    <Route path="/orders/:id" element={<Orderscreen/>}></Route>
    <Route path="/orderhistry" element={<Orderhistry/>}></Route>
    <Route path="/profile" element={<Privt><Profile/></Privt>}></Route>
    <Route path='/ProductsList' exact element={<Adminroutes><ProductListscreen/></Adminroutes>}></Route>
    <Route path='/ProductsList/pages' element={<Adminroutes><ProductListscreen/></Adminroutes>}></Route>
    <Route path='/ProductsList/seller' element={<Seller><ProductListscreen/></Seller>}></Route>
    <Route path='/OrderList' element={<Adminroutes><Orderlistscreen/></Adminroutes>}></Route>
    <Route path='/OrderList/seller'  element={<Seller><Orderlistscreen/></Seller>}></Route>
    <Route path='/Userslist' element={<Adminroutes><Userlistscreen/></Adminroutes>}></Route>
    {/* <Route path='/serach/name/:name' exact element={<Serachmainscreen/>}></Route> */}
    <Route path='/serach/name/:name' exact element={<Serachmainscreen/>}></Route>
    <Route path='/serach/name' exact element={<Serachmainscreen/>}></Route>
    {/* <Route path='/serach/name/cat' exact element={<Serachmainscreen/>}></Route> */}
    {/* <Route path='/serach/categories' exact element={<Serachmainscreen/>}></Route> */}
    {/* <Route path='/serach/categories/name' exact element={<Serachmainscreen/>}></Route> */}
    <Route path='/support' exact element={<Adminroutes><Support/></Adminroutes>}></Route>
    <Route path='/Dashboard' exact element={<Adminroutes><Dashboard/></Adminroutes>}></Route>
    <Route path='/UserEditscreen/:id/edit' element={<Adminroutes><UserEditscreen/> </Adminroutes>}></Route>
    <Route path="/" element={<Homescreen/>}></Route>
    </Routes>
    {/* `/serach/categories?filtercat=${filtercat}&name=${filtername}` */}
    
    </main>

    <footer>
        {
            userInfo && !userInfo.isAdmin && <Chatbox  userInfo={userInfo}/>
        }
        All right reserved
    </footer>

</div>
</BrowserRouter>
    
  );
}

export default App;
