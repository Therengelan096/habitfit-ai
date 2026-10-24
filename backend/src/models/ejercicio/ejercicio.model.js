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
                len: {
                    args: [1, 150],
                    msg: "El nombre del ejercicio no puede superar los 150 caracteres",
                },
            }
        },
        nivelDificultad: {
            type: DataTypes.ENUM("Principiante", "Intermedio", "Avanzado"),
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
            allowNull: true,
            validate: {
                equipoRequerido(value) {
                    if (this.requiereEquipo === true && (!value || value.trim() === "")) {
                        throw new Error("El equipamiento necesario es obligatorio cuando el ejercicio requiere equipo");
                    }
                }
            }
        },
        referenciaBibliografica: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La referencia científica es obligatoria para este catálogo." }
            }
        },
        nivelEfectividad: {
            type: DataTypes.ENUM("Alto", "Óptimo"),
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
