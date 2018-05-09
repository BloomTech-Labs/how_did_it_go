
exports.up = function(knex) {
  return createUsersTable(knex)
    .then(createCompaniesTable)
    .then(createPlatFormsTable)
    .then(createCustomersTable)
    .then(createInvitationsTable)
    .catch(error => {
      console.log(error);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('invitations')
    .then(function() {
      console.log("Dropping Customers Table");
      return knex.schema.dropTableIfExists('customers');
    })
    .then(function() {
      console.log("Dropping PlatForms Table");
      return knex.schema.dropTableIfExists('platForms');
    })
    .then(function() {
      console.log("Dropping Companies Table");
      return knex.schema.dropTableIfExists('companies');
    })
    .then(function() {
      console.log("Dropping Users Table");
      return knex.schema.dropTableIfExists('users');
    })
    .catch(error => console.log(error));
};


createUsersTable = knex => {
  console.log('creating users table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username', 128).notNullable().unique();
        table.string('password', 128).notNullable();
        table.timestamp('createAt').defaultTo(knex.fn.now());

        console.log('users table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

createCompaniesTable = knex => {
  console.log('creating companies table');

  const DEFAULT_MESSAGE = 'Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. In the meantime, could you do me a favor and leave us a review? Here is a link that will make it easy: ';
  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('companies', table => {
        table.increments('id').primary();
        table.string('name', 128).notNullable().unique();
        table.string('address');
        table.string('contactFirstName', 128).notNullable();
        table.string('contactLastName', 128).notNullable();
        table.string('contactEmail', 128).notNullable();
        table.text('defaultMessage', 'mediumtext').notNullable().defaultTo(DEFAULT_MESSAGE);
        table.boolean('paymentIsCurrent').defaultTo(false);
        table
          .integer('userID')
          .references('id')
          .inTable('users')
          .notNullable()
          .onDelete('CASCADE')
          .index();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        console.log('companies table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

createPlatFormsTable = knex => {
  console.log('creating platForms table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('platForms', table => {
        table.increments('id').primary();
        table.string('url').notNullable();
        table.string('resource', 128).notNullable();
        table.integer('companyID')
          .references('id')
          .inTable('companies')
          .notNullable()
          .onDelete('CASCADE')
          .index();
        table.timestamp('createdAt').defaultTo(knex.fn.now()); 

        console.log('platForms table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

createCustomersTable = knex => {
  console.log('creating customers table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('customers', table => {
        table.increments('id').primary();
        table.string('firstName', 128).notNullable();
        table.string('lastName', 128).notNullable();
        table.string('phoneNumber', 128).notNullable().unique();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        console.log('customers table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};  

createInvitationsTable = knex => {
  console.log('creating invitations table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('invitations', table => {
        table.increments('id').primary();
        table.boolean('clicked').defaultTo(false);
        table.integer('platFormID')
          .references('id')
          .inTable('platForms')
          .notNullable()
          .onDelete('CASCADE')
          .index();
        table.integer('customerID')
          .references('id')
          .inTable('customers')
          .notNullable()
          .onDelete('CASCADE')
          .index();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        console.log('invitations table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};


