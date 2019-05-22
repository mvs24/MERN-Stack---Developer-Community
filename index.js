const express = require('express');
const mongoose = require('mongoose');

const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');

const app = express();


// DB config
const db = require('./config/keys').mongoURI;
// connect to MongoDB
mongoose.connect(db).then(()=>{
    console.log("MongoDB connected");
}).catch(err=>{
    console.log("Error: " + err);
})

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);




const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("listening on port " + port);
})