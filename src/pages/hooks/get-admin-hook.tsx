import { useState, useEffect } from "react";
import { API } from "../../services/controller/api";
import { IAdmin } from "../modal";

export const GetAdminHook = () => {
  const [profile, setProfile] = useState<null | IAdmin>(null);
  const getAdmin = async () => {
    try {
      const response = await API.get(`officials/profile`);
      console.log(response);
      setProfile(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getAdmin();
  }, []);
  return profile;
};
