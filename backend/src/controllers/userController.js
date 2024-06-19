const express = require('express');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
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

const saveImage = (filePath, filename) => {
    const directoryPath = path.join(__dirname, '../../../frontend/assets');
    const destinationPath = path.join(directoryPath, filename);
    console.log("eleeee");
    console.log(filePath);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.copyFile(filePath, destinationPath, err => {
        if (err) {
            console.error('Erro ao salvar a imagem:', err);
        } else {
            console.log(`Imagem ${filename} salva com sucesso em ${destinationPath}.`);
        }
    });
};



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

        req.files.forEach(file => {
            // saveImage(file.path, file.originalname);
        });        

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
