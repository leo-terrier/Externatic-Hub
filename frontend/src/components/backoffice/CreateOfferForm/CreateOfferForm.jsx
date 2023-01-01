import { jobFieldOptions } from "@assets/form-options/form-options";
import {
  createEntrepriseContact,
  createOffer,
  getEntrepriseContacts,
} from "@services/APIcall";
import { useEffect, useState } from "react";

export default function CreateOfferForm({ loadOffers, entrepriseId }) {
  const [entrepriseContacts, setEntrepriseContacts] = useState([]);

  // Form data
  // // New offer
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [jobField, setJobField] = useState("");
  const [stack, setStack] = useState("");
  const [minCompensation, setMinCompensation] = useState("");
  const [maxCompensation, setMaxCompensation] = useState("");
  const [remoteDays, setRemoteDays] = useState("");
  const [education, setEducation] = useState("");
  const [content, setContent] = useState("");

  // // Selected entreprise_contact
  const [selectedContactId, setSelectedContactId] = useState("");

  // // New entreprise_contact info
  const [contactFirstname, setContactFirstname] = useState("");
  const [contactLastname, setContactLastname] = useState("");
  const [contactJobTitle, setContactJobTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTelephone, setContactTelephone] = useState("");

  const loadEntrepriseContacts = () => {
    getEntrepriseContacts(entrepriseId).then((res) => {
      setEntrepriseContacts(res);
    });
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    let entrepriseContactId = selectedContactId;

    if (!entrepriseContactId) {
      entrepriseContactId = await createEntrepriseContact({
        contactFirstname,
        contactLastname,
        contactEmail,
        contactJobTitle,
        contactTelephone,
        entrepriseId,
      });
    }

    await createOffer({
      consultantId: 1,
      entrepriseId,
      title,
      city,
      stack,
      maxCompensation,
      minCompensation,
      remoteDays,
      entrepriseContactId,
      jobField,
      content,
    });
    await loadOffers();
    loadEntrepriseContacts();
  };

  useEffect(loadEntrepriseContacts, []);

  return (
    <form className="space-y-12">
      <div>
        <h2>Nouvelle Offre</h2>
        <h3>Détails de l'offre</h3>
        <div className="flex flex-wrap gap-12">
          <div className="w-full flex gap-8">
            <label htmlFor="title">Titre : </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-96"
            />
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="city">Ville : </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="jobField">Domaine : </label>
            <select
              id="jobField"
              value={jobField}
              onChange={(e) => setJobField(e.target.value)}
            >
              {jobFieldOptions.map((jobFieldName) => {
                return <option value={jobFieldName}>{jobFieldName}</option>;
              })}
            </select>
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="stack">Technologies : </label>
            <input
              type="text"
              id="stack"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
            />
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="education">Diplôme requis : </label>
            <input
              type="text"
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="minCompensation">Salaire min :</label>
            <input
              type="number"
              id="minCompensation"
              value={minCompensation}
              onChange={(e) => setMinCompensation(e.target.value)}
            />
          </div>
          <div className="w-96 flex gap-8">
            <label htmlFor="maxCompensation"> Salaire max : </label>
            <input
              type="number"
              id="maxCompensation"
              value={maxCompensation}
              onChange={(e) => setMaxCompensation(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-8">
            <label htmlFor="remoteDays">
              Nombre de jours de télétravail autorisés par semaine
            </label>
            <select
              id="remoteDays"
              value={remoteDays}
              onChange={(e) => setRemoteDays(e.target.value)}
            >
              <option value="">Non spécifié</option>
              <option value="0">Aucun</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">Full-remote</option>
            </select>
          </div>
          <div className="w-full flex gap-8 h-[400px]">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu de l'offre..."
              className="w-4/5 p-2"
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Personne de contact au sein de l'entreprise</h3>
        <div className="flex flex-wrap gap-12">
          {entrepriseContacts.length > 0 && (
            <div className="w-full flex gap-8">
              <label htmlFor="selectedContactId">
                Selectionner la personne de contact au sein de l'entreprise :{" "}
              </label>
              <select
                id="selectedContactId"
                name="selectedContactId"
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
              >
                <option value="">Créer un nouveau contact</option>
                {entrepriseContacts.map((elt) => {
                  return (
                    <option key={elt.id} value={elt.id}>
                      {" "}
                      {`${elt.firstname} ${elt.lastname.toUpperCase()}`}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {(!entrepriseContacts.length > 0 || selectedContactId === "") && (
            <>
              <div className="w-96 flex gap-8">
                {" "}
                <label htmlFor="contactFirstname">Prénom : </label>
                <input
                  id="contactFirstname"
                  value={contactFirstname}
                  onChange={(e) => setContactFirstname(e.target.value)}
                  type="text"
                />
              </div>
              <div className="w-96 flex gap-8">
                {" "}
                <label htmlFor="contactLastname">Nom : </label>
                <input
                  id="contactLastname"
                  value={contactLastname}
                  onChange={(e) => setContactLastname(e.target.value)}
                  type="text"
                />
              </div>
              <div className="w-96 flex gap-8">
                {" "}
                <label htmlFor="contactJobTitle">Fonction : </label>
                <input
                  id="contactJobTitle"
                  value={contactJobTitle}
                  onChange={(e) => setContactJobTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className="w-96 flex gap-8">
                {" "}
                <label htmlFor="contactEmail">Email : </label>
                <input
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  type="text"
                />
              </div>
              <div className="w-96 flex gap-8">
                {" "}
                <label htmlFor="contactTelephone">Tel : </label>
                <input
                  id="contactTelephone"
                  value={contactTelephone}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setContactTelephone(e.target.value);
                  }}
                  type="text"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="text-2xl w-3/5 font-bold border-2 p-[20px] rounded-md text-slate-100 bg-sky-600 hover:bg-sky-800"
          onClick={(e) => handleCreateOffer(e)}
        >
          AJOUTER OFFRE
        </button>
      </div>
    </form>
  );
}
