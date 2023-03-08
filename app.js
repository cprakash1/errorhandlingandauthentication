const express=require('express');
const app=express();
const path=require('path');
const ejsMate=require('ejs-mate');
const mongoose=require('mongoose');
const authentication=require('./authentication');
const AppError=require('./apperror')
const {wrapasync,verifyPassword}=require('./functions')

mongoose.connect('mongodb://127.0.0.1:27017/authen',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('error',console.error.bind(console,'Connection Error'));
mongoose.connection.once('open',()=>{
    console.log('Database Connected');
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set(express.static(path.join(__dirname,'static')));
app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
app.engine('ejs',ejsMate);



app.get('/auth',(req,res)=>{
    res.render('auth',{title:"Create Authentication"});
})
app.get('/',wrapasync(async(req,res)=>{
    const data=await authentication.find();
    res.status(200).render('allauth',{title:'All Authentication',data});
}))
app.post('/auth',wrapasync(async(req,res)=>{
    const {user,pass}=req.body;
    const data1=new authentication({user:user,pass:pass});
    console.log(data1);
    await data1.save();
    res.redirect('/');
}))
app.use((err,req,res,next)=>{
    console.log(err.name);
    next(err);
})
app.use((err,req,res,next)=>{
    const {status=400,message='Something Went Wrong'}=err;
    res.status(status).send(message);
})
app.listen(3000,()=>{
    console.log('Server Started')
    console.log('http://127.0.0.1:3000/')
})