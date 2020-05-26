/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('brand', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'brand'
	});
};
