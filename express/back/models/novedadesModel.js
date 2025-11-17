var pool = require('./bd');

/* * Obtiene todas las novedades (Unidad 1) 
 [cite_start]* [cite: 81-83, 85]
 */
async function getNovedades() {
  var query = "select * from novedades order by id desc";
  var rows = await pool.query(query);
  return rows;
}

/* * Inserta una novedad (Unidad 1) 
 [cite_start]* [cite: 195-202, 204]
 */
async function insertNovedad(obj) {
  try {
    var query = "insert into novedades set ? ";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* * Elimina una novedad por id (Unidad 2) 
 [cite_start]* [cite: 2400-2402, 2403]
 */
async function deleteNovedadById(id) {
  var query = "delete from novedades where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

/* * Obtiene una novedad por id (Unidad 2) 
 [cite_start]* [cite: 2432-2435, 2441]
 */
async function getNovedadById(id) {
  var query = "select * from novedades where id = ? ";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

/* * Modifica una novedad por id (Unidad 2) 
 [cite_start]* [cite: 2436-2441]
 */
async function modificarNovedadById(obj, id) {
  try {
    var query = "update novedades set ? where id=?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Asegúrate de exportar las 5 funciones
module.exports = {
  getNovedades,
  insertNovedad,
  deleteNovedadById,
  getNovedadById,
  modificarNovedadById
}