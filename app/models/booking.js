/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('booking', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		service_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'booking'
	});
};
