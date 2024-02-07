import { useEffect, useState } from "react";
import { IVoter } from "../modal";
import { API } from "../../services/controller/api";

export const GetVoterHook= ()=>{
    const [voter, setVoter] = useState<IVoter | null>(null);

  const getVoter = async () => {
    try {
      const response = await API.get("voters");
      setVoter(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVoter();
  }, []);

  return voter
}