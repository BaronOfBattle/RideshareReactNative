const Address = require('../models/Address');

exports.addAddress = async (req, res, addressData) => {

    try {
        let address = new Company(addressData);
        await address.save();
        return { 'status': 'success', 'message': 'Address added successfully' };
    } catch (err) {
        console.error('Error saving address:', err);
        return { 'status': 'failure', 'message': 'Error saving address to database' };
    }
};
