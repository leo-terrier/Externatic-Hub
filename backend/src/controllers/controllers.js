const { passwordHash } = require("../bcrypt");
const {
  getOffers,
  getOfferPropositions,
  getOfferById,
  getUsers,
  getUserById,
  getUserSearchPreferences,
  getUserPropositions,
  getUserFavorites,
  registerUser,
  modifyUserInfoById,
  getEntreprises,
  getEntrepriseById,
  getEntrepriseOffers,
  getEntrepriseContacts,
  createEntreprise,
  createEntrepriseContact,
  getPropositionById,
  getPropositionMessages,
  getPropositionInterviews,
  createOffer,
  modifyUserSearchPreferencesById,
  getUserResume,
  modifyUserResume,
} = require("../models/models");

// Users

// // GET

const retreiveUserSession = (req, res) => {
  console.log("req.user retreive");
  console.log(req.user);
  if (req.user) {
    res.send(req.user[0]);
  } else {
    res.status(404).send("user not found");
  }
};

const allUsers = async (req, res) => {
  const users = await getUsers(req.query);
  // if (!users.length) return res.sendStatus(404);
  return res.send(users);
};

const userById = async (req, res) => {
  const { id } = req.params;
  const [user] = await getUserById(id);
  if (!user) return res.sendStatus(404);
  return res.send(user);
};

const userSearchPreferences = async (req, res) => {
  const { id } = req.params;
  const [preferences] = await getUserSearchPreferences(id);
  if (!preferences) return res.sendStatus(404);
  return res.send(preferences);
};

const userPropositions = async (req, res) => {
  const { id } = req.params;
  const propositions = await getUserPropositions(id);
  if (!propositions.length) return res.sendStatus(404);
  return res.send(propositions);
};
const userFavorites = async (req, res) => {
  const { id } = req.params;
  const favorites = await getUserFavorites(id);
  if (!favorites.length) return res.send([]);
  return res.send(favorites);
};

const userResume = async (req, res) => {
  const { id } = req.params;
  const resume = await getUserResume(id);
  return res.send(resume);
};

// // POST
const userRegistration = async (req, res) => {
  const { email, password } = req.body;
  const hash = await passwordHash(password);
  const user = await registerUser(email, hash);
  return res.send(user);
};

// // PUT
const userModifyInfo = async (req, res) => {
  console.log("modifyInfo req.user");
  console.log(req.user);
  if (req.user) {
    const user = await modifyUserInfoById(req.body);
    return res.send(user);
  }
  return res.status("401").send("user not authenticated");
};

const userModifySearchPreferences = async (req, res) => {
  if (req.user) {
    const preferences = await modifyUserSearchPreferencesById(req.body);
    return res.send(preferences);
  }
  return res.status("401").send("user not authenticated");
};

const userModifyResume = async (req, res) => {
  if (req.user) {
    const resume = await modifyUserResume(req.body);
    return res.send(resume);
  }
  return res.status("401").send("user not authenticated");
};

// Offers

// // GET
const allOffers = async (req, res) => {
  console.log("req.user");
  console.log(req.user);
  const offers = await getOffers(req.query);
  // if (!offers.length) return res.sendStatus(404);
  return res.send(offers);
};

const offerById = async (req, res) => {
  const { id } = req.params;
  const [offer] = await getOfferById(id);
  if (!offer) return res.sendStatus(404);
  return res.send(offer);
};

const offerPropositions = async (req, res) => {
  const { id } = req.params;
  const propositions = await getOfferPropositions(id);
  if (!propositions.length) return res.sendStatus(404);
  return res.send(propositions);
};

// // POST
const addOffer = async (req, res) => {
  const id = await createOffer(req.body);
  if (!id) return res.sendStatus(400);
  return res.status(201).json(id);
};

// // Entreprises

// GET
const allEntreprises = async (req, res) => {
  const entreprises = await getEntreprises(req.query);
  // if (!entreprises.length) return res.sendStatus(404);
  return res.send(entreprises);
};

const entrepriseById = async (req, res) => {
  const { id } = req.params;
  const [entreprise] = await getEntrepriseById(id);
  if (!entreprise) return res.sendStatus(404);
  return res.send(entreprise);
};

const entrepriseOffers = async (req, res) => {
  const { id } = req.params;
  const offers = await getEntrepriseOffers(id);
  // if (!offers.length) return res.sendStatus(404);
  return res.send(offers);
};

const entrepriseContacts = async (req, res) => {
  const { id } = req.params;
  const contacts = await getEntrepriseContacts(id);
  // if (!contacts.length) return res.sendStatus(404);
  return res.send(contacts);
};

// POST
const addEntreprise = async (req, res) => {
  const id = await createEntreprise(req.body);
  if (!id) return res.sendStatus(400);
  return res.status(201).json(id);
};

const addEntrepriseContact = async (req, res) => {
  const id = await createEntrepriseContact(req.body);
  if (!id) return res.sendStatus(400);
  return res.json(id);
};

// Propositions

const propositionById = async (req, res) => {
  const { id } = req.params;
  const [proposition] = await getPropositionById(id);
  if (!proposition) return res.sendStatus(404);
  return res.send(proposition);
};

const propositionMessages = async (req, res) => {
  const { id } = req.params;
  const messages = await getPropositionMessages(id);
  if (!messages.length) return res.sendStatus(404);
  return res.send(messages);
};

const propositionInterviews = async (req, res) => {
  const { id } = req.params;
  const interviews = await getPropositionInterviews(id);
  if (!interviews.length) return res.sendStatus(404);
  return res.send(interviews);
};

module.exports = {
  allOffers,
  offerPropositions,
  offerById,
  addOffer,
  retreiveUserSession,
  allUsers,
  userById,
  userSearchPreferences,
  userPropositions,
  userFavorites,
  userResume,
  userRegistration,
  userModifyInfo,
  userModifySearchPreferences,
  userModifyResume,
  allEntreprises,
  entrepriseById,
  entrepriseOffers,
  entrepriseContacts,
  addEntreprise,
  addEntrepriseContact,
  propositionById,
  propositionMessages,
  propositionInterviews,
};
