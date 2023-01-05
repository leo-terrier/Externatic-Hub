const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const whereClause = (str) => {
  const regex = /WHERE (.*)(?= LIMIT)/;
  const match = str.match(regex);
  console.log(str);
  return match ? match[0] : "";
};

module.exports = { camelToSnakeCase, whereClause };
