const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const whereClause = (str) => {
  // Extract query from "WHERE" and UP to ORDER BY / LIMIT
  const regex = /WHERE (.*?)(?= ORDER BY|LIMIT)/;
  const match = str.match(regex);
  console.log(str);
  return match ? match[0] : "";
};

module.exports = { camelToSnakeCase, whereClause };
