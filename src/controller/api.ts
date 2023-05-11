import axios from "axios";

const token: string | null = JSON.parse(
  localStorage.getItem("Token") as string
);

export const API = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
   Authorization: `Bearer${token}`,
    "Access-Control-Allow-Origin": "*",
  },
});
