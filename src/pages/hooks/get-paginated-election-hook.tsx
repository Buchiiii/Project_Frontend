import { useState, useEffect } from "react";
import { API } from "../../services/controller/api";
import { IElection } from "../modal";

interface IGetPaginatedElectionHookProps {
  limit: number;
}

export const GetPaginatedElectionHook = ({
  limit,
}: IGetPaginatedElectionHookProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [election, setElection] = useState<null | IElection[]>(null);
  const getElection = async () => {
    try {
      const response = await API.get(`elections?page=1&limit=${limit}`);
      setElection(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getElection();
  }, []);

  return { election, totalPages };
};
