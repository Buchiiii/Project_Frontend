import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "../../../services/controller/api";
import { GetVoterId } from "../../../utils/Get-voter-id";

const VoterOtpTimer = () => {
  const [second, setseconds] = useState(59);
  const [minute, setminute] = useState(1);
  const id = GetVoterId();
  useEffect(() => {
    let myinterval = setInterval(() => {
      if (second > 0) {
        setseconds(second - 1);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(myinterval);
        } else {
          setminute(minute - 1);
          setseconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myinterval);
    };
  });
  return (
    <>
      {minute === 0 && second === 0 ? (
        <span
          onClick={async () => {
            setminute(1);
            setseconds(59);
            try {
              const response = await API.post(`voters/resendOtp/${id}`);
              console.log(response);
              toast.success(response.data.message);
            } catch (err) {
              console.log(err);
              const error = err as AxiosError;
              if (error.response?.status === 400) {
                if (err instanceof AxiosError) {
                  toast.error(err.response?.data.message);
                }
              }
            }
          }}
          className="btn btn-light"
        >
          {" "}
          Resend{" "}
        </span>
      ) : (
        <span>
          {" "}
          {minute}:{second < 10 ? `0${second}` : second}
        </span>
      )}
    </>
  );
};

export default VoterOtpTimer;
