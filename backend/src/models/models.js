const { whereClause } = require("../utils");
const { database } = require("./index");
const { queries } = require("./queries");

// Users
const getUsers = async () => {
  const [users] = await database.query(queries.getUsers);
  return users;
};

const getUserById = async (id) => {
  const [user] = await database.query(queries.getUserById, [id]);
  return user;
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

// OFFERS

// // GET
const getOffers = async (obj) => {
  const [query, parameters] = queries.getOffers(obj);
  console.log(database.format(query, parameters));
  const [offers] = await database.query(query, parameters);
  // const isFilters = Object.keys(obj).filter(elt => elt !== "orderBy" && elt !== "limit").length > 2;
  const [offerCount] = await database.query(
    queries.getNumberOfOffers(whereClause(query)),
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
const getEntreprises = async () => {
  const [entreprises] = await database.query(queries.getEntreprises);
  return entreprises;
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
  getUserSearchPreferences,
  getUserPropositions,
  getUserFavorites,
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
