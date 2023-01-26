const bcrypt = require("bcrypt");

const saltRounds = 10;
// Create password hashing function below:
const passwordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.log(err);
  }
  return null;
};

// Create your password comparison function below:
const comparePasswords = async (password, hash) => {
  console.log(password);
  console.log(hash);
  try {
    const matchFound = await bcrypt.compare(password, hash);
    return matchFound;
  } catch (err) {
    console.log(err);
  }
  return false;
};

module.exports = { passwordHash, comparePasswords };
