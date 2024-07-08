const connectToMongo = require('./db');
const express = require('express')


const app = express();
app.use(express.json());

connectToMongo();
const port = 5000

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`NexusNotaion backend listening on at http://localhost:${port}`)
})

