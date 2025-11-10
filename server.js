const express = require('express');
const app = express();
require('dotenv').config();
const productsRoute = require('./routes/productsRoute');
const unitsRoute = require('./routes/unitsRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const discountRoute = require('./routes/discountRoute');

app.use(express.json());

app.use('/units', unitsRoute);
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/discounts', discountRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running... http://localhost:' + (process.env.PORT || 3000));
});
