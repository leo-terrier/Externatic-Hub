import Interview from "@components/frontandback/Interview";
import { getPropositionInterviews } from "@services/APIcall";
import React, { useEffect, useState } from "react";

export default function PropositionDetailsInterviews({ propositionId }) {
  const [interviews, setInterviews] = useState(null);

  useEffect(() => {
    getPropositionInterviews(propositionId).then((res) => {
      setInterviews(res);
    });
  }, []);

  if (interviews) {
    return interviews.map((interview) => <Interview interview={interview} />);
  }
}
