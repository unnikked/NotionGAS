class Paginator {
  constructor(notion, endpoint, results, next_cursor, has_more, page_size) {
    this.notion = notion;
    this.endpoint = endpoint;
    this.results = results;
    this.next_cursor = next_cursor;
    this.has_more = has_more;
    this.page_size = page_size;
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    return {
      next: () => {
        if (this.has_more) {
          let cached = this.results;

          let response = this.notion.request('GET', this.endpoint, {
            start_cursor: this.next_cursor,
            page_size: this.page_size
          })

          this.results = response.results;
          this.start_cursor = response.next_cursor;
          this.has_more = response.has_more;

          return {value: cached, done: false}
        } else if (this.results.lenght > 0 && !this.has_more) {
            
        } else {
          return {value: this.results, done: true}
        }
      }
    }
  }

  request(params) {

  }
}