/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		updated_by: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		brand_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'product'
	});
};
