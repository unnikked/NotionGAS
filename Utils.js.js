const ucFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const snakeToCamel = (str) => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

const camelToSnake = (str) => str.replace(/[A-Z]/g, (c) => {return '_' + c.toLowerCase()});