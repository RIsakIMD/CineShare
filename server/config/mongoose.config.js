const mongoose = require('mongoose');

const database_name = "TODO";

mongoose.connect('mongodb://127.0.0.1:27017/' + database_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to database ' + database_name))
    .catch(err => console.log(err));
