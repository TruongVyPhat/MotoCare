/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('onSale', {
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
		discount_percent: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'onSale'
	});
};
