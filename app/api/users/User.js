/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		phone: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date_of_birth: {
			type: DataTypes.DATEONLY,
			allowNull: false
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
