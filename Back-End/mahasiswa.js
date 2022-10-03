const Mahasiswa = require('./connect.js');
const {validationResult} = require('express-validator');
exports.bodyParser = require('body-parser'); // parser middleware


exports.getInsert = async (req,res) => {
    res.sendFile(__dirname + '/insert.html');
}

exports.getDelete = async (req,res) => {
    res.sendFile(__dirname + '/delete.html');
}

exports.getUpdate = async (req,res) => {
    res.sendFile(__dirname + '/update.html');
}

exports.getMahasiswa = async (req,res)=>{
    if(req.query.nim){
        const nim = req.query.nim

        Mahasiswa.findOne({nim: nim})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message:`Not found Mahasiswa with nim ${nim}`
                })
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({
                message:`Error retrieving Mahasiswa with id ${nim }`
            })
        })
    } else {
        Mahasiswa.find()
        .then(mahasiswa => {
            res.send(mahasiswa)
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Error while retriving mahasiswa information"})
        })
    }
    
}

exports.Insert = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    } else {
        var mahasiswa = new Mahasiswa({
            nim: req.body.nim,
            namestudent: req.body.namestudent,
            role: req.body.role
        })
        mahasiswa
            .save(mahasiswa)
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(500).json({
                    message : "Error while creating insert operation"
                })
            })
        // res.redirect('/')
    }
}

exports.deleteMahasiswa = async (req,res) => {
    const nim = req.params.nim

    Mahasiswa.findOneAndDelete({nim:nim})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot delete with nim ${nim}`})
            } else {
                res.send({
                    message: 'Mahasiswa was deleted successfully'
                })
            }  
        }).catch(err => {
            res.status(500).send({
                message:"Could not delete mahasiswa with nim = "+nim
            })
        })
}

exports.updateMahasiswa = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message:'Data can not be empty'})
    }

    const nim = req.params.nim
    Mahasiswa.findOneAndUpdate({nim: nim}, req.body)
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${nim}. Maybe user not found`})
            }else{
                res.send(data)
            }  
        })
        .catch(err => {
            res.status(500).send({message: "error update user information"})
        })
}