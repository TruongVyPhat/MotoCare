/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('slot', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
	}, {
		tableName: 'slot'
	});
};
