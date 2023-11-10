# NotionGAS

## Overview

The NotionGAS provides a convenient way to interact with Notion databases in Google Apps Script. It enables users to perform various operations such as creating, updating, deleting, and querying database pages with ease.

## Getting Started

### Prerequisites

To use the NotionGAS, you need the following:

1. A Notion integration token.
2. Google Apps Script environment.

### Integration

```javascript
// Include the Notion API library
const TOKEN = 'your_notion_integration_token';
const notion = new NotionV1(TOKEN);

// Create a Notion database instance
const tasks = database(notion, 'database-id');
```

## Class: `Database`

### Constructor

```javascript
const tasks = new Database(notion, 'database-id');
```

Creates a new `Database` instance.

- `notion`: Notion API instance.
- `database`: Notion database ID or name.

### Methods

#### `schema()`

```javascript
const properties = tasks.schema();
```

Retrieves the schema (properties) of the Notion database.

#### `typeOfProperty(property)`

```javascript
const propertyType = tasks.typeOfProperty('task');
```

Gets the type of a specific property in the database schema.

#### `property(name, value)`

```javascript
const formattedProperty = tasks.property('task', 'Complete task');
```

Formats a property based on its type.

#### `create(page)`

```javascript
const newPage = tasks.create({ task: 'New Task', due_date: '2023-12-31' });
```

Creates a new page in the database with the provided properties.

#### `update(page_id, properties)`

```javascript
const updatedPage = tasks.update('page_id', { task: 'Updated Task' });
```

Updates an existing page in the database.

#### `delete(page_id)`

```javascript
tasks.delete('page_id');
```

Deletes a page from the database.

#### `mapFilter(filters)`

```javascript
const filter = tasks.mapFilter({
  task: { equals: 'New Task' },
  done: { equals: false }
});
```

Maps filter criteria to Notion API filter format.

#### `findById(id)`

```javascript
const page = tasks.findById('page_id');
```

Finds a database page by ID.

#### `findFirstById(id)`

```javascript
const page = tasks.findFirstById('page_id');
```

Finds the first database page by ID.

#### `findAll(filters)`

```javascript
const allPages = tasks.findAll({
  task: { contains: 'Task' },
  done: { equals: true }
});
```

Finds all pages in the database based on filter criteria.

#### `findAllAndSort(filters, sorts)`

```javascript
const sortedPages = tasks.findAllAndSort(
  { task: { contains: 'Task' } },
  { property: 'due_date', direction: 'ascending' }
);
```

Finds and sorts all pages in the database.

#### `to_csv(columns, params)`

```javascript
const csvData = tasks.to_csv(['task', 'due_date'], { done: { equals: false } });
```

Exports database content to CSV with optional column selection and filter parameters.

#### `to_csv_custom(columns, params)`

```javascript
const csvData = tasks.to_csv_custom(['task', 'due_date'], { done: { equals: false } });
```

Exports database content to CSV with custom export parameters.

## Example Usage

```javascript
// Example: Creating, updating, and deleting a task
const newTask = tasks.create({ task: 'New Task', due_date: '2023-12-31' });
newTask.update({ task: 'Updated Task' });
newTask.delete();
```