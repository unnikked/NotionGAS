/*
 * Filters describe conditions on page property values to include in the results from a database query.
 * 
 * A filter can be a database property filter or it can be a compound filter formed by joining two database 
 * property filters using a logical and or or operation. Compound filters can be nested up to two levels deep.
 * 
 *  https://developers.notion.com/reference/post-database-query#post-database-query-filter
 */

// PRIMITIVES

/* function filterEquals(property, type, value) {
  return {
    property: property,
    [type]: {
      equals: value
    }
  };
} */

// Title filter condition
/*
 * A text filter condition applies to database properties of types "title", "rich_text", "url", "email", and "phone_number".
 */

const textFilterConditions = [
  'equals',
  'does_not_equal',
  'contains',
  'does_not_contain',
  'starts_with',
  'ends_with',
  'is_empty',
  'is_not_empty'
];

const numberFilterConditions = [
  'equals',
  'does_not_equal',
  'greater_than',
  'less_than',
  'greater_than_or_equal_to',
  'less_than_or_equal_to',
  'is_empty',
  'is_not_empty'
];

const checkboxFilterConditions = [
  'equals',
  'does_not_equal'
];

const selectFilterConditions = [
  'equals',
  'does_not_equal',
  'is_empty',
  'is_not_empty'
];

const statusFilterConditions = [
  'equals',
  'does_not_equal',
  'is_empty',
  'is_not_empty'
];

const multiSelectFilterConditions = [
  'contains',
  'does_not_contain',
  'is_empty',
  'is_not_empty'
];

const dateFilterConditions = [
  'equals',
  'before',
  'after',
  'on_or_before',
  'is_empty',
  'is_not_empty',
  'on_or_after',
  'past_week',
  'past_month', 
  'past_year', 
  'next_week', 
  'next_month',
  'next_year'
];

const peopleFilterCondition = [
  'contains',
  'does_not_contain',
  'is_empty',
  'is_not_empty'
];

const filesFilterCondition = [
  'is_empty',
  'is_not_empty'
];

const relationFilterCondition = [
  'contains',
  'does_not_contain',
  'is_empty',
  'is_not_empty'
];

const rollupFilterCondition = [
  'any',
  'every',
  'none',
  'number',
  'date'
];

const formulaFilterCondition = [
  'string',
  'checkbox',
  'number',
  'date'
];

const validOperationOnFilter = {
  title: textFilterConditions,
  rich_text: textFilterConditions,
  url: textFilterConditions,
  email: textFilterConditions,
  phone_numer: textFilterConditions,
  number: numberFilterConditions,
  checkbox: checkboxFilterConditions,
  select: selectFilterConditions,
  status: statusFilterConditions,
  multi_select: multiSelectFilterConditions,
  date: dateFilterConditions,
  created_time: dateFilterConditions,
  last_edited_time: dateFilterConditions,
  people: peopleFilterCondition,
  created_by: peopleFilterCondition,
  last_edited_by: peopleFilterCondition,
  files: filesFilterCondition,
  relation: relationFilterCondition,
  rollup: rollupFilterCondition,
  formula: formulaFilterCondition
};

function testGetFilter() {
  console.log(getFilter('status', 'contains', 'task', 'hello'));
}

function getFilter(property_type, operation, property, value) {

  if (validOperationOnFilter[property_type].includes(operation)) {

    let func = eval('filter' + ucFirst(snakeToCamel(property_type)) + ucFirst(snakeToCamel(operation)));

    return func(property, value);
  }

  throw 'Unsupported operation ' + operation + ' on property ' + property + ' of type ' + property_type;

}

// TITLE
/**
 * Only return pages where the page property value matches the provided value exactly.
 * @param {string} property	
 * @param {string} value
 */
function filterTitleEquals(property, value) {
  return {
    property: property,
    title: {
      equals: value
    }
  };
}


/**
 * Only return pages where the page property value does not match the provided value exactly.	
 * @param {string}
 * @param {string}
 */
