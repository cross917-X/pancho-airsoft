const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: '',         
    port: 3306,           
    database: 'airsoft-pancho' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos MySQL!');
});

module.exports = connection;