
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

          first_name: {
            type: DataTypes.STRING,
            allowNull: true
          },
          last_name: {
            type: DataTypes.STRING,
            allowNull: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:true
            },
            defaultValue:'Email or Phone Number'
          },
          password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'Password'
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true,
          },

        role : {
            type: DataTypes.ENUM('admin', 'client','seller'),
            allowNull: false,
            defaultValue: 'client'
        }

    })
    return User
}