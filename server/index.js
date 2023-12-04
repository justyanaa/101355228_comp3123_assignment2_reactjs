const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://admin:admin@cluster0.kpg90l5.mongodb.net/assignment2?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use('/', userRoutes);
app.use('/', employeeRoutes);

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});

