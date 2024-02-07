import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "../../services/controller/api";
import { IDepartment } from "../modal";

export const GetDepartmentsHook=()=>{
    const [department, setDepartment] = useState<IDepartment[] | null>(null);
    const getDepartment = async () => {
        try {
          const response = await API.get("department");
          setDepartment(response.data);
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
        getDepartment();
        
      }, []);

      return department;
}