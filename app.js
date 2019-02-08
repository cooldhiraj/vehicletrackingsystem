const express = require('express');
const mongoose = require('mongoose');
const app = express();
const agency = require('./routes/agency.js');
const vehicle = require('./routes/vehicle.js');
const driver = require('./routes/driver.js');
const auth  = require('./routes/auth.js');
require('./startup/prod')(app);

app.use(express.json());
app.use('/agency', agency);
app.use('/vehicle', vehicle);
app.use('/driver', driver);
app.use('/api', auth);

mongoose.connect('mongodb://localhost/vehicletrackingsystem', {useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Sucessfully Connected to Database'))
    .catch(err => console.error('Error ', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});