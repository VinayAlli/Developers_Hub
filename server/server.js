const express=require('express')
const mongoose=require('mongoose')
const devuserschema = require('./model/devusermodel')
const reviewschema = require('./model/reviewmodel')
const taskschema = require('./model/taskmodel')
const jwt=require('jsonwebtoken')
const middleware = require('./middleware')
const cors = require('cors');

const app=express()
app.use(express.json());
app.use(cors({origin:'* '}));
mongoose.connect('mongodb+srv://alliviswanadh2001:sabhal963@cluster0.es2use3.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('db connected'))



app.get('/',(req,res)=>{
    return res.send('Hello world');
})

app.post('/register',async(req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,confirmpassword}= req.body;
        const exist= await devuserschema.findOne({email});
        if (exist){
            return res.status(400).send('User already registered')
        }
        if (password!=confirmpassword){
            return  res.status(403).send("Passwords do not match")
        }
        let newUser = new devuserschema({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User registered successfully')

    }
    catch(err){
        return res.status(500).send(err)
    }

})

app.post('/login', async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist= await devuserschema.findOne({email});
        if (!exist){
            return res.status(400).send('User not exist')
        }
        if (exist.password!=password){
            return   res.status(403).send("Incorrect password");
        } 
        let payload={
            user:{
                id:exist.id,
            }
        }
        jwt.sign(payload,'jwtpassword',{expiresIn:360000000},
        (err,token)=>{
            if(err){
                return res.send(err);
            }
            else{
                return res.json({token})
            }

        })
    }
    catch(err){
        return res.status(500).send('error in catch')
    }

})

app.get('/allprofiles',middleware,async(req,res)=>{
    try{
        let allprofiles= await devuserschema.find();
        return res.json(allprofiles)

    }
    catch(err){
        res.send(err)
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user= await req.user;
        let myprofile= await devuserschema.findById(user.id);
        return res.json(myprofile)

    }
    catch(err){
        res.status(500).send(err)
    }
})

app.post('/addreview',middleware,async(req,res)=>{
    try{
        let user= await req.user;
        const taskproviderdetails= await devuserschema.findById(user.id)
        const {taskworker,taskworkerName, rating} = req.body;
        if (taskproviderdetails.fullname !== taskworkerName) {
            const newReview = new reviewschema({
              taskprovider: taskproviderdetails.fullname,
              taskworker,
              taskworkerName,
              rating,
            });
        
            await newReview.save();
        
            return res.status(200).send('Review Added Successfully');
          } else {
            return alert('Not possible')
          }
    
        
        
        
    }
    catch(err){
        res.status(500).send('error')
    }
})

app.get('/myreviews',middleware,async(req,res)=>{
    try{
        let user=await  req.user ;
        let allreviews= await reviewschema.find()
        let myreviews= allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString())
        return  res.json(myreviews)
    }
    catch(err){
        res.status(500).send('error')
    }
})

app.get('/userreviews',async(req,res)=>{
    try{
        const userid=req.header('x-id');
        let allreviews= await reviewschema.find()
        let myreviews= allreviews.filter(review=>review.taskworker.toString()===userid)
        return  res.json(myreviews)
    }
    catch(err){
        res.status(500).send('error')
    }
})

app.post('/addtask',middleware,async(req,res)=>{
    try{
        let user= await req.user;
        const taskproviderdetails= await devuserschema.findById(user.id)
        const {taskworker, taskinfo} = req.body;
            const newTask = new taskschema({
              taskprovider: taskproviderdetails.fullname,
              taskworker,
              taskinfo,
            });
            await newTask.save()
            return res.status(200).send('Task Added Successfully'); 
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/getalltasks',middleware,async(req,res)=>{
    try{
        let user= await req.user;
        let alltasks= await taskschema.find()
        let mytasks= alltasks.filter(task=>task.taskworker.toString()===user.id)
        return  res.json(mytasks)
    }
    catch(err){
        res.status(500).send('error')
    }
})

app.listen(8000,()=>console.log('server running'))