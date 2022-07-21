import bcrypt from 'bcryptjs'
const data ={
    users:[
        {
            name:'faaiz(Admin)',
            email:'Admin@gamil.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true,
        },
       {
            name:'junaid',
            email:'junaid@gamil.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true,
        }
    ],
    products:[
       {
         
           name:'Nike shirts',
           category:'Shirts',
           image:'/images/p1.jpg',
           price:120,
           brand:'nike',
           rating:4.5,
           numReviews:10,
           description:'high quilty prodcut',
           countInStock:4
       },
       {
         
           name:'addidas shirts',
           category:'Shirts',
           image:'/images/p1.jpg',
           price:150,
           brand:'nike',
           rating:2,
           numReviews:10,
           description:'high quilty prodcut',
           countInStock:2
       },
       {
         
           name:'lacoste fee shirts',
           category:'Shirts',
           image:'/images/p1.jpg',
           price:100,
           brand:'nike',
           rating:3,
           numReviews:10,
           description:'high quilty prodcut',
           countInStock:0
        },
        {
           
            name:'zong shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:10,
            brand:'nike',
            rating:3,
            numReviews:10,
            description:'high quilty prodcut',
            countInStock:8
        },
       {
          
           name:'rose shirts',
           category:'Shirts',
           image:'/images/p1.jpg',
           price:1120,
           brand:'nike',
           rating:5,
           numReviews:10,
           description:'high quilty prodcut',
           countInStock:3
           
        },
        {
          
            name:'puma shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:1230,
            brand:'nike',
            rating:3.5,
            numReviews:10,
            description:'high quilty prodcut',
            countInStock:6
        },
        {
        
            name:'addid shirts',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:220,
            brand:'addidas',
            rating:4.5,
            numReviews:10,
            description:'high quilty prodcut',
            countInStock:0
        }
        
        
    ]
}

export default data;