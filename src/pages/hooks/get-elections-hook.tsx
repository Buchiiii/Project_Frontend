import { useState, useEffect } from "react";
import { API } from "../../services/controller/api";
import { IElection } from "../modal";

export const GetElectionHook = (id: string) => {
  const [election, setElection] = useState<IElection | null>(null);
  const getElection = async () => {
    try {
      const response = await API.get(`elections/${id}`);
      setElection(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getElection();
  }, []);

  return election;
};

