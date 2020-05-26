/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bill', {
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
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		total_price: {
			type: "MONEY",
			allowNull: false
		},
		discount: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'bill'
	});
};
