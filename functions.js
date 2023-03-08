function wrapasync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e=>next(e));
    }
}

const verifyPassword=wrapasync(async(req,res,next)=>{
    const {user,pass}=req.body;
    const data1 =await authentication.find({user:user});
    if(data[0].pass===pass){
        next();
    }else{
        throw new AppError("You are Not authenticated",404);
    }
})
module.exports={wrapasync:wrapasync,verifyPassword:verifyPassword};