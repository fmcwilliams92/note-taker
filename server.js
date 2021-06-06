// adding in libraries
const express = require('express');
const app = express();

// linking route files
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// port to be used
const port = process.env.PORT || 3001;

// use commands to run route files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/html', htmlRoutes);
app.use('/api', apiRoutes);

// alert that the server is running
app.listen(port, () => {
    console.log('Server now being hosted!');
});