/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		phone: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		date_of_birth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		refresh_token: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		created_time_token: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'user'
	});
};
