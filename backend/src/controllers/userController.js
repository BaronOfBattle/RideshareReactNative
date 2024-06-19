const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
require('dotenv').config();


const { addVehicle } = require('./vehicleController');
const { addCompany } = require('./companyController');
const { addAddress } = require('./addressController');

let User = require('../models/User');
let Company = require('../models/Company');
let Vehicle = require('../models/Vehicle');
let Address = require('../models/Address');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function saveImageToAzure(fileBuffer, filename) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerName = 'rideshare';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(filename);

  await blobClient.upload(fileBuffer, fileBuffer.length);

  return blobClient.url;
}



exports.cadastro = async (req, res) => {
    const dadosUser = JSON.parse(req.body.userData);
    
    try {
        let user = new User(dadosUser);
        await user.save();

        const addressData = JSON.parse(req.body.addressData);
        let address = new Address(addressData);
        await address.save();

        const companyData = JSON.parse(req.body.companyData);
        companyData.userId = user._id;
        companyData.addressId = address._id;
        const vehicleData = JSON.parse(req.body.vehicleData);

        vehicleData.type ? await addVehicle(req, res, vehicleData) : null;
        await addCompany(req, res, companyData);

        for (const file of req.files) {
            const imageUrl = await saveImageToAzure(file.buffer, file.originalname);
      
            if (file.fieldname === 'CNHPictureAddress') {
              user.CNHPictureAddress = imageUrl;
            } else if (file.fieldname === 'documentPictureAddress') {
              // vehicle.documentPictureAddress = imageUrl;
            } else if (file.fieldname === 'profilePictureAddress') {
              user.profilePictureAddress = imageUrl;
            }
          }
      
          await user.save();
          if (vehicle) await vehicle.save();

        res.status(201).json(user);
    } catch (err) {
        console.error('Erro ao salvar:', err);
        res.status(500).json({ 'status': 'failure', 'mssg': 'Erro ao salvar no banco de dados' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Email ou senha incorretos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


exports.getUserById = async function (req, res) {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.status(200).json({ 'status': 'success', 'user': user });
    }).catch(err => {
        res.status(400).send({ 'status': 'failure', 'mssg': err });
    })
}
