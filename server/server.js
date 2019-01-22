const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const moment = require('moment');
const SHA1 = require('crypto-js/sha1');
const PORT = 8081;

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// Models
const User  = require('./models/user');
const Brand = require('./models/brand');
const Footwear = require('./models/footwear');
const Product = require('./models/product');
const Payment = require('./models/payment');
const Site = require('./models/site');

// Middlewares
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

// Utils
const sendEmail = require('./utils/mail/index');


//===========================================
//              USERS
//===========================================

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    
    user.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        sendEmail(doc.email,doc.name,null,'welcome')
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login',(req,res)=>{
    //find the email
    
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:'Authication failed. Email not fond.'});
        
        //check password
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});
            
            //generate a token
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('x_auth',user.token).status(200).json({
                    loginSuccess: true
                });
            });
        });
    });
    
});


app.get('/api/users/logout',auth,(req,res)=>{
    
    User.findOneAndUpdate(
        {_id:req.user._id},
        {token: ''},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            });
        }
    );
    
});

app.post('/api/users/reset_user',(req,res)=>{
    User.findOne(
        {'email':req.body.email},
        (err,user)=>{
            user.generateResetToken((err,user)=>{
                if(err) return res.json({success:false,err});
                sendEmail(user.email,user.name,null,'reset_password',user)
                return res.json({success:true})
            })
        }
    )
})

app.post('/api/users/reset_password',(req,res)=>{
    
    var today = moment().startOf('day').valueOf();
    
    User.findOne({
        resetToken: req.body.resetToken,
        resetTokenExp:{
            $qte: today
        }
    },(err,user)=>{
        if(!user) return res.json({success:false,message:'Sorry, token is bad, generate  a new one'})
        
        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExp = '';
        
        user.save((err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).json({
                success: true
            })
        })
    })
})

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result)
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
       public_id: `${Date.now()}`,
       resource_type: 'auto'
    })
})

app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    let image_id = req.query.public_id;
    
    cloudinary.uploader.destroy(image_id,(error)=>{
        if(error) return res.json({success:false,error});
        res.status(200).send('ok')
    })
})

app.post('/api/users/addToCart',auth,(req,res)=>{
    User.findOne({_id: req.user._id}, (err,doc)=>{
        let duplicate = false;
        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                duplicate = true;
            }
        })
        
        if(duplicate){
           User.findOneAndUpdate(
               {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
               {$inc: {"cart.$.qty":1}},
               {new:true},
               (err,doc)=>{
                   if(err) return res.json({success:false,err});
                   res.status(200).json(doc.cart);
               }
           );
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    
                    qty:1,
                    date: Date.now()
                }}},
                { new: true},
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart);
                }
            )
        }
    })
})

app.get('/api/users/removeQtyCart',auth,(req,res)=>{
    User.findOne({_id: req.user._id}, (err,doc)=>{
           User.findOneAndUpdate(
               {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
               {$inc: {"cart.$.qty": - 1}},
               {new:true},
               (err,doc)=>{
                   if(err) return res.json({success:false,err});
                   if(doc.cart.qty === 0){
                        return doc.cart.qty = 1
                    }
                   res.status(200).json(doc.cart);
               }
           );
        }
    )
});

app.get('/api/users/addQtyCart',auth,(req,res)=>{
    
           User.findOneAndUpdate(
               {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
               {$inc: {"cart.$.qty": 1}},
               {new:true},
               (err,doc)=>{
                   if(err) return res.json({success:false,err});
                  
                   res.status(200).json(doc.cart);
               }
           );
        
    
});

app.get('/api/users/removeFromCart',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id: req.user._id},
        {"$pull": 
            {"cart": {"id":mongoose.Types.ObjectId(req.query._id)}}
        },
        {new: true},
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });
            
            Product.
            find({'_id':{$in: array}}).
            populate('brand').
            populate('footwear').
            exec((err, cartDetail)=>{
                 return res.status(200).json({
                     cartDetail,
                     cart
                 });
            });
        }
    );
});

app.post('/api/users/successBuy',auth,(req,res)=>{
    let history = [];
    let transactionData = {};
    
    const date = new Date();
    const po = `PO-${date.getHours()}${date.getMinutes()}-${SHA1(req.user._id)
        .toString().substring(0,8)
    }`
    
    //change user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            porder: po,
            dataOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            shoesize: item.shoesize,
            clothesize: item.clothesize,
            id: item._id,
            price: item.price,
            qty: item.qty,
            paymentId: req.body.paymentData.paymentID
        });
    });
    //change payment dashboard
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    };
    let pData = req.body.paymentData
    transactionData.data = {
        pData,
        porder: po
    };
    transactionData.product = history;
    
    //update the user's history
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$push:{history:history}, $set:{cart:[]}},
        {new: true},
        (err,user)=>{
            if(err) return res.json({success: false,err});
            
            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id: item.id, qty: item.qty, quantity: item.quantity})
                })
                async.eachSeries(products,(item,callback)=>{
                    if(item.qty >= item.quantity){
                        item.qty = item.quantity
                    }
                    Product.update(
                        {_id: item.id},
                        {$inc:{
                            "sold": item.qty
                        }},
                        {new:true},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    sendEmail(user.email,user.name,null,'purchase',transactionData)
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            })
        }
    )
});

