import { useState, useEffect } from "react";
import { API } from "../../services/controller/api";
import { IElection } from "../modal";

export const GetPaginatedElectionHookForVoter = (
  page: number,
  limit: number
) => {
  const voterId = JSON.parse(window.localStorage.getItem("ID") as string);
  const [totalPages, setTotalPages] = useState(0);
  const [election, setElection] = useState<null | IElection[]>(null);
  const getElection = async () => {
    try {
      const response = await API.get(
        `elections/voter/${voterId}?page=${page}&limit=${limit}`
      );
      setElection(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getElection();
  }, []);

  return { election, totalPages, setElection };
};
