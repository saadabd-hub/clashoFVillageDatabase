const Product = require('../model/Product');
const Cart = require('../model/Cart');
const productDao = require('./dao/productDao');


class productController {
    
    static async productAll (req, res){
       const {page=1, limit=8, q=''} = req.query
       let previousPage , nextPage;
       
       try {
          const product = await Product.find({productName:{'$regex':q,'$options':'i'}})
          .limit(limit*1)
          .skip((page-1)*limit)
          .exec()
            var array=[]
            product.map(data=>{
            array.push({data})
          })
          const total = await Product.countDocuments({productName:{'$regex':q,'$options':'i'}})
          const totalPage =  Math.ceil(total/limit);
          const prev = parseInt(page) - parseInt(1);
          const next= parseInt(page) + parseInt(1)
          
          if(page===totalPage && page===1){
            previousPage = null
            nextPage = null
          }else if(page===0||page===1){
              previousPage = null
              nextPage = 'http://localhost:3000/products?page='+next
          }else if(totalPage===1){
            previousPage='http://localhost:3000/products?page='+prev
            nextPage = null
          }else{
            previousPage='http://localhost:3000/products?page='+prev
            nextPage = 'http://localhost:3000/products?page='+next
          }
          
          res.json({
             product,
              totalPage: totalPage,
              page: parseInt(page),
              nexpage: nextPage,
              previousPage:previousPage
          })
       } catch (error) {
           console.error(error.message)
       }    
    }
    
    static productById (req, res, next, _id){
        let query = {
            _id:_id
        }
        productDao.getProduct(query).then((result)=>{
            req.product = result.product;
            next()
        }).catch(()=>{
            res.status(400).json({
                error:"produk tidak tersedia"
            })
        })
    }

    static productByCategory (req, res, next){
        Product.find({category:req.params.category})
            .then((product)=>{
                console.log(product); 

                res.status(200).json({
                    success:true,
                    productNumber:product.length,
                    // messages:product
                })
            })
            .catch(next)
    }

    static cartView (res){
        Cart.find()
        .then((cart)=>{
            if(cart){
                res.status(200).json({success:true,data:cart})
            } else {console.log(111111111111);}
        })
    } 
    
    static showPicture(req,res,next){
        if(req.product.picture.data){
            res.set('Content-Type',req.product.picture.contentType)
            return res.send(req.product.picture.data)
        }
        next()
    }
    
}

module.exports = productController;