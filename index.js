
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 4000


const app = express()

app.use(cors());
app.use(bodyParser.json());
const password = 'arabia123';


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabia:arabia123@cluster0.uj2jz.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("booking");
  // add Booking here-----------------  
  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0);
      })
    //index.html^^^theke ze request asteche mane data asteche oi ta body hishabe niye nichi abong server e pathai dicho
    // console.log(newBooking);
  })

// email: req.query.email
  app.get('/bookings', (req, res) => {
    // console.log(req.query.email);
     bookings.find({})
       .toArray((err, documents) => {
        res.send(documents);
      })

  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)