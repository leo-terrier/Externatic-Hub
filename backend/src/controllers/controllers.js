const {
  getCandidates,
  getOffers,
  getEntreprises,
  getOfferById,
} = require("../models/models");

const allCandidates = async (req, res) => {
  const candidates = await getCandidates();
  if (!candidates.length) return res.sendStatus(404);
  return res.send(candidates);
};

const allOffers = async (req, res) => {
  const offers = await getOffers();
  if (!offers.length) return res.sendStatus(404);
  return res.send(offers);
};

const offerById = async (req, res) => {
  const { id } = req.params;
  const [offer] = await getOfferById(id);
  if (!offer) return res.sendStatus(404);
  return res.send(offer);
};

const allEntreprises = async (req, res) => {
  const entreprises = await getEntreprises();
  if (!entreprises.length) return res.sendStatus(404);
  return res.send(entreprises);
};

module.exports = { allCandidates, allOffers, allEntreprises, offerById };
