module.exports = (sequelize, DataTypes) => {
    const Ejercicio = sequelize.define("Ejercicio", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El nombre del ejercicio es obligatorio" },
            }
        },
        nivelDificultad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoMovimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requiereEquipo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        equipamientoNecesario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referenciaBibliografica: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La referencia científica es obligatoria para este catálogo." }
            }
        },
        nivelEfectividad: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true,
        tableName: "ejercicios",
    });

    Ejercicio.associate = (models) => {
        Ejercicio.belongsTo(models.GrupoMuscular, {foreignKey: "grupoMuscularId", as: "grupoMuscular"});
    };
    return Ejercicio;
};
