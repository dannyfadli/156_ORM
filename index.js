const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
