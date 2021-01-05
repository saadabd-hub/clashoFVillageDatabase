const User = require('../model/User');
const Product = require('../model/Product');
const formidable = require('formidable');
const fs = require('fs');

class adminTodoController {
    static add (req, res, next){
  
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err,fields, files)=>{
            if(err){
                return res.status(400).json({
                    pesan: "Gambar tidak bisa di upload"
                })
            }

            const {
                productName,
                description,
                price,
                stock,
                briefDescription,
                category
            } =fields ;
           

            if( !productName||
                !description||
                !price||
                !stock||
                !briefDescription||
                !category){
                    return res.status(400).json({
                        pesan: "Field wajib di isi"
                    })
                }
                const product = new Product(fields)
    
                if(files.picture && files.thumbnailPicture){
                    if(files.picture.size> 1000000 && files.thumbnailPicture.size){
                        return res.status(400).json({
                            pesan: "Gambar terlalu besar"
                        })
                    }
                }
                
                product.picture.data = fs.readFileSync(files.picture.path)
                product.picture.contentType = files.picture.type
                product.thumbnailPicture.data = fs.readFileSync(files.thumbnailPicture.path)
                product.thumbnailPicture.contentType = files.thumbnailPicture.type
                
                product.save((err,product)=>{
                    if (err){
                        return res.status(400).json(err)
                    }
                    return  res.status(200).json(product)
                })
        })
    
    }
}

module.exports = adminTodoController;