const backendUrl = "http://localhost:5001";

//OFFERS
export const getOffers = async () => {
  const response = await fetch(backendUrl + "/offers");
  const responseJson = await response.json();
  return responseJson;
};
export const getOfferById = async (id) => {
  const response = await fetch(backendUrl + "/offers/" + id);
  const responseJson = await response.json();
  return responseJson;
};
export const getOfferPropositions = async (id) => {
  const response = await fetch(backendUrl + "/offers/" + id + "/propositions");
  const responseJson = await response.json();
  return responseJson;
};

//USERS
export const getUsers = async () => {
  const response = await fetch(backendUrl + "/users");
  const responseJson = await response.json();
  return responseJson;
};

export const getUserById = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id);
  const responseJson = await response.json();
  return responseJson;
};
export const getUserSearchPreferences = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id + "/preferences");
  const responseJson = await response.json();
  return responseJson;
};

export const getUserPropositions = async (id) => {
  const response = await fetch(backendUrl + "/users/" + id + "/propositions");
  const responseJson = await response.json();
  return responseJson;
};

//ENTREPRISES
export const getEntreprises = async () => {
  const response = await fetch(backendUrl + "/entreprises");
  const responseJson = await response.json();
  return responseJson;
};

export const getEntrepriseById = async (id) => {
  const response = await fetch(backendUrl + "/entreprises/" + id);
  const responseJson = await response.json();
  return responseJson;
};

export const getEntrepriseOffers = async (id) => {
  const response = await fetch(backendUrl + "/entreprises/" + id + "/offers");
  const responseJson = await response.json();
  return responseJson;
};
