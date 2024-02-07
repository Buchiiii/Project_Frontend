import { useEffect, useState } from "react";
import { IElectionRole } from "../modal";
import { API } from "../../services/controller/api";

export const GetElectionRoles = (id: string) => {
  const [roles, setRoles] = useState<null | IElectionRole[]>(null);

  const getRoles = async () => {
    try {
      const response = await API.get(`elections/roles/${id}`);
      setRoles(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  return roles;
};

