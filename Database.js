/**
 * ORM like functionality. I want to be able to
 * 
 * 1. easily retrieve database pages propertries without convoluted objects
 * 2. Easily create / save / update database pages by providing only key: value ojects
 * 3. Easily filter / sort properties via custom object {key: {operation: value}}
 */

function database(notion, database) {
  return new Database(notion, database);
}

/**
 * @class
 * Represents a connection to a Notion database.
 * @param {Object} notion - The Notion API instance.
 * @param {string|Object} database - The database identifier or object.
 */
class Database {

  /**
   * @constructor
   * Initializes a new instance of the Database class.
   * @param {Object} notion - The Notion API instance.
   * @param {string|Object} database - The database identifier or object.
   */
  constructor(notion, database) {
    this.notion = notion;

    if (typeof (database) === 'string') {
      this.database = this.notion.databaseFromId(database)[0];
    } else {
      this.database = database;
    }
  }

  /**
   * Retrieves the schema of the database.
   * @returns {Object} - The database schema (properties).
   */
  schema() {
    return this.database.properties;
  }

  /**
   * Retrieves the type of a specific property in the database schema.
   * @param {string} property - The name of the property.
   * @returns {string} - The type of the specified property.
   */
  typeOfProperty(property) {
    return this.schema()[property].type;
  }

  /**
   * Maps a property name and value to the Notion property format.
   * @param {string} name - The name of the property.
   * @param {*} value - The value of the property.
   * @returns {Object|undefined} - The Notion property object or undefined if the property is not found.
   */
  property(name, value) {
    let property = this.database.properties[name];

    console.log(name, value)

    console.log(property.type);

    if (property) {
      switch (property.type) {
        case 'title':
          return {
            title: [
              {
                "type": "text",
                "text": {
                  "content": value
                }
              }
            ]
          };
        case 'rich_text':
          return {
            rich_text: [
              {
                type: "text",
                text: {
                  content: value
                }
              }
            ]
          };
        case 'number':
          return {
            number: Number(value)
          };

        case 'select':
          return {
            select: {
              name: value
            }
          }

        case 'status':
          return {
            "status": {
              "name": value
            }
          }

        case 'multi_select':
          return {
            "multi_select": value.map(v => { return { "name": v } })
          }

        case 'date':
          return {
            date: value.hasOwnProperty('start') ? value : { start: value }
          }
        case 'checkbox':
          return { checkbox: value };

        case 'formula':
          throw 'unimplemented formula type';

        case 'relation':
          return {
            relation: value.map(v => { return { id: v.id } })
          }

        case 'rollup':
          throw 'unimplemented formula type';

        case 'user':
          throw 'unimplemented formula type';

        case 'files':
          throw 'unimplemented formula type';

        case 'url':
          return {
            url: value
          };

        case 'email':
          return {
            email: value
          }

        case 'phone_number': {
          return {
            phone_number: value
          }
        }

        default:
          return undefined;
      }

    }

    return undefined;
  }

  /**
   * Creates a new page in the database.
   * @param {Object} page - The page data represented as key-value pairs.
   * @returns {Object} - The created DatabasePage instance.
   */
  create(page) {
    let properties = {};

    Object.keys(page)
      .map((key) => properties[key] = this.property(key, page[key]));

    console.log(properties);

    return DatabasePage(this, this.notion.create({
      parent: {
        database_id: this.database.id
      },
      properties: properties
    }));
  }

  /**
   * Updates an existing page in the database.
   * @param {string} page_id - The ID of the page to be updated.
   * @param {Object} properties - The updated page data represented as key-value pairs.
   * @returns {Object} - The updated DatabasePage instance.
   */
  update(page_id, properties) {
    let props = {};

    Object.keys(properties)
      .map((key) => props[key] = this.property(key, properties[key]));

    return DatabasePage(this, this.notion.update(page_id, {
      parent: {
        database_id: this.database.id
      },
      properties: props
    }));
  }

  /**
   * Deletes a page from the database.
   * @param {string} page_id - The ID of the page to be deleted.
   * @returns {void}
   */
  delete(page_id) {
    return this.notion.delete(page_id);
  }


