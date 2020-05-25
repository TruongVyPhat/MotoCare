/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('service', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		price: {
			type: "MONEY",
			allowNull: false
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'service'
	});
};
