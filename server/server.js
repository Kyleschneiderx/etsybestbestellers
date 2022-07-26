const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express();
const cors = require('cors');
const urlencoded = require('body-parser').urlencoded;

const user = require('./routes/user')
const stripe = require('./routes/stripe')
const webhooks = require('./routes/webhooks')



mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors());

// MIDDLEWARE




app.use('/api/webhooks/webhook', express.raw({type: "*/*"}))
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

// app.use(express.urlencoded({
//     extended: false
// }))
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/js/twilio.min.js', (req, res) => {
//     res.sendFile('./node_modules/twilio-client/dist/twilio.min.js');
// });
app.use('/api/users', user);
app.use('/api/stripe', stripe);
app.use('/api/webhooks', webhooks);


app.use(express.static('client/build'));

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}



const port = process.env.PORT || 3001

app.listen(port, () =>{
    console.log('SERVER RUNNING', port)
})