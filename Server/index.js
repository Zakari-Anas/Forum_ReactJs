const express = require('express');
const app = express();
const db = require('./models')
const cors=require('cors')
const Routers=require('./routes/Posts')
const Users=require('./routes/User')
const Comments=require('./routes/Comments')



app.use(cors())
app.use(express.json());
app.use('/posts',Routers)
app.use('/authentication',Users)
app.use('/Comments',Comments)




db.sequelize.sync().then(()=>{

    app.listen(3001,()=>{
        console.log('server running on port 3001...');
    });
});