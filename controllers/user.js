'use strict'

//auth es un contralador de registro y autenticacion de usuarios en la api-rest

const mongoose = require('mongoose');
const User = require('../database/collections/user');
const generateToken = require('../token/generateToken');

// signUp-------------
function signUp(req, res){

    const user = new User({
         name :req.body.name,
         lastname: req.body.lastname,
         phone: req.body.phone,
         email:req.body.email,
         password: req.body.password
    })
    user.save((err)=>{
        
        if(err){
            console.log(err)
            res.status(500).sed({message:`Error al crear el usuario: ${err}`})
            
        }

        const gentoken = generateToken.createToken(user)
        console.log(gentoken)
        return res.status(200).send({token: generateToken.createToken(user)})
        
    })
}

//signIn----------------
function signIn(req, res){
    console.log(req.body.email)

    User.findOne({email:req.body.email}, (err, user)=>{
        if(err){
            return res.statud(500).send({message:err})
        } 
        if(!user){
            return res.status(404).send({ message:'No existe el usuario' })
        }
        
        req.user = user;
        res.status(200).send({
            message:'Te has logueado conrrectamente',
            token: generateToken.createToken(user)
        
        })
    })

}

module.exports = {
    signUp,
    signIn
}

