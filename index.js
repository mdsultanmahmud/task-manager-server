const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
// username:Task_Manager
// password:l22nvLd0mbIff8Ij
//middlewear
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Task manager server is running..')
})

app.listen(port, () => {
    console.log(`server running from port: `, port)
})



const uri = "mongodb+srv://Task_Manager:l22nvLd0mbIff8Ij@cluster0.p11nzlu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const AllTask = client.db('TaskManager').collection('alltask')
        app.post('/alltask', async(req, res) =>{
            const task = req.body
            const result = await AllTask.insertOne(task)
            res.send(result)
        })
        app.get('/alltask', async(req, res) =>{
            const query = req.query
            const filter = {
                email: query.email
            }
            console.log(filter)
            const cursor = await AllTask.find(query).toArray()
            res.send(cursor)
        })
    }
    catch {

    }
}

run().catch(err => console.log(err))