app.post('/api/users/update_profile',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

//===========================================
//              BRANDS
//===========================================

app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand = new Brand(req.body);
    
    brand.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            brand: doc
        });
    });
});

app.get('/api/product/brands',(req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
});

app.get('/api/product/brand_by_id',(req,res)=>{
    let item = req.query.id;
    
    Brand.
    find({'_id':{$in:item}}).
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send(docs)
    })
});




//===========================================
//              FOOTWEAR    
//===========================================

app.post('/api/product/footwear',auth,admin,(req,res)=>{
    const footwear = new Footwear(req.body);
    
    footwear.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            footwear: doc
        });
    });
});

app.get('/api/product/footwears',(req,res)=>{
    Footwear.find({},(err,footwears)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(footwears);
    });
});


//===========================================
//              PRODUCTS   
//===========================================

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);
    
    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        });
    });
});

app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;
    
    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item);
        });
    }
    
    Product.
    find({'_id':{$in:items}}).
    populate('brand').
    populate('footwear').
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send(docs)
    })
});

app.post('/api/product/articles_by_id',auth,(req,res)=>{
    let item = req.query.id;
    Product.findOneAndUpdate(
        {_id: item},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.get('/api/product/articles_by_brand',(req,res)=>{
    let items = req.query.brand;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
    
    Product.
    find({'brand':{$in:items}}).
    populate('brand').
    populate('footwear').
    sort(sortBy).
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send(docs)
    })
});

app.post('/api/product/shop',(req,res)=>{
    let items = req.query.brand;
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip); 
    let findArgs = {};
    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            if(key === 'colors' ){
                findArgs[key] = {
                    $in: req.body.filters[key]
                }
            }
            else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    
    findArgs['publish'] = true
    
    Product.
    find({'brand':{$in:items}}).
    find(findArgs).
    populate('brand').
    populate('footwear').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})

app.get('/api/product/articles_by_model',(req,res)=>{
    let items = req.query.brand;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'model';
    
    Product.
    find({'brand':{$in:items}}).
    populate('brand').
    populate('footwear').
    sort(sortBy).
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        let docss = [];
        for(var i = 0; i < docs.length; i++){
            docss.push(docs[i].model)
        }
        let uniqueArray = docss.filter(function(item, pos) {
            return docss.indexOf(item) == pos;
        });
        return res.status(200).send(uniqueArray.sort((a,b) => b.localeCompare(a, undefined, {numeric: true})).reverse())
    })
});

app.get('/api/product/articles_by_colors',(req,res)=>{
    let items = req.query.brand;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'model';
    
    Product.
    find({'brand':{$in:items}}).
    populate('brand').
    populate('footwear').
    sort(sortBy).
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        let docss = [];
        for(var i = 0; i < docs.length; i++){
            docss.push(docs[i].color)
        }
        var result = [];
        for(let i = 0; i < docss.length;i++){
        
           for(let j = 0; j < docss[i].length; j++){
              result.push(docss[i][j]);
           }
        }
        let uniqueArray = result.filter(function(item, pos) {
            return result.indexOf(item) == pos;
        });
        return res.status(200).send(uniqueArray.sort())
    })
});

app.get('/api/product/articles_by_size',(req,res)=>{
    let items = req.query.brand;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
    
    Product.
    find({'brand':{$in:items}}).
    populate('brand').
    populate('footwear').
    sort(sortBy).
    exec((err,docs)=>{
        if(err) return res.json({success:false,err});
        let docss = [];
        for(var i = 0; i < docs.length; i++){
            docss.push(docs[i].shoesize)
        }
        var result = [];
        for(let i = 0; i < docss.length;i++){
        
          for(let j = 0; j < docss[i].length; j++){
              result.push(docss[i][j]);
          }
        }
        let uniqueArray = result.filter(function(item, pos) {
            return result.indexOf(item) == pos;
        });
        return res.status(200).send(uniqueArray.sort(function(a, b){return a-b}))
    })
});

app.get('/api/product/articles',(req,res)=>{
    
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Product.
        find({'name': {regex}}).
        populate('brand').
        populate('footwear').
        limit(limit).
        exec((err,articles)=>{
            if(err) return res.status(400).send(err);
            res.send(articles);
        });
    } else {
        Product.
        find().
        populate('brand').
        populate('footwear').
        sort([[sortBy,order]]).
        limit(limit).
        exec((err,articles)=>{
            if(err) return res.status(400).send(err);
            res.send(articles);
        });
    }
});

app.get('/api/product/articles',(req,res)=>{
    
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    
    Product.
    find().
    populate('brand').
    populate('footwear').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles);
    });
});

app.get('/api/product/articles_random',(req,res)=>{
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    
    Product.
    find().
    populate('brand').
    populate('footwear').
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        var random = articles.sort( () => Math.random() - 0.5);
        var five = random.slice(0,8);
        // five.push(random.slice(0,5));
        res.send(five);
    });
});


//===========================================
//              SITE   
//===========================================

app.post('/api/site/site_data',auth,admin,(req,res)=>{
    Site.findOneAndUpdate(
        {_id: '5c23db007ca64d0b69e90774'},
        {"$set": {siteInfo: req.body}},
        {new: true},
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                siteInfo: doc.siteInfo
            });
        }
    );
});

app.get('/api/site/site_data',(req,res)=>{
    Site.find({},(err,site)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(site[0].siteInfo);
    });
});

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})