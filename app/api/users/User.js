/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        'id': {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "null",
            primaryKey: true
        },
        'name': {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "null"
        },
        'role_id': {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "null"
        },
        'email': {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "null"
        },
        'address': {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "null"
        },
        'date_of_birth': {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "null"
        },
        'password': {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "null"
        },
        'refresh_token': {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "null"
        },
        'created_time_token': {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "null"
        }
    }, {
        tableName: 'User'
    });
};
