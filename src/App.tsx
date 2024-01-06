import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./layouts/Layout";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { OfficialLogin } from "./pages/Officials/OfficialLogin";
import { OfficialDashboard } from "./pages/Officials/OfficialDashboard";
import { OfficialCandidate } from "./pages/Officials/OfficialCandidate";
import { Election } from "./pages/Officials/Election";
import { OfficialSettings } from "./pages/Officials/OfficialSettings";
import { Result } from "./pages/Voters/Result";
import { VoterLayout } from "./layouts/VoterLayout";
import { VoterDashboard } from "./pages/Voters/VotersDashboard";
import { VoterProfile } from "./pages/Voters/VotersProfile";
import { VoterSettings } from "./pages/Voters/VotersSettings";
import { ChooseElection } from "./pages/Voters/ChooseElection";
import { Vote } from "./pages/Voters/Vote";
import { ChooseElectionForElection } from "./pages/Voters/ChooseElectionForResult";
import { Changepassword } from "./pages/Voters/ChangePassword";
import { OfficialChooseElectionForCandidate } from "./pages/Officials/OfficialChooseElectionForCandidate";
import { ELectionProperties } from "./pages/Officials/ElectionProperties";
import { CreateElection } from "./pages/Officials/CreateElection";
import { Home } from "./pages/Home";
import { VoterRegister } from "./pages/Voters/VoterRegister";
import { CandidateRegister } from "./pages/Candidates/CandidateRegister";
import { OfficialChangePassword } from "./pages/Officials/OfficialsChangePassword";
import { OfficialChooseElectionForResult } from "./pages/Officials/OfficialChooseElectionForResult";
import { OfficialResult } from "./pages/Officials/OfficialResult";
import { OTPlogin } from "./pages/Voters/Otplogin";

//const route= createBrowserRouter(createRoutesFromElements(<Route path='/' element={<Login/>}/>))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="official" element={<OfficialLogin />} />
        <Route path="voter" element={<Login />} />
        <Route path= "voter/otp" element={<OTPlogin/>}/>
        <Route path="voter/register" element={<VoterRegister />} />
        <Route path="candidate/register" element={<CandidateRegister />} />
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
              <OfficialChooseElectionForCandidate />
            </Layout>
          }
        />

        <Route
          path="official/candidate/:id"
          element={
            <Layout>
              <OfficialCandidate />
            </Layout>
            
          }
          
        />

        <Route
          path="official/election"
          element={
            <Layout>
              <Election />
            </Layout>
          }
        />

        <Route
          path="official/election/:id"
          element={
            <Layout>
              <ELectionProperties />
            </Layout>
          }
        />

        <Route
          path="official/election/create"
          element={
            <Layout>
              <CreateElection />
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

        <Route
          path="official/settings/changepassword"
          element={
            <Layout>
              <OfficialChangePassword />
            </Layout>
          }
        />

        <Route
          path="official/result"
          element={
            <Layout>
              <OfficialChooseElectionForResult />
            </Layout>
          }
        />

        <Route
          path="official/result/:id"
          element={
            <Layout>
              <OfficialResult />
            </Layout>
          }
        />

        <Route
          path="voters/dashboard"
          element={
            <VoterLayout>
              <VoterDashboard />
            </VoterLayout>
          }
        />

        <Route
          path="voters/profile"
          element={
            <VoterLayout>
              <VoterProfile />
            </VoterLayout>
          }
        />

        <Route
          path="voters/settings"
          element={
            <VoterLayout>
              <VoterSettings />
            </VoterLayout>
          }
        />

        <Route
          path="voters/settings/changepassword"
          element={
            <VoterLayout>
              <Changepassword />
            </VoterLayout>
          }
        />

        <Route
          path="voters/election"
          element={
            <VoterLayout>
              <ChooseElection />
            </VoterLayout>
          }
        />

        <Route
          path="voters/election/:id"
          element={
            <VoterLayout>
              <Vote />
            </VoterLayout>
          }
        />

        <Route
          path="voters/result"
          element={
            <VoterLayout>
              <ChooseElectionForElection />
            </VoterLayout>
          }
        />

        <Route
          path="voters/result/:id"
          element={
            <VoterLayout>
              <Result />
            </VoterLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