function filterTitleDoesNotEqual(property, value) {
  return {
    property: property,
    title: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value contains the provided value.	
 * @param {string}
 * @param {string}
 */
function filterTitleContains(property, value) {
  return {
    property: property,
    title: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not contain the provided value.		
 * @param {string}
 * @param {string}
 */
function filterTitleDoesNotContain(property, value) {
  return {
    property: property,
    title: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value starts with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterTitleStartsWith(property, value) {
  return {
    property: property,
    title: {
      starts_with: value
    }
  };
}

/**
 * Only return pages where the page property value ends with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterTitleEndsWith(property, value) {
  return {
    property: property,
    title: {
      ends_with: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterTitleIsEmpty(property, value) {
  return {
    property: property,
    title: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterTitleIsNotEmpty(property, value) {
  return {
    property: property,
    title: {
      is_not_empty: value
    }
  };
}

// rich_text
/**
 * Only return pages where the page property value matches the provided value exactly.
 * @param {string} property	
 * @param {string} value
 */
function filterRichTextEquals(property, value) {
  return {
    property: property,
    rich_text: {
      equals: value
    }
  };
}


/**
 * Only return pages where the page property value does not match the provided value exactly.	
 * @param {string}
 * @param {string}
 */
function filterRichTextDoesNotEqual(property, value) {
  return {
    property: property,
    rich_text: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value contains the provided value.	
 * @param {string}
 * @param {string}
 */
function filterRichTextContains(property, value) {
  return {
    property: property,
    rich_text: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not contain the provided value.		
 * @param {string}
 * @param {string}
 */
function filterRichTextDoesNotContain(property, value) {
  return {
    property: property,
    rich_text: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value starts with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterRichTextStartsWith(property, value) {
  return {
    property: property,
    rich_text: {
      starts_with: value
    }
  };
}

/**
 * Only return pages where the page property value ends with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterRichTextEndsWith(property, value) {
  return {
    property: property,
    rich_text: {
      ends_with: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterRichTextIsEmpty(property, value) {
  return {
    property: property,
    rich_text: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterRichTextIsNotEmpty(property, value) {
  return {
    property: property,
    rich_text: {
      is_not_empty: value
    }
  };
}

// url
/**
 * Only return pages where the page property value matches the provided value exactly.
 * @param {string} property	
 * @param {string} value
 */
function filterUrlEquals(property, value) {
  return {
    property: property,
    url: {
      equals: value
    }
  };
}


/**
 * Only return pages where the page property value does not match the provided value exactly.	
 * @param {string}
 * @param {string}
 */
function filterUrlDoesNotEqual(property, value) {
  return {
    property: property,
    url: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value contains the provided value.	
 * @param {string}
 * @param {string}
 */
function filterUrlContains(property, value) {
  return {
    property: property,
    url: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not contain the provided value.		
 * @param {string}
 * @param {string}
 */
function filterUrlDoesNotContain(property, value) {
  return {
    property: property,
    url: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value starts with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterUrlStartsWith(property, value) {
  return {
    property: property,
    url: {
      starts_with: value
    }
  };
}

/**
 * Only return pages where the page property value ends with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterUrlEndsWith(property, value) {
  return {
    property: property,
    url: {
      ends_with: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterUrlIsEmpty(property, value) {
  return {
    property: property,
    url: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterUrlIsNotEmpty(property, value) {
  return {
    property: property,
    url: {
      is_not_empty: value
    }
  };
}

// email
/**
 * Only return pages where the page property value matches the provided value exactly.
 * @param {string} property	
 * @param {string} value
 */
function filterEmailEquals(property, value) {
  return {
    property: property,
    email: {
      equals: value
    }
  };
}


/**
 * Only return pages where the page property value does not match the provided value exactly.	
 * @param {string}
 * @param {string}
 */
function filterEmailDoesNotEqual(property, value) {
  return {
    property: property,
    email: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value contains the provided value.	
 * @param {string}
 * @param {string}
 */
function filterEmailContains(property, value) {
  return {
    property: property,
    email: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not contain the provided value.		
 * @param {string}
 * @param {string}
 */
function filterEmailDoesNotContain(property, value) {
  return {
    property: property,
    email: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value starts with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterEmailStartsWith(property, value) {
  return {
    property: property,
    email: {
      starts_with: value
    }
  };
}

/**
 * Only return pages where the page property value ends with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterEmailEndsWith(property, value) {
  return {
    property: property,
    email: {
      ends_with: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterEmailIsEmpty(property, value) {
  return {
    property: property,
    email: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterEmailIsNotEmpty(property, value) {
  return {
    property: property,
    email: {
      is_not_empty: value
    }
  };
}

// phone_number
/**
 * Only return pages where the page property value matches the provided value exactly.
 * @param {string} property	
 * @param {string} value
 */
function filterPhoneNumberEquals(property, value) {
  return {
    property: property,
    phone_number: {
      equals: value
    }
  };
}


/**
 * Only return pages where the page property value does not match the provided value exactly.	
 * @param {string}
 * @param {string}
 */
function filterPhoneNumberDoesNotEqual(property, value) {
  return {
    property: property,
    phone_number: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value contains the provided value.	
 * @param {string}
 * @param {string}
 */
function filterPhoneNumberContains(property, value) {
  return {
    property: property,
    phone_number: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not contain the provided value.		
 * @param {string}
 * @param {string}
 */
function filterPhoneNumberDoesNotContain(property, value) {
  return {
    property: property,
    phone_number: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value starts with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterPhoneNumberStartsWith(property, value) {
  return {
    property: property,
    phone_number: {
      starts_with: value
    }
  };
}

/**
 * Only return pages where the page property value ends with the provided value.			
 * @param {string}
 * @param {string}
 */
function filterPhoneNumberEndsWith(property, value) {
  return {
    property: property,
    phone_number: {
      ends_with: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterPhoneNumberIsEmpty(property, value) {
  return {
    property: property,
    phone_number: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterPhoneNumberIsNotEmpty(property, value) {
  return {
    property: property,
    phone_number: {
      is_not_empty: value
    }
  };
}

// Number filter condition

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {numeric}
 */
function filterNumberEquals(property, value) {
  return {
    property: property,
    number: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {numeric}
 */
function filterNumberDoesNotEqual(property, value) {
  return {
    property: property,
    number: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value is greater than the provided value.		
 * @param {string}
 * @param {numeric}
 */
function filterNumberGreaterThan(property, value) {
  return {
    property: property,
    number: {
      greater_than: value
    }
  };
}

/**
 * Only return pages where the page property value is less than the provided value.		
 * @param {string}
 * @param {numeric}
 */
function filterNumberLessThan(property, value) {
  return {
    property: property,
    number: {
      less_than: value
    }
  };
}

/**
 * Only return pages where the page property value is greater than or equal to the provided value.			
 * @param {string}
 * @param {numeric}
 */
function filterNumberGreaterThanOrEqualToThan(property, value) {
  return {
    property: property,
    number: {
      greater_than_or_equal_to: value
    }
  };
}

/**
 * Only return pages where the page property value is less than or equal to the provided value.			
 * @param {string}
 * @param {numeric}
 */
function filterNumberLessThanOrEqualToThan(property, value) {
  return {
    property: property,
    number: {
      less_than_or_equal_to: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterNumberIsEmpty(property, value) {
  return {
    property: property,
    number: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterNumberIsNotEmpty(property, value) {
  return {
    property: property,
    number: {
      is_not_empty: value
    }
  };
}


// Checkbox filter condition
/*
 * A checkbox filter condition applies to database properties of type "checkbox".
 */

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {boolean}
 */
function filterCheckboxEquals(property, value) {
  return {
    property: property,
    checkbox: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {boolean}
 */
function filterCheckboxDoesNotEqual(property, value) {
  return {
    property: property,
    checkbox: {
      does_not_equal: value
    }
  };
}

// Select filter condition
/*
 * A select filter condition applies to database properties of type "select".
 */

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterSelectEquals(property, value) {
  return {
    property: property,
    select: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterSelectDoesNotEqual(property, value) {
  return {
    property: property,
    select: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterSelectIsEmpty(property, value) {
  return {
    property: property,
    select: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterSelectIsNotEmpty(property, value) {
  return {
    property: property,
    select: {
      is_not_empty: value
    }
  };
}

// Status filter condition
/*
 * A status filter condition applies to database properties of type "status".
 */

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterStatusEquals(property, value) {
  return {
    property: property,
    status: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterStatusDoesNotEqual(property, value) {
  return {
    property: property,
    status: {
      does_not_equal: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterStatusIsEmpty(property, value) {
  return {
    property: property,
    status: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterStatusIsNotEmpty(property, value) {
  return {
    property: property,
    status: {
      is_not_empty: value
    }
  };
}

// Multi-select filter condition
/*
 * A multi-select filter condition applies to database properties of type "multi_select".
 */

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterMultiSelectContains(property, value) {
  return {
    property: property,
    multi_select: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterMultiSelectDoesNotContain(property, value) {
  return {
    property: property,
    multi_select: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterMultiSelectIsEmpty(property, value) {
  return {
    property: property,
    multi_select: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterMultiSelectIsNotEmpty(property, value) {
  return {
    property: property,
    multi_select: {
      is_not_empty: value
    }
  };
}

// Date filter condition
/*
 * A date filter condition applies to database properties of types "date", "created_time", and "last_edited_time".
 */

/**
 * Only return pages where the page property value matches the provided date exactly.
 * 
 * If a date is provided, the comparison is done against the start and end of the UTC date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateEquals(property, value) {
  return {
    property: property,
    date: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value matches tomorrow time.
 * 
 * If a date is provided, the comparison is done against the start and end of the UTC date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string} date to filter
 */
function filterDateIsTomorrow(property) {
  return filterDateEquals(property, getTomorrow());
}

function getTomorrow() {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  let tomorrow = new Date(today.valueOf() + 86400000);

  return Utilities.formatDate(tomorrow, 'Europe/Rome', "yyyy-MM-dd");
}

/**
 * Only return pages where the page property value is before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateBefore(property, value) {
  return {
    property: property,
    date: {
      before: value
    }
  };
}

/**
 * Only return pages where the page property value is after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateAfter(property, value) {
  return {
    property: property,
    date: {
      after: value
    }
  };
}

/**
 * Only return pages where the page property value is on or before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateOnOrBefore(property, value) {
  return {
    property: property,
    date: {
      on_or_before: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterDateIsEmpty(property, value) {
  return {
    property: property,
    date: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterDateIsNotEmpty(property, value) {
  return {
    property: property,
    date: {
      is_not_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is on or after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateOnOrAfter(property, value) {
  return {
    property: property,
    date: {
      on_or_after: value
    }
  };
}

/**
 * Only return pages where the page property value is within the past week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDatePastWeek(property) {
  return {
    property: property,
    date: {
      past_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past month.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDatePastMonth(property) {
  return {
    property: property,
    date: {
      past_month: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDatePastYear(property) {
  return {
    property: property,
    date: {
      past_year: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateNextWeek(property) {
  return {
    property: property,
    date: {
      next_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next month.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateNextMonth(property) {
  return {
    property: property,
    date: {
      next_month: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterDateNextYear(property) {
  return {
    property: property,
    date: {
      next_year: {}
    }
  };
}

// created_time
/**
 * Only return pages where the page property value matches the provided date exactly.
 * 
 * If a date is provided, the comparison is done against the start and end of the UTC date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeEquals(property, value) {
  return {
    property: property,
    created_time: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value is before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeBefore(property, value) {
  return {
    property: property,
    created_time: {
      before: value
    }
  };
}

/**
 * Only return pages where the page property value is after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeAfter(property, value) {
  return {
    property: property,
    created_time: {
      after: value
    }
  };
}

/**
 * Only return pages where the page property value is on or before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeOnOrBefore(property, value) {
  return {
    property: property,
    created_time: {
      on_or_before: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterCreatedTimeIsEmpty(property, value) {
  return {
    property: property,
    created_time: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterCreatedTimeIsNotEmpty(property, value) {
  return {
    property: property,
    created_time: {
      is_not_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is on or after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeOnOrAfter(property, value) {
  return {
    property: property,
    created_time: {
      on_or_after: value
    }
  };
}

/**
 * Only return pages where the page property value is within the past week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimePastWeek(property) {
  return {
    property: property,
    created_time: {
      past_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimePastYear(property) {
  return {
    property: property,
    created_time: {
      past_year: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimePastYear(property) {
  return {
    property: property,
    created_time: {
      past_year: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeNextWeek(property) {
  return {
    property: property,
    created_time: {
      next_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next month.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeNextMonth(property) {
  return {
    property: property,
    created_time: {
      next_month: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterCreatedTimeNextYear(property) {
  return {
    property: property,
    created_time: {
      next_year: {}
    }
  };
}

// last_edited_time
/**
 * Only return pages where the page property value matches the provided date exactly.
 * 
 * If a date is provided, the comparison is done against the start and end of the UTC date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeEquals(property, value) {
  return {
    property: property,
    last_edited_time: {
      equals: value
    }
  };
}

/**
 * Only return pages where the page property value is before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeBefore(property, value) {
  return {
    property: property,
    last_edited_time: {
      before: value
    }
  };
}

/**
 * Only return pages where the page property value is after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeAfter(property, value) {
  return {
    property: property,
    last_edited_time: {
      after: value
    }
  };
}

/**
 * Only return pages where the page property value is on or before the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeOnOrBefore(property, value) {
  return {
    property: property,
    last_edited_time: {
      on_or_before: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterLastEditedTimeIsEmpty(property, value) {
  return {
    property: property,
    last_edited_time: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterLastEditedTimeIsNotEmpty(property, value) {
  return {
    property: property,
    last_edited_time: {
      is_not_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is on or after the provided date.
 * 
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * 
 * Note that if no timezone is provided, the default is UTC.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeOnOrAfter(property, value) {
  return {
    property: property,
    last_edited_time: {
      on_or_after: value
    }
  };
}

/**
 * Only return pages where the page property value is within the past week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimePastWeek(property) {
  return {
    property: property,
    last_edited_time: {
      past_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimePastYear(property) {
  return {
    property: property,
    last_edited_time: {
      past_year: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the past year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimePastYear(property) {
  return {
    property: property,
    last_edited_time: {
      past_year: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next week.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeNextWeek(property) {
  return {
    property: property,
    last_edited_time: {
      next_week: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next month.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeNextMonth(property) {
  return {
    property: property,
    last_edited_time: {
      next_month: {}
    }
  };
}

/**
 * Only return pages where the page property value is within the next year.		
 * 
 * @param {string}
 * @param {string}
 */
function filterLastEditedTimeNextYear(property) {
  return {
    property: property,
    last_edited_time: {
      next_year: {}
    }
  };
}

// People filter condition
/*
 * A people filter condition applies to database properties of types "people", "created_by", and "last_edited_by".
 */

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterPeopleContains(property, value) {
  return {
    property: property,
    people: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterPeopleDoesNotContain(property, value) {
  return {
    property: property,
    people: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterPeopleIsEmpty(property, value) {
  return {
    property: property,
    people: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterPeopleIsNotEmpty(property, value) {
  return {
    property: property,
    people: {
      is_not_empty: value
    }
  };
}

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterCreatedByContains(property, value) {
  return {
    property: property,
    created_by: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterCreatedByDoesNotContain(property, value) {
  return {
    property: property,
    created_by: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterCreatedByIsEmpty(property, value) {
  return {
    property: property,
    created_by: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterCreatedByIsNotEmpty(property, value) {
  return {
    property: property,
    created_by: {
      is_not_empty: value
    }
  };
}

/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterLastEditedByContains(property, value) {
  return {
    property: property,
    last_edited_by: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterLastEditedByDoesNotContain(property, value) {
  return {
    property: property,
    last_edited_by: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterLastEditedByIsEmpty(property, value) {
  return {
    property: property,
    last_edited_by: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterLastEditedByIsNotEmpty(property, value) {
  return {
    property: property,
    last_edited_by: {
      is_not_empty: value
    }
  };
}


// Files filter condition
/*
 * A people filter condition applies to database properties of type "files".
 */

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterFilesIsEmpty(property, value) {
  return {
    property: property,
    files: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterFilesIsNotEmpty(property, value) {
  return {
    property: property,
    files: {
      is_not_empty: value
    }
  };
}

// Relation filter condition
/*
 * A relation filter condition applies to database properties of type "relation".
 */
/**
 * Only return pages where the page property value matches the provided value exactly.		
 * @param {string}
 * @param {string}
 */
function filterRelationContains(property, value) {
  return {
    property: property,
    relation: {
      contains: value
    }
  };
}

/**
 * Only return pages where the page property value does not match the provided value exactly.			
 * @param {string}
 * @param {string}
 */
function filterRelationDoesNotContain(property, value) {
  return {
    property: property,
    relation: {
      does_not_contain: value
    }
  };
}

/**
 * Only return pages where the page property value is empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterRelationIsEmpty(property, value) {
  return {
    property: property,
    relation: {
      is_empty: value
    }
  };
}

/**
 * Only return pages where the page property value is not empty.			
 * @param {string}
 * @param {boolean} value (only true) 
 */
function filterRelationIsNotEmpty(property, value) {
  return {
    property: property,
    relation: {
      is_not_empty: value
    }
  };
}

// Formula filter condition

let example = {
  property: 'formula_field',
  formula: {
    title: {
      equals: "..."
    }
  }
};

// Compound filters
// A compound filter object combines several database property filters together. 
// A compound filter can even be combined within a compound filter, but only up to 
// two nesting levels deep.

/**
 * Returns pages when <b>any</b> of the filters inside the provided array match.
 * @param {array} array of database property filters or compound filters.
 */
function filterOr() {
  return {
    or: [...arguments]
  }
}

/**
 * Returns pages when <b>all</b> of the filters inside the provided array match.
 * @param {array} array of database property filters or compound filters.
 */
function filterAnd() {
  return {
    and: [...arguments]
  }
}

// Sort object
/**
 * Sort objects describe the order of database query results. 
 * 
 * The Query a database endpoint accepts an array of sort objects in the sorts body parameter. 
 * 
 * In the array, the lower index object takes precedence.
 * 
 * @param {string} property - The name of the property to sort against.
 * @param {string} timestamp - The name of the timestamp to sort against. Possible values include "created_time" and "last_edited_time".
 * @param {string} direction - The direction to sort. Possible values include "ascending" and "descending".
 */
function sort(property, timestamp, direction) {
  return {
    property: property,
    timestamp: timestamp,
    direction: direction
  };
}

function sortByCreatedTimeAcending(property) {
  return sort(property, "created_time", "ascending");
}

function sortByCreatedTimeDescending(property) {
  return sort(property, "created_time", "descending");
}

function sortByLastEditedTimeAcending(property) {
  return sort(property, "last_edited_time", "ascending");
}

function sortByLastEditedTimeDescending(property) {
  return sort(property, "last_edited_time", "descending");
}
