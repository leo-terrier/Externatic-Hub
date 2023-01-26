const { comparePasswords } = require("../bcrypt");
const { database } = require("./index");
const { queries } = require("./queries");

// Users

// // GET
const getUsers = async (obj) => {
  const [query, parameters] = queries.getUsers(obj);
  const [users] = await database.query(query, parameters);
  const [userCount] = await database.query(
    queries.getNumberOfUsers(query),
    parameters
  );
  return [users, userCount];
};

const getUserById = async (id) => {
  const [user] = await database.query(queries.getUserById, [id]);
  return user;
};

const getUserByEmail = async (email, password, done) => {
  console.log(email);
  const [[user]] = await database.query(queries.getUserByEmail, [email]);
  console.log("user");
  console.log(user);
  if (!user) return done(null, false);
  const matchPassword = await comparePasswords(password, user.password);
  console.log("matchPassword");
  console.log(matchPassword);
  if (!matchPassword) return done(null, false);
  return done(null, user);
};

const getUserSearchPreferences = async (id) => {
  const [preferences] = await database.query(queries.getUserSearchPreferences, [
    id,
  ]);
  return preferences;
};

const getUserPropositions = async (id) => {
  const [propositions] = await database.query(queries.getUserPropositions, [
    id,
  ]);
  return propositions;
};
const getUserFavorites = async (id) => {
  const [favorites] = await database.query(queries.getUserFavorites, [id]);
  return favorites;
};

const getUserResume = async (id) => {
  const [resume] = await database.query(queries.getUserResume, [id]);
  return resume;
};

// // POST

const registerUser = async (email, hash) => {
  const user = await database.query(queries.registerUser, [email, hash]);
  console.log(user);
  return user;
};

// // PUT
const modifyUserInfoById = async (obj) => {
  console.log(obj);
  const user = await database.query(queries.modifyUserInfo, Object.values(obj));
  return user;
};

const modifyUserSearchPreferencesById = async (obj) => {
  const user = await database.query(
    queries.modifyUserSearchPreferences,
    Object.values(obj)
  );
  return user;
};

const modifyUserResume = async (obj) => {
  const resume = await database.query(
    queries.modifyUserResume,
    Object.values(obj)
  );
  return resume;
};

// OFFERS

// // GET
const getOffers = async (obj) => {
  const [query, parameters] = queries.getOffers(obj);
  console.log("///SELECT///");
  console.log(database.format(query, parameters));
  /* console.log('///COUNT///');
  console.log(database.format(queries.getNumberOfOffers(query), parameters)); */
  const [offers] = await database.query(query, parameters);
  // const isFilters = Object.keys(obj).filter(elt => elt !== "orderBy" && elt !== "limit").length > 2;
  const [offerCount] = await database.query(
    queries.getNumberOfOffers(query),
    parameters
  );
  return [offers, offerCount];
};

// ATT : include table entreprises

const getOfferById = async (id) => {
  const [offer] = await database.query(queries.getOfferById, [id]);
  return offer;
};

const getOfferPropositions = async (id) => {
  const [propositions] = await database.query(queries.getOfferPropositions, [
    id,
  ]);
  return propositions;
};

// // POST
const createOffer = async (obj) => {
  const [query, parameters] = queries.createOffer(obj);
  console.log(database.format(query, parameters));
  const response = await database.query(query, parameters);
  const id = response[0].insertId;
  return id;
};

// // ENTREPRISES

// GET

const getEntreprises = async (obj) => {
  const [query, parameters] = queries.getEntreprises(obj);
  console.log("///SELECT///");
  console.log(database.format(query, parameters));
  console.log("///COUNT///");
  console.log(
    database.format(queries.getNumberOfEntreprises(query), parameters)
  );
  const [entreprises] = await database.query(query, parameters);
  const [entrepriseCount] = await database.query(
    queries.getNumberOfEntreprises(query),
    parameters
  );
  return [entreprises, entrepriseCount];
};

const getEntrepriseById = async (id) => {
  const [entreprises] = await database.query(queries.getEntrepriseById, [id]);
  return entreprises;
};

const getEntrepriseOffers = async (id) => {
  const [offers] = await database.query(queries.getEntrepriseOffers, [id]);
  return offers;
};

const getEntrepriseContacts = async (id) => {
  const [contacts] = await database.query(queries.getEntrepriseContacts, [id]);
  return contacts;
};

// POST

const createEntreprise = async (obj) => {
  const response = await database.query(
    queries.createEntreprise,
    Object.values(obj)
  );
  const id = response[0].insertId;
  return id;
};

const createEntrepriseContact = async (obj) => {
  const response = await database.query(
    queries.createEntrepriseContact,
    Object.values(obj)
  );
  const id = response[0].insertId;
  return id;
};

// Propositions

const getPropositionById = async (id) => {
  const [proposition] = await database.query(queries.getPropositionById, [id]);
  console.log(database.format(queries.getPropositionById, [id]));
  return proposition;
};

const getPropositionMessages = async (id) => {
  const [messages] = await database.query(queries.getPropositionsMessages, [
    id,
  ]);
  return messages;
};

const getPropositionInterviews = async (id) => {
  const [interviews] = await database.query(queries.getPropositionInterviews, [
    id,
  ]);
  return interviews;
};

module.exports = {
  getOffers,
  getOfferById,
  getOfferPropositions,
  createOffer,
  getUsers,
  getUserById,
  getUserByEmail,
  getUserSearchPreferences,
  getUserPropositions,
  getUserFavorites,
  getUserResume,
  registerUser,
  modifyUserInfoById,
  modifyUserSearchPreferencesById,
  modifyUserResume,
  getEntreprises,
  getEntrepriseById,
  getEntrepriseOffers,
  getEntrepriseContacts,
  createEntreprise,
  createEntrepriseContact,
  getPropositionById,
  getPropositionMessages,
  getPropositionInterviews,
};
