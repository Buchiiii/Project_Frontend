import { useEffect, useState } from "react";
import { ICandidate } from "../modal";
import { API } from "../../services/controller/api";

const GetElectionCandidates = (id: string, searchParam: string) => {
  const [candidates, setCandidates] = useState<null | ICandidate[]>(null);

  const getCandidates = async () => {
    try {
      const response = await API.get(
        `elections/candidates/${id}?role=${searchParam}`
      );
      setCandidates(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCandidates();
  }, []);

  return candidates;
};

export default GetElectionCandidates;
