const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const fs1 = require('fs').promises;
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

    await blobClient.setHTTPHeaders({
        blobContentDisposition: 'inline; filename="' + filename + '"'
    });

    return blobClient.url;
}


async function getBufferFromFile(filePath) {
    return await fs1.readFile(filePath);
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
        vehicleData.userId = user._id;

        await addCompany(req, res, companyData);

        for (const file of req.files) {
            const fileBuffer = await getBufferFromFile(file.path);
            const imageUrl = await saveImageToAzure(fileBuffer, file.filename);

            if (file.fieldname === 'fotoCNH') {
                user.CNHPictureAddress = imageUrl;
            } else if (file.fieldname === 'fotoDocumento') {
                vehicleData.documentPictureAddress = imageUrl;
            } else if (file.fieldname === 'fotoPerfil') {
                user.profilePictureAddress = imageUrl;
            }
        }
        vehicleData.type ? await addVehicle(req, res, vehicleData) : null;

        await user.save();

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


function deleteUploadsFolder() {
    const uploadsPath = path.join(__dirname, '../uploads/*');

    if (fs.existsSync(uploadsPath)) {
        fs.rm(uploadsPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('Erro ao deletar a pasta uploads:', err);
            } else {
                console.log('Pasta uploads deletada com sucesso.');
            }
        });
    } else {
        console.log('A pasta uploads não existe.');
    }
}

setInterval(deleteUploadsFolder, 1200000);