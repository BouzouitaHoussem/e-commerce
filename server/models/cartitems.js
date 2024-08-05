module.exports=(sequelize, DataTypes) => {
    const Cartitem=sequelize.define("cartitem", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },


    })

    return Cartitem
}