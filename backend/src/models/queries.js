const { camelToSnakeCase } = require("../utils");

// Users
const getUsers =
  "SELECT t1.id, t1.firstname, t1.lastname, t1.email, t1.telephone, t1.city, t1.is_active, sum(case when t2.proposition_initiative = 'user' then 1 else 0 end) nb_sent_propositions, sum(case when t2.proposition_initiative = 'entreprise' then 1 else 0 end) nb_received_propositions, sum(case when t2.status = 'pending' then 1 else 0 end) pending_propositions, sum(case when t2.status = 'accepted' then 1 else 0 end) filled_offers FROM users t1 LEFT JOIN propositions t2 ON t2.user_id = t1.id GROUP BY t1.id";

const getUserById = "SELECT * FROM users WHERE id = ?;";

const getUserSearchPreferences =
  "SELECT * FROM search_preferences WHERE user_id = ?;";

const getUserPropositions =
  "SELECT t1.id, t1.date, t2.title, t2.city, t3.name entreprise_name, t1.status, t1.proposition_initiative  FROM propositions t1 INNER JOIN offers t2 on t1.offer_id = t2.id INNER JOIN entreprises t3 on t3.id = t2.entreprise_id WHERE t1.user_id = ?";

const getUserFavorites =
  "SELECT * FROM favorite_offers t1 INNER JOIN offers t2 on t1.offer_id = t2.id WHERE t1.user_id = ?";

// OFFERS

// // GET

const getOffers = (paramObject) => {
  const str = [];
  const parameters = [];
  const obj = { ...paramObject };

  if (obj.geo) {
    obj.geo[0] = parseFloat(obj.geo[0], 10);
    obj.geo[1] = parseFloat(obj.geo[1], 10);
  }
  if (obj.distance) obj.distance = parseInt(obj.distance, 10);

  obj.limit = parseInt(obj.limit, 10);
  obj.offset = parseInt(obj.offset, 10);

  console.log(obj);
  let query = `SELECT t1.id, t1.date, t1.city, t1.title, t1.job_field, t1.min_compensation, t1.max_compensation, t1.content, t1.stack, t4.name entreprise_name, CONCAT(t3.firstname, ' ', UPPER(t3.lastname)) consultant, (CASE WHEN t1.status = "ative" THEN "Active" WHEN t1.status = "filled" THEN "Pourvue" ELSE "Non-pourvue" END) status FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprises t4 on t1.entreprise_id = t4.id`;

  if (obj.queryStr) {
    str.push(
      `( t1.id like CONCAT('%', ?, '%') OR t1.date like CONCAT('%', ?, '%') OR t1.city like CONCAT('%', ?, '%') OR t1.title like CONCAT('%', ?, '%') OR t1.content like CONCAT('%', ?, '%') OR t1.stack like CONCAT('%', ?, '%') OR t4.name like CONCAT('%', ?, '%') OR t3.lastname like CONCAT('%', ?, '%') OR t3.firstname like CONCAT('%', ?, '%') OR t4.industry like CONCAT('%', ?, '%'))`
    );
  }
  if (obj.entrepriseSizes) {
    str.push("(t4.size in (?))");
  }
  if (obj.jobFields) {
    str.push("(t1.job_field in (?))");
  }
  if (obj.industries) {
    str.push("(t4.industry in (?))");
  }
  if (obj.compensation) {
    str.push("(t1.max_compensation*1.05 > ?)");
  }
  if (obj.minMaxRemoteDays) {
    str.push('(t1.remote_days = "N/A" OR remote_days BETWEEN ? and ?)');
  }
  if (obj.city) {
    str.push(
      `(t1.city = ? ${
        obj.geo
          ? "OR ST_DISTANCE_SPHERE(POINT(?), t1.geopoints) < ? * 1000"
          : ""
      })`
    );
  }

  str.forEach((elt, i) => {
    query = query.concat((i === 0 ? " WHERE " : " AND ") + elt);
  });

  if (obj.orderBy) {
    query = query.concat(
      ` ORDER BY ?? ${obj.orderDirection === "asc" ? "ASC" : "DESC"}`
    );
    delete obj.orderDirection;
  }

  query = query.concat(" LIMIT ? OFFSET ? ");

  Object.keys(obj).forEach((elt) => {
    if (elt === "queryStr") {
      for (let i = 0; i < 10; i += 1) parameters.push(obj.queryStr);
    } else if (elt === "minMaxRemoteDays") {
      parameters.push(obj[elt][0], obj[elt][1]);
    } else parameters.push(obj[elt]);
  });

  return [query, parameters];
};

const getNumberOfOffers = (str) =>
  `SELECT COUNT(*) offercount FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprises t4 on t1.entreprise_id = t4.id ${str}`;

// ATT : include table entreprises

const getOfferById =
  "SELECT t1.id, t1.date, t1.title, t1.city, t1.stack, t1.max_compensation, t1.min_compensation, t1.remote_days, t1.job_field, t1.education, t1.status, t1.content, t4.id entreprise_id, t4.name entreprise_name, t4.industry entreprise_industry, t4.size entreprise_size, CONCAT(t2.firstname, ' ', UPPER(t2.lastname)) entreprise_contact, t2.job_title entreprise_contact_job_title, t2.email as entreprise_contact_email, t2.telephone as entreprise_contact_telephone, CONCAT(t3.firstname, ' ', UPPER(t3.lastname)) consultant FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprise_contacts t2 ON t1.entreprise_contact_id = t2.id INNER JOIN entreprises t4 on t1.entreprise_id = t4.id WHERE t1.id = ?";

