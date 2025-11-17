var pool = require('./bd');
var md5 = require('md5');

// Corrección 1: Cambiado "User" por "user" para que coincida
async function getUserByUsernameAndPassword(user, password) { 
  try {
    // Corrección 2: Cambiado "usuario" por "usuarios"
    var query = "select * from usuarios where usuario = ? and password = ? limit 1"; 
    
    var rows = await pool.query(query, [user, md5(password)]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserByUsernameAndPassword }