const express = require('express');
const multer = require('multer');
const path = require("path");
const fs = require('fs'); 

let User = require('../models/User');
let Company = require('../models/Company');
let Vehicle = require('../models/Vehicle');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const saveImage = (buffer, filename) => {
    const directoryPath = '../frontend/assets';
  
    const filePath = path.join(directoryPath, filename);
  
    fs.writeFile(filePath, buffer, 'binary', err => {
      if (err) {
        console.error('Erro ao salvar a imagem:', err);
      } else {
        console.log(`Imagem ${filename} salva com sucesso em ${filePath}.`);
      }
    });
  };
  
  exports.cadastro = async (req, res) => {
    const dadosUser = {
        fullName: req.body.nome, 
        email: req.body.email, 
        dataNasc: req.body.dataNascimento, 
        pronoum: req.body.pronome, 
        password: req.body.senha, 
        userCategory: req.body.categoria, 
        profilePictureAddres: "", 
        registrationCNH: req.body.registroCNH, 
        cpf: req.body.cpf, 
        CNHPictureAddress: "", 
    };

    const dadosCompany = {
        name: req.body.nomeEmpresa, 
        position: req.body.cargo, 
        code: req.body.codigo, 
        address: req.body.endereco, 
        CEP: req.body.cep, 
        number: req.body.numero, 
    }
    const dadosVehicle = {
        vehicleType: req.body.tipoAutomovel, 
        model: req.body.modelo, 
        color: req.body.cor, 
        documentPictureAddress: "", 
    }

    console.log("Dados: " + dadosUser);
    console.log("Dados: " + dadosCompany);
    console.log("Dados: " + dadosVehicle);
    console.log(req.files); 

    try {
        let user = new User(dadosUser);
        await user.save();

        let company = new Company(dadosCompany);
        await company.save();

        let vehicle = new Vehicle(dadosVehicle);
        await vehicle.save();

        req.files.forEach(file => {
            saveImage(file.buffer, file.originalname);
            if (file.fieldname === 'fotoPerfil') {
                user.profilePictureAddres = file.originalname;
            } else if (file.fieldname === 'fotoDocumento') {
                vehicle.documentPictureAddress = file.originalname;
            } else if (file.fieldname === 'fotoCNH') {
                user.CNHPictureAddress = file.originalname;
            }
        });

        await user.save();
        await vehicle.save();

        res.status(201).json({ 'status': 'success', 'mssg': 'Cadastro realizado com sucesso' });
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