  /**
   * Maps filter criteria to Notion filter objects.
   * filter provided as {key: {operation: value}}
   * 
   * {key: {operation: value}, keyB: {operation: value}} --> and
   * [{key: {operation: value}}, {key: {operation: value}}] --> or
   * 
   * @param {Object[]} filters - An array of filter criteria.
   * @returns {Object} - The mapped Notion filter object.
   */
  mapFilter(filters) {
    return filters == undefined ? filterOr() : filterOr(
      ...filters.map(and => filterAnd(...Object.keys(and)
        .map(key => getFilter(
          this.typeOfProperty(key),
          Object.keys(and[key])[0],
          key,
          Object.values(and[key])[0])))));
  }

  /**
   * Finds a page in the database by its ID.
   * @param {string} id - The ID of the page to be retrieved.
   * @returns {Object} - The DatabasePage instance.
   */
  findById(id) {
    // return this.notion.page(id)
    //   .map(page => DatabasePage(this, page));

    return new DatabasePage(this, this.notion.page(id));
  }

  /**
   * Finds the first page in the database by its ID.
   * @param {string} id - The ID of the page to be retrieved.
   * @returns {Object} - The DatabasePage instance.
   */
  findFirstById(id) {
    return this.findById(id)[0];
  }

  /**
   * Finds all pages in the database based on filter criteria.
   * @param {Object[]} filters - An array of filter criteria.
   * @returns {Object[]} - An array of DatabasePage instances.
   */
  findAll(filters) {
    return this.notion.queryAll(this.database.id, {
      filter: this.mapFilter(filters)
    }).map(page => DatabasePage(this, page));
  }

  /**
   * Finds all pages in the database, applying sorting criteria.
   * @param {Object[]} filters - An array of filter criteria.
   * @param {Object} sorts - The sorting criteria.
   * @returns {Object[]} - An array of sorted DatabasePage instances.
   */
  findAllAndSort(filters, sorts) {
    return this.notion.queryAll(this.database.id, {
      filter: this.mapFilter(filters),
      sorts: [sorts]
    }).map(page => DatabasePage(this, page));
  }

  /**
   * Exports the database content to a CSV format.
   * @param {string[]} columns - An array of column names to export.
   * @param {Object} params - Additional export parameters.
   * @returns {string} - The CSV data.
   */
  to_csv(columns, params) {
    return this.notion.to_csv(this.database.id, columns, {
      filter: this.mapFilter(params)
    });
  }

  to_csv_custom(columns, params) {
    return this.notion.to_csv(this.database.id, columns, params);
  }
}


/**
 * @function
 * Helper function that creates a Proxy around a page object creating a Page class 
 * The proxy handler knows about the linked database to defer some method invocation
 * on the database. 
 * @param {Object} database - The Database instance.
 * @param {Object} page - The Notion page object.
 * @returns {Object} - The proxied DatabasePage instance.
 */
function DatabasePage(database, page) {
  return new Proxy(
    new Page(page),
    {
      get(obj, prop) {
        // console.log(prop)
        if (prop == 'id') return obj.getId();
        if (prop == 'update') return (props) => database.update(page.id, props);
        if (prop == 'delete') return () => database.delete(page.id);
        if (prop == 'archived') return page.archived;
        return obj.property(prop);
      }
    })
}

function testDatabase() {
  const TOKEN = ScriptProperties.getProperty('NOTION_API_KEY');

  let notion = new NotionV1(TOKEN);

  let tasks = new Database(notion, notion.onDatabase('Tasks')[0]);

  // console.log(JSON.stringify(tasks.schema()['task']));

  // let query = tasks.findAll([
  //   {
  //     task: {equals: 'Allenamento'},
  //     done: {equals: false},
  //     do_date: {equals: Utilities.formatDate(new Date(), 'Europe/Rome', "yyyy-MM-dd")}
  //   }
  // ]);

  // console.log(query.map(e => [e.task, e.do_date]));

  // query.map(p => p.update({done: true}));

  let task = tasks.create({
    task: "test",
    do_date: Utilities.formatDate(new Date(), 'Europe/Rome', "yyyy-MM-dd'T'HH:mm:ssXXX")
  });

  console.log(task.id, task.task);

  task = task.update({ task: 'Test Modified' });

  console.log(task.id, task.task);

  task.delete();
}