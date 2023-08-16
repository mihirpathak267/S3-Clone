const User = require('../model/user.model');

// const verifyCallback = async(req, resolve, reject) => {
//     const apikey = req.query.apikey;
//     if (!apikey){
//         return reject(res.json({status:400, message:"Apikey required"}));
//     }
//     const getUser = await User.findOne({apikey:apikey});
    
//     if(!getUser){
//         return reject(res.json({status:400, message:"Apikey doesnt exist"}));

//     }
//     reject.user = getUser;
//     resolve();
// }

// const auth = async(req, res, next) => {
//     return new Promise((resolve, reject)=>{
//         return verifyCallback(req, resolve, reject);
//     })
//         .then(() => next())
//         .catch((err) => next(err));
        
// };

exports.userAuth = async(req, res, next)=>{
    try{
    const apikey = req.query.apikey;
    if (!apikey){
        return res.json({status:400, message:"Apikey required"});
    }
    const getUser = await User.findOne({apikey:apikey});

    if(!getUser){
        return res.json({status:400, message:"Apikey doesnt exist"})
    }

    req.user = getUser;
    next();

    } catch (error) {
        console.log(error);
    }
}
