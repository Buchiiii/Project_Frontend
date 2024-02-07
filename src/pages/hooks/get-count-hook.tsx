import { useState, useEffect } from "react";
import { API } from "../../services/controller/api";

interface Count {
  voterTotal: number;
  candidateTotal: number;
  electionTotal: number;
}

export const GetCountHook = () => {
  const [count, setCount] = useState<null | Count>(null);

  const getCounts = async () => {
    try {
      const response = await API.get(`elections/counts`);
      console.log(response);
      setCount(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getCounts();
  }, []);

  return count;
};
