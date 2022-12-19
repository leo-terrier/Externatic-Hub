import { Link } from "react-router-dom";

export default function OfferLine({ offer }) {
  return (
    <li key={offer.id}>
      <div style={{ border: "1px solid" }}>
        <h3>
          <Link to={offer.id.toString()}>{offer.title}</Link>
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <p>{offer.city}</p>
          <p>{offer.job_field}</p>
          <p>{offer.stack}</p>
          <p>{offer.max_compensation}</p>
          <p>{offer.min_compensation}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <p>{offer.remote_days}</p>
          <p>{offer.education}</p>
          <p>{offer.status}</p>
          <p>
            Contact :{" "}
            {`${offer.contact_firstname} ${offer.contact_lastname} ${offer.contact_email}`}
          </p>
          <p>
            Consultant :{" "}
            {`${offer.consultant_firstname} ${offer.consultant_lastname}`}
          </p>
        </div>
        <p>{offer.description}</p>
      </div>
    </li>
  );
}
