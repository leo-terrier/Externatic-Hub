import { useEffect } from "react";
import /* getUserById,
  getUserSearchPreferences,
  getUserPropositions, */
"@services/utils";

export default function Candidate() {
  useEffect(() => {
    // Info user CHECK
    /* {
      "id": 1,
      "lastname": "McQueen",
      "firstname": "Steve",
      "email": "leoterrier22+x@gmail.com",
      "telephone": "0751212693",
      "favcontactmethod": "email",
      "cv": null,
      "city": "Bordeaux",
      "is_active": 1,
      "zipcode": "33000"
  } */
    // Info Pref CHECK
    /* {
      "id": 1,
      "user_id": 1,
      "user_city": "Bordeaux",
      "stack": "Kubernetees",
      "job_field": "DevOps / Infra",
      "compensation": 70000,
      "entreprise_size": null,
      "industry": null,
      "remote_days": null,
      "education": null,
      "zipcode": "33000"
  } */
    // Info Propositions => cf ligne proposition CHECK
    // Info Fav => CHECK
    // Info Notif
  });
  return <div>Candidate</div>;
}
