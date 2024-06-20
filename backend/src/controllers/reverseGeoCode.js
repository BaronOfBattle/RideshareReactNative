const fetch = require('node-fetch');

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'rideshare/2.0' } 
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Erro ao realizar geocodificação reversa:', error);
    throw error; 
  }
}

module.exports = reverseGeocode;