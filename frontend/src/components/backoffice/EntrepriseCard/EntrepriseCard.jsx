export default function EntrepriseCard({ entreprise }) {
  return (
    <li key={entreprise.id}>
      <div style={{ border: "1px solid" }}>
        <h3>{entreprise.name}</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <p>{entreprise.size}</p>
          <p>{entreprise.industry}</p>
        </div>
        <p>{entreprise.description}</p>
      </div>
    </li>
  );
}
