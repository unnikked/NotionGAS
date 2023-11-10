function Notion(token) {
  return new NotionV1(token);
}

class NotionV1 {

  constructor(token) {
    this.token = token;
  }

  request(method, endpoint, payload) {
    let base_url = 'https://api.notion.com/v1/';

    console.log(base_url + endpoint);

    let response = UrlFetchApp.fetch(base_url + endpoint, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Notion-Version': '2021-05-13'
      },
      method: method,
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    if (response.getResponseCode() == 200) { /** OK */
      return JSON.parse(response.getBlob().getDataAsString());
    }

    if (response.getResponseCode() == 404) { /** OK */
      throw new NotFound();
    }

    console.log('ERROR',response.getBlob().getDataAsString() );
    return JSON.parse(response.getBlob().getDataAsString());
  }

  database(id) {
    return this.request('GET', 'databases/' + id);
  }

  databases() {
    return this.request('GET', 'databases');
  }

  query(database_id, query) {
    return this.request('POST', 'databases/' + database_id + '/query', query);
  }

  onDatabase(name) {
    // return this.databases().results.filter(database => database.title[0].plain_text == name);

    return this.search({query: name})
      .results
      .filter(res => res.object == 'database')
      .filter(database => database.title[0].plain_text == name);
  }

  databaseFromId(id) {
    // return this.databases().results.filter(database => database.id == id);
    return [this.database(id)];
  }

  fetch(name, query) {

    let databases = this.onDatabase(name);

    if (databases.lenght > 0) {
      return this.query(databases[0].id, query);
    }

    return null;
  }

  fetchAll(name, query) {

    let databases = this.onDatabase(name);

    if (databases.lenght > 0) {
      return this.queryAll(databases[0].id, query);
    }

    return null;
  }

  queryAll(database_id, query) {
    console.log(JSON.stringify(query))
    const pages = [];

    let cursor = undefined;

    while (true) {
      const { results, next_cursor } = this.query(database_id, Object.assign(
        query ? query : {},
        {
          start_cursor: cursor
        }
      ));

      pages.push(...results);

      if (!next_cursor) {
        break;
      }

      cursor = next_cursor;

    }

    return pages;
  }

  queryAllAsPages(database_id, query) {
    let result = this.queryAll(database_id, query);

    return result.map(res => new Page(res));
  }

  page(id) {
    return this.request('GET', 'pages/' + id);
  }

  create(page) {
    return this.request('POST', 'pages/', page);
  }

  update(page, properties) {
    return this.request('PATCH', 'pages/' + page, properties);
  }

  user(id) {
    return this.request('GET', 'users/' + id);
  }

  users(params) {
    return this.request('GET', 'users', params);
  }

  blocks(id) {
    return this.request('GET', 'blocks/' + id);
  }

  children(id) {
    return this.request('GET', 'blocks/' + id + '/children');
  }

  delete(block_id) {
    return this.request('DELETE', 'blocks/' + block_id);
  }

  search(params) {
    return this.request('POST', 'search', params);
  }

  to_csv(database, columns, params) {
    console.log(database, columns, JSON.stringify(params));
    let rows = this.queryAll(database, params);

    let csv = []
    csv.push(columns);

    for (let row of rows) {
      let csv_row = [];

      for (let column of columns) {

        if (row['properties'][column]) {
          //console.log(row['properties'][column]);

          if (row['properties'][column].type == 'rich_text') {
            csv_row.push(row['properties'][column]['rich_text'][0].plain_text)
          }

          if (row['properties'][column].type == 'title') {
            csv_row.push(row['properties'][column]['title'][0].plain_text)
          }

          if (row['properties'][column].type == 'number') {
            csv_row.push(row['properties'][column]['number'])
          }

          if (row['properties'][column].type == 'select') {
            csv_row.push(row['properties'][column]['select'].name)
          }

          if (row['properties'][column].type == 'multi_select') {
            csv_row.push(row['properties'][column]['multi_select'].map((e) => e.name).join('|'))
          }

          if (row['properties'][column].type == 'checkbox') {
            csv_row.push(row['properties'][column]['checkbox'])
          }

          if (row['properties'][column].type == 'date') {
            if (row['properties'][column]['date'].end == null) {
              csv_row.push(row['properties'][column]['date'].start);
            } else {
              csv_row.push(row['properties'][column]['date'].start, '|', row['properties'][column]['date'].end);
            }
          }

          if (row['properties'][column].type == 'formula') {
            csv_row.push(row['properties'][column]['formula'][row['properties'][column]['formula'].type]);
          }
        } else {
          csv_row.push('');
        }
      }

      csv.push(csv_row);
    }

    let csv_string = '';

    for (let line of csv) {
      //console.log(line.join(','))
      csv_string = csv_string + '' + line.join(',') + '' + '\n'
    }

    return (csv_string);
  }
}

function NotFound() {

}


function testSearch() {

}