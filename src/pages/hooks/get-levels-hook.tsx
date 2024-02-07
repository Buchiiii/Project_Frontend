import { useEffect, useState } from "react";
import { ILevel } from "../modal";
import { API } from "../../services/controller/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const GetLevelsHook = (): ILevel[]| null => {
  const [level, setLevel] = useState<ILevel[] | null>(null);

  const getLevel = async () => {
    try {
      const response = await API.get("level");
      setLevel(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    getLevel();
  }, []);

  return level;
};
