
import {applyMiddleware, combineReducers, compose,createStore} from 'redux'



import thunk from "redux-thunk";
import { CartReducer} from './REducers/Cartreducer';
import { Chartreducer } from './REducers/Chart';
import { OrderdeatilReducer, OrderdeleteReducer, OrderdeliReducer, OrderlistAdreducer, OrderListreducer, OrderpayReducer, orderreducer } from './REducers/Orderredu';
import { CATEGORY, commentReducer, datailsProductReduer, Deltered, HomeList, LIKEred, ProductCreatedredcuer, productListreducer, Produpdatereducer } from './REducers/ProductReducer';

import {Registerreducer, Topsellerlist, UserDELETE, UserInfo, UserInfoChnageReducer, UserListreducer, Userprofilereducer, UserprofileUpdate, UserSiginReducer } from './REducers/Userreducer';







const initialstate={
 UseSigin:{
   userInfo:localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):null,

 },
 cart:{
   cartItems:localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')):[],
   shipping:localStorage.getItem('Shippininfo')?JSON.parse(localStorage.getItem('Shippininfo')):'',
   paymentmethod:localStorage.getItem('payment')?JSON.parse(localStorage.getItem('payment')):''
 },
 
 
  
};
 const reducer=combineReducers({
  produclist:productListreducer,
   Homes:HomeList,
    Productdeatilas:datailsProductReduer,
    cart:CartReducer,
    UseSigin:UserSiginReducer,
    Register:Registerreducer,
    ordercreate:orderreducer,
    OrderDeat:OrderdeatilReducer,
    Payorder:OrderpayReducer,
    OrderList:OrderListreducer,
    Userprofile:Userprofilereducer,
    UserprofileUpdateStor:UserprofileUpdate,
    createdpro:ProductCreatedredcuer,
    delete:Deltered,
    updatepro:Produpdatereducer,
    OrderlistAdmins:OrderlistAdreducer,
    Orderdelete:OrderdeleteReducer,
    Orderdeliver:OrderdeliReducer,
    Userlist:UserListreducer,
    userDELETE:UserDELETE,
    UserInfos:UserInfo,
    UserInfosupdate:UserInfoChnageReducer,
    Topsellers:Topsellerlist,
    CAT:CATEGORY,
    Chart:Chartreducer,
    CommentStore:commentReducer,
    LIKE:LIKEred
})
// const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
// const sstore =createStore(reducer,initialstate,composeEnhancer(applyMiddleware(thunk)))

const store=createStore(reducer,initialstate,composeEnhancer(applyMiddleware(thunk)))


export default store
