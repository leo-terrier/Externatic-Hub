import CreateOfferForm from "@components/backoffice/CreateOfferForm";
import OfferCard from "@components/backoffice/OfferCard";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import { Pagination } from "@mui/material";
import { getEntrepriseById, getEntrepriseOffers } from "@services/APIcall";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Entreprise() {
  const { id: entrepriseId } = useParams();

  const navigate = useNavigate();

  // Fetched data
  const [info, setInfo] = useState({});
  const [activeOffers, setActiveOffers] = useState([]);
  const [inactiveOffers, setInactiveOffers] = useState([]);

  const inactiveOfferPageCount = Math.ceil(inactiveOffers.length / 5);
  const activeOfferPageCount = Math.ceil(activeOffers.length / 5);

  // For Small Screens (Cards)
  const [inactiveOfferPageNumber, setInactiveOfferPageNumber] = useState(1);
  const [activeOfferPageNumber, setActiveOfferPageNumber] = useState(1);

  // For Medium Screens (Tables)
  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      cellStyle: { width: "4%" },
      width: "4%",
      headerStyle: { width: "4%" },
    },
    {
      title: "Date",
      field: "date",
      type: "date",
    },
    {
      title: "Titre",
      field: "title",
    },
    {
      title: "Ville",
      field: "city",
    },
    {
      title: "Domaine",
      field: "job_field",
    },
    {
      title: "Consultant",
      field: "consultant",
    },
    {
      title: "Statut",
      field: "status",
      render: (rowData) => (
        <p
          className={`font-bold text-${
            rowData.status === "Active"
              ? "green"
              : rowData.status === "Non-pourvue"
              ? "red"
              : "purple"
          }-500`}
        >
          {rowData.status}
        </p>
      ),
    },
  ];

  const options = {
    pageSize: 10,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
  };

  function getEntrepriseInfo() {
    getEntrepriseById(entrepriseId).then((res) => setInfo(res));
    getEntrepriseOffers(entrepriseId).then(function (res) {
      setActiveOffers(res.filter((elt) => elt.status === "Active"));
      setInactiveOffers(res.filter((elt) => elt.status !== "Active"));
    });
  }

  useEffect(getEntrepriseInfo, []);

  if (Object.keys(info).length) {
    return (
      <div className="space-y-8 md:space-y-16">
        <div>
          <h1 className="mb-2">{`${info.name} (n° ${info.id})`}</h1>
          <p className="font-bold">Taille : {info.size}</p>
          <p className="font-bold">Secteur : {info.industry}</p>
        </div>
        <div>
          <h2>Description</h2>
          <div className="p-4 border-l-4  bg-white md:border-0 md:p-0">
            <p className="whitespace-pre-line">{info.description}</p>
          </div>
        </div>
        <div className="hidden md:block">
          <MaterialTable
            title="Liste des offres actives"
            columns={tableColumns}
            data={activeOffers}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../offre/${rowData.id.toString()}`)
            }
          />
        </div>
        <div className="hidden md:block">
          <MaterialTable
            title="Liste des offres inactives"
            columns={tableColumns}
            data={inactiveOffers}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../offre/${rowData.id.toString()}`)
            }
          />
        </div>
        {Object.keys(info).length > 0 && (
          <div className="md:hidden space-y-6">
            <h2>Offres actives</h2>
            <Listings>
              {activeOffers.length > 0 ? (
                activeOffers
                  .filter(
                    (_, i) =>
                      i > (activeOfferPageNumber - 1) * 5 - 1 &&
                      i < activeOfferPageNumber * 5
                  )
                  .map((offer) => (
                    <Listing>
                      <OfferCard key={offer.id} offer={offer} />
                    </Listing>
                  ))
              ) : (
                <li>Vide</li>
              )}
            </Listings>
            <div
              className={`flex justify-center ${
                activeOffers.length < 5 ? "hidden" : ""
              }`}
            >
              <Pagination
                count={activeOfferPageCount}
                onChange={(_, value) => setActiveOfferPageNumber(value)}
              />
            </div>
          </div>
        )}
        {Object.keys(info).length > 0 && (
          <div className="md:hidden space-y-6">
            <h2>Offres inactives</h2>
            <Listings>
              {inactiveOffers.length > 0 ? (
                inactiveOffers
                  .filter(
                    (_, i) =>
                      i > (inactiveOfferPageNumber - 1) * 5 - 1 &&
                      i < inactiveOfferPageNumber * 5
                  )
                  .map((offer) => (
                    <Listing>
                      <OfferCard key={offer.id} offer={offer} />
                    </Listing>
                  ))
              ) : (
                <li>Vide</li>
              )}
            </Listings>
            <div
              className={`flex justify-center ${
                inactiveOffers.length < 5 ? "hidden" : ""
              }`}
            >
              <Pagination
                count={inactiveOfferPageCount}
                onChange={(_, value) => setInactiveOfferPageNumber(value)}
              />
            </div>
          </div>
        )}
        <div className="hidden md:block">
          <CreateOfferForm
            entrepriseId={entrepriseId}
            loadOffers={getEntrepriseInfo}
          />
        </div>
      </div>
    );
  }
}
