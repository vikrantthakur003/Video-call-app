const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const port = process.env.PORT || 3000;

const apploader = async(app, router) =>{
    try {
        const server = createServer(app);
        app.use(cors({
            origin: '*',
        }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/public',express.static(path.join(__dirname,'../../../client')))
        app.use(morgan('dev'));
        app.use('/api',router);
        app.use( async(req,res)=>{
            await res.status(404).send('path not found'); // (404s)
        })
        server.listen(port, ()=>{
            console.log('***  Server Connected😀  ***');
        })
    } catch (error) {
        console.log(`error while connecting to server: ${error}`);
        throw new Error(error) 
    }

}

module.exports = apploader