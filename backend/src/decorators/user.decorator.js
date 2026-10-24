const userDecorator = (user) => {
    return {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        fechaNacimiento: user.fechaNacimiento,
        genero: user.genero,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

module.exports = userDecorator;