const getOfferPropositions =
  "SELECT * FROM propositions INNER JOIN users ON users.id = propositions.user_id WHERE offer_id = ?";

// // POST
const createOffer = (obj) => {
  const escapedValues = Object.keys(obj).fill("?");
  const escapedColumns = Object.keys(obj).fill("??");
  const query = `INSERT INTO offers (${escapedColumns}) VALUES (${escapedValues})`;
  const parameters = [
    ...Object.keys(obj).map((property) => camelToSnakeCase(property)),
    ...Object.values(obj),
  ];
  return [query, parameters];
};

/* (consultant_id, entreprise_id, title, city, stack, max_compensation, min_compensation, remote_days, entreprise_contact_id, job_field, content)
Object.keys(obj.map(property => camelToSnakeCase(property))) */

// // ENTREPRISES

// GET
const getEntreprises = `SELECT t1.id, t1.name, t1.size, t1.industry, sum(case when t2.status =
    'active' then 1 else 0 end) nb_active_offers, sum(case when t2.status = 'unfilled' then 1 else 0 end) nb_unfilled_offers, sum(case when t2.status = 'filled' then 1 else 0 end) nb_filled_offers FROM entreprises t1 LEFT JOIN offers t2 ON t1.id = t2.entreprise_id GROUP BY t1.id`;

const getEntrepriseById = "SELECT * FROM entreprises WHERE id = ?";

const getEntrepriseOffers =
  "SELECT t1.id, t1.date, t1.title, t1.city, t1.job_field, t4.name entreprise_name, CONCAT(t3.firstname, ' ', UPPER(t3.lastname)) consultant, t1.status FROM offers t1 INNER JOIN consultants t3 ON t1.consultant_id = t3.id INNER JOIN entreprise_contacts t2 ON t1.entreprise_contact_id = t2.id INNER JOIN entreprises t4 on t1.entreprise_id = t4.id WHERE t1.entreprise_id = ?;";

const getEntrepriseContacts =
  "SELECT * FROM entreprise_contacts WHERE entreprise_id = ?";

// POST
const createEntreprise =
  "INSERT INTO entreprises (name, description, size, industry) VALUES (?, ?, ?, ?)";

const createEntrepriseContact = `INSERT INTO entreprise_contacts (firstname, lastname, job_title, email, telephone, entreprise_id) VALUES (?, ?, ?, ?, ?, ?);`;

// PROPOSITION
const getPropositionById = `SELECT
t1.specific_cv proposition_specific_cv,
(CASE WHEN t1.status = "pending" THEN "En attente" WHEN t1.status = "rejected" THEN "Rejetée" ELSE "Acceptée" END) proposition_status,
t1.date proposition_date,
t1.proposition_initiative proposition_initiative,

t2.id user_id,
CONCAT(t2.firstname, ' ', UPPER(t2.lastname)) user,
t2.email user_email,
t3.city user_city,
t2.telephone user_telephone,
t2.favcontactmethod user_favcontactmethod,
t2.cv user_cv,
(CASE WHEN t2.is_active = 1 THEN 'Actif' ELSE 'Inactif' END) user_status,

t3.id offer_id,
t3.title offer_title,
t3.city offer_city,
t3.job_field offer_job_field,
t3.stack offer_stack,
t3.min_compensation offer_max_compensation,
t3.max_compensation offer_min_compensation,
t3.remote_days offer_remote_days,
t3.education offer_education,
(CASE WHEN t3.status = 'active' THEN 'Active' WHEN t3.status = 'unfilled' THEN 'Non-pourvue' ELSE 'Pourvue' END) offer_status,

t4.id entreprise_id,
t4.name entreprise_name,
t4.size entreprise_size,
t4.industry entreprise_industry,

CONCAT(t5.firstname, ' ', UPPER(t5.lastname)) consultant,

CONCAT(t6.firstname, ' ', UPPER(t6.lastname)) entreprise_contact,
t6.email entreprise_contact_email,
t6.telephone entreprise_contact_telephone,

t7.city search_preferences_city,
t7.stack search_preferences_stack,
t7.job_field search_preferences_job_field,
t7.compensation search_preferences_compensation,
t7.entreprise_size search_preferences_entreprise_size,
t7.industry search_preferences_industry,
t7.remote_days search_preferences_remote_days,
t7.education search_preferences_education

FROM propositions t1

INNER JOIN users t2 ON t2.id = t1.user_id
INNER JOIN offers t3 ON t3.id = t1.offer_id
INNER JOIN entreprises t4 ON t3.entreprise_id = t4.id
INNER JOIN consultants t5 ON t3.consultant_id = t5.id
INNER JOIN entreprise_contacts t6 ON t3.entreprise_contact_id = t6.id
INNER JOIN search_preferences t7 ON t1.user_id = t7.user_id

WHERE t1.id = ?;`;

const getPropositionsMessages = `SELECT t3.content, t3.time, t3.origin
FROM propositions t1 INNER JOIN message_threads t2 on t2.proposition_id = t1.id INNER JOIN messages t3 on t3.message_thread_id = t2.id WHERE t1.id = ?;`;

const getPropositionInterviews = `SELECT t2.is_visio, t2.date, t2.location FROM propositions t1 INNER JOIN job_interviews t2 on t2.proposition_id = t1.id WHERE t1.id = ?;`;

module.exports = {
  queries: {
    getOffers,
    getOfferById,
    getOfferPropositions,
    createOffer,
    getNumberOfOffers,
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
    getPropositionsMessages,
    getPropositionInterviews,
  },
};
