import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { OfficialLogin } from "./components/OfficialLogin";
import { OfficialDashboard } from "./components/Officials/OfficialDashboard";
import { OfficialCandidate } from "./components/Officials/OfficialCandidate";
import { OfficialList } from "./components/Officials/OfficialList";
import { OfficialSettings } from "./components/Officials/OfficialSettings";

//const route= createBrowserRouter(createRoutesFromElements(<Route path='/' element={<Login/>}/>))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="official" element={<OfficialLogin />} />
        <Route
          path="official/dashboard"
          element={
            <Layout>
              <OfficialDashboard />
            </Layout>
          }
        />
        <Route
          path="official/candidate"
          element={
            <Layout>
              <OfficialCandidate />
            </Layout>
          }
        />

<Route
          path="official/list"
          element={
            <Layout>
              <OfficialList />
            </Layout>
          }
        />

<Route
          path="official/settings"
          element={
            <Layout>
              <OfficialSettings />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
