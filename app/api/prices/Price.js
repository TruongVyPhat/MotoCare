/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('price', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		input_price: {
			type: "MONEY",
			allowNull: false
		},
		sell_price: {
			type: "MONEY",
			allowNull: false
		}
	}, {
		tableName: 'price'
	});
};
