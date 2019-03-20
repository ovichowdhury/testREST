const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PersonModel = require('./model/person');

app.use('/', express.static('public'));
//for parsing json input from angular
app.use(bodyParser.json());


//get all person
app.get('/get-all', async function(req, res){
    res.status(200).json(await PersonModel.find());
});


// for creating 
app.post('/create-person', function(req, res) {
    let personInfo = req.body;
    let newPerson = new PersonModel({
        name: personInfo.name,
        email: personInfo.email,
        phone: personInfo.phone
    });

    newPerson.save(function(err, Person){
        if(err)
           res.status(500).json({message: "Error creating new Person"})
        else {
            res.status(200).json({
                person : Person
            });
        }
    });
});

// for retriving
app.post('/get-by-name', (req, res) => {
    PersonModel.findOne({name : req.body.name}, function(err, response) {
        if(!err){
            res.status(200).json({
                personInfo : response
            });
        }
        else {
            res.status(404).json({message: "Person not found"});
        }
    });
});




// for updating
app.put('/update-person/:name', function(req, res) {
    const {key, value} = req.body;
    PersonModel.findOneAndUpdate({name : req.params.name}, {[key] : value}, function(err, response) {
        if(err) {
            res.status(500).json({
                "message" : "update failed"
            });
        }
        else{
            res.status(200).json({
                result : response
            });
        }
    });
});


app.put('/update-person-all/:name', function(req, res) {
    const {name, email, phone} = req.body;
    PersonModel.findOneAndUpdate({name : req.params.name}, {name: name, email: email, phone: phone}, function(err, response) {
        if(err) {
            res.status(500).json({
                "message" : "update failed"
            });
        }
        else{
            res.status(200).json({
                result : response
            });
        }
    });
});

app.delete('/delete-person/:name', function(req, res) {
    PersonModel.findOneAndRemove({name : req.params.name}, function(err, response) {
        if(err){
            res.status(500).json({message: "deletion failed"});
        }
        else {
            res.status(200).json({
                result : response
            });
        }
    });
});



// utility function
// function parseUpdate(key, val) {
//     if(key === "age")
//         return parseInt(val);
//     else
//         return val;
// }



app.listen(3000, (err, res) => {
    console.log("Server is listening to port 3000 !!");
});