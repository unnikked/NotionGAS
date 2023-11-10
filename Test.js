function testDatabasePage() {

  const TOKEN = '';

  let notion = new NotionV1(TOKEN);

  let q = notion
    .query('bf0fff8c-b4db-47d5-9e48-dc3a384ec0e9')
    .results
    .map(e => new Page(e))
    .map(p => new DatabasePage(p).hr_mean);

  console.log(q);

}

function testType() {
  console.log(typeof(true) == "boolean")
}

function findDatabase() {

  const TOKEN = '';

  let notion = new NotionV1(TOKEN);



  let response = notion.databaseFromId('79b596e3-8d87-42f1-9b36-7522946ea2f0');
  console.log(response);

  let database = response.results.filter(res => res.object == 'database')

  console.log(JSON.stringify(database[0].id));

}


function test() {
  const TOKEN = '';

  let notion = new NotionV1(TOKEN);

  let db = database(notion, 'bf0fff8c-b4db-47d5-9e48-dc3a384ec0e9');



  let response = db.to_csv_custom(['end', 'score'], {
        filter: db.mapFilter([{score: {greater_than: 90}}]),
        sorts: [
          sortByCreatedTimeAcending('end')
        ]
      });
  console.log(response);

}