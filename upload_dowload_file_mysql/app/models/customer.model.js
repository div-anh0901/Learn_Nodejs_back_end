module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customers', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  name: {
			type: Sequelize.STRING
	  },
	  address: {
			type: Sequelize.STRING
	  },
	  age: {
			type: Sequelize.INTEGER
	  }
	});

	
	return Customer;
}