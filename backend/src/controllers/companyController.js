const Company = require('../models/Company');

exports.addCompany = async (req, res, companyData) => {

    try {
        let company = new Company(companyData);
        await company.save();
        return status(201).json({ 'status': 'success', 'message': 'Company added successfully' });
    } catch (err) {
        console.error('Error saving company:', err);
        return status(500).json({ 'status': 'failure', 'message': 'Error saving company to database' });
    }
};
