const Sequelize = require('sequelize');

const sequelize = new Sequelize('clase04', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
});

sequelize
    .authenticate()
    .then(() => { 
        console.log('Coneccion establecida exitosamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos.', err)
    });

const Model = Sequelize.Model;

class Usuario extends Model {}
Usuario.init({
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'usuario'
});

sequelize.sync()
    .then(() => Usuario.create({
        nombre: 'Juan',
        apellido: 'Gonzales'
    }))
    .then(jane => { 
        console.log(jane.toJSON()); 
});

sequelize.sync()
    .then(() => Usuario.create({
        nombre: 'Sofia',
        apellido: 'Perez'
    }))
    .then(jane => { 
        console.log(jane.toJSON()); 
});

Usuario.update({ nombre: 'Albertito' }, { where: { id: 2 } })
.then(() => {
    console.log('Realizado.')
})