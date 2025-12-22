const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xligdge.mongodb.net/?appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const db = client.db('online_ticket_booking_db');
        const ticketsCollection = db.collection('tickets');
        const bookingCollection = db.collection('bookings')

        // Tickets save APi in db 
        app.post('/tickets', async (req, res) => {
            const ticketData = req.body;
            // console.log(ticketData);

            const result = await ticketsCollection.insertOne(ticketData);
            res.send(result)
        })

        // Ticket Data get এর API
        app.get('/tickets', async (req, res) => {
            const result = await ticketsCollection.find().toArray();
            res.send(result)
        })

        // Single Ticket এর Data পাওয়ার API
        app.get('/tickets/:id', async (req, res) => {
            const id = req.params.id
            const result = await ticketsCollection.findOne({ _id: new ObjectId(id) });
            res.send(result)
        })


        // User Ticket Booking
        app.post('/user-booked-tickets', async (req, res) => {
            const bookingData = req.body;
            // console.log(ticketData);

            const result = await bookingCollection.insertOne(bookingData);
            res.send(result)
        })

        // Get User Booked Ticket by email
        app.get('/user-booked-tickets/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const result = await bookingCollection.find({ BookingEmail: email }).toArray();
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Online ticket server in running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
