require('dotenv').config();
const express = require('express');
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User=require('./models/User');
const Post=require('./models/Post');
const bcrypt =require('bcrypt')
const app = express();
var jwt = require('jsonwebtoken');
const cookieParser =require('cookie-parser');
const multer=require('multer');
const fs =require('fs');

const uploadMiddleware=multer({dest:'uploads/'});
const port = 4000;





app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));


mongoose.connect(process.env.MONGO_CONNECTION)



app.post('/register',async (req, res) => {
  const {username,password} =req.body;

  const salt=  bcrypt.genSaltSync(10);
  const hashpassword= bcrypt.hashSync(password,salt);


  try{
    const userDoc =await User.create({username:username,password:hashpassword});
    res.json(userDoc);
  }catch(e){
 res.status(404).json(e);                      
  }
});

const secret='ffdtygyfryxtuyh985vhvig657b02vgh'
app.post('/login', async (req,res) => {
  const {username,password} = req.body;

  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({username,_id:userDoc._id},secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        _id:userDoc._id,
        username,
      });
    });
  }
});



  app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
  jwt.verify(token, secret,{},(err,info) => {
    if (err) throw err;
    res.json(info);
  });
});


app.post('/logout',(req,res)=>{
   res.cookie('token','').json('ok');
})


app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
  const {token} = req.cookies;
  const {originalname,path}= req.file;
  const parts=originalname.split('.');
  const ext =parts[parts.length -1];
  const newPath=path+'.'+ext;
  fs.renameSync(path,newPath);

  jwt.verify(token, secret,{},async(err,info) => {
    if (err) throw err;

    const {title,summary,content}=req.body;

    const postDocs=await Post.create({
      title,
      summary
      ,content,
      cover:newPath,
      author:info._id,
 });
    res.json(postDocs);
  });
})

app.get('/post',async(req,res)=>{
  const post= await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
  res.json(post);
});

app.get('/post/:id',async(req,res)=>{
 const {id}= req.params;
 const postDocs =await Post.findById(id).populate('author',['username']);
 res.json(postDocs)
})


app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }
  const {id,title,summary,content} = req.body;
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
   
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info._id); 
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
 
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = newPath ? newPath : postDoc.cover;

   postDoc.save();

   res.json(postDoc)
   });
  
});






app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});




