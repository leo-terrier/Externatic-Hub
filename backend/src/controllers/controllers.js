const { database } = require("../models");

const getOffers = (req, res) => {
  database
    .query(
      "SELECT t1.title, t1.city, t1.stack, t1.max_compensation, t1.min_compensation, t1.remote_days, t1.job_field, t1.education, t1.status, t2.firstname as contact_firstname, t2.lastname as contact_lastname, t2.email as contact_email, t3.firstname as consultant_firstname, t3.lastname as consultant_lastname FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprise_contacts t2 ON t1.entreprise_contact_id = t2.id"
    )
    .then(([offers]) => {
      res.send(offers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const getCandidates = (req, res) => {
  database
    .query("SELECT * FROM candidates")
    .then(([candidates]) => {
      res.send(candidates);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const getEntreprises = (req, res) => {
  database
    .query("SELECT * FROM entreprises")
    .then(([entreprises]) => {
      res.send(entreprises);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = { getOffers, getCandidates, getEntreprises };
