/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product_order', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		bill_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'product_order'
	});
};
