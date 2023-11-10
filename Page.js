/**
 * Helper class that lets you access page property data easly withouth much fuss
 */

function Page(page) {
  this.page = page;
}

Page.prototype.getId = function () {
  return this.page.id;
}

Page.prototype.property = function (property) {
  // console.log(property);
  // console.log(this.page['properties'][property].type)
  if (this.page['properties'][property]) {

    if (this.page['properties'][property].type == 'rich_text' && this.page['properties'][property]['rich_text'][0]) {
      return this.page['properties'][property]['rich_text'][0].plain_text;
    }

    if (this.page['properties'][property].type == 'title') {
      return this.page['properties'][property]['title'][0].plain_text;
    }

    if (this.page['properties'][property].type == 'number') {
      return this.page['properties'][property]['number'];
    }

    if (this.page['properties'][property].type == 'select') {
      return this.page['properties'][property]['select'].name;
    }

    if (this.page['properties'][property].type == 'multi_select') {
      return this.page['properties'][property]['multi_select'].map((e) => e.name);
    }

    if (this.page['properties'][property].type == 'status') {
      return this.page['properties'][property]['status']['name'];
    }

    if (this.page['properties'][property].type == 'checkbox') {
      return this.page['properties'][property]['checkbox'];
    }

    if (this.page['properties'][property].type == 'date') {
      if (this.page['properties'][property]['date'].end == null) {
        return this.page['properties'][property]['date'].start;
      } else {
        return this.page['properties'][property]['date'];
      }
    }

    if (this.page['properties'][property].type == 'formula') {
      return this.page['properties'][property]['formula'][this.page['properties'][property]['formula'].type];
    }

    if (this.page['properties'][property].type == 'last_edited_time') {
      return this.page['properties'][property]['last_edited_time'];
    }

    
  } else {
    return this.page['properties'][property];
  }
}
