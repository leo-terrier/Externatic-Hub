const { database } = require("./index");

// OFFERS
const getOffers = async () => {
  const [offers] = await database.query(
    "SELECT t1.id, t1.title, t1.city, t1.stack, t1.max_compensation, t1.min_compensation, t1.remote_days, t1.job_field, t1.education, t1.status, t2.firstname as contact_firstname, t2.lastname as contact_lastname, t2.email as contact_email, t3.firstname as consultant_firstname, t3.lastname as consultant_lastname FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprise_contacts t2 ON t1.entreprise_contact_id = t2.id"
  );
  return offers;
};

const getOfferById = async (id) => {
  const [offer] = await database.query(
    "SELECT t1.id, t1.title, t1.city, t1.stack, t1.max_compensation, t1.min_compensation, t1.remote_days, t1.job_field, t1.education, t1.status, t2.firstname as contact_firstname, t2.lastname as contact_lastname, t2.email as contact_email, t3.firstname as consultant_firstname, t3.lastname as consultant_lastname FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprise_contacts t2 ON t1.entreprise_contact_id = t2.id WHERE t1.id = ?",
    [id]
  );
  return offer;
};

// CANDIDATES
const getCandidates = async () => {
  const [candidates] = await database.query("SELECT * FROM candidates");
  return candidates;
};

const getCandidateById = async (id) => {
  const [candidates] = await database.query(
    "SELECT * FROM candidates WHERE id = ?",
    [id]
  );
  return candidates;
};

// ENTREPRISES
const getEntreprises = async () => {
  const [entreprises] = await database.query("SELECT * FROM entreprises");
  return entreprises;
};

const getEntrepriseById = async (id) => {
  const [entreprises] = await database.query(
    "SELECT * FROM entreprises WHERE id = ?",
    [id]
  );
  return entreprises;
};

module.exports = {
  getOffers,
  getCandidates,
  getEntreprises,
  getOfferById,
  getCandidateById,
  getEntrepriseById,
};
