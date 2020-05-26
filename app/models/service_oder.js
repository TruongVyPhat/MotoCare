/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('service_oder', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		service_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		bill_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'service_oder'
	});
};
