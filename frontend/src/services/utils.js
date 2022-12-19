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

export const getCandidates = async () => {
  const response = await fetch(backendUrl + "/candidates");
  const responseJson = await response.json();
  return responseJson;
};

export const getEntreprises = async () => {
  const response = await fetch(backendUrl + "/entreprises");
  const responseJson = await response.json();
  return responseJson;
};
