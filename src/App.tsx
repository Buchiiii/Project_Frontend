import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { OfficialLogin } from "./components/Officials/OfficialLogin";
import { OfficialDashboard } from "./components/Officials/OfficialDashboard";
import { OfficialCandidate } from "./components/Officials/OfficialCandidate";
import { Election } from "./components/Officials/Election";
import { OfficialSettings } from "./components/Officials/OfficialSettings";
import { Result } from "./components/Voters/Result";
import { VoterLayout } from "./components/VoterLayout";
import { VoterDashboard } from "./components/Voters/VotersDashboard";
import { VoterProfile } from "./components/Voters/VotersProfile";
import { VoterSettings } from "./components/Voters/VotersSettings";
import { ChooseElection } from "./components/Voters/ChooseElection";
import { Vote } from "./components/Voters/Vote";
import { ChooseElectionForElection } from "./components/Voters/ChooseElectionForResult";
import { Changepassword } from "./components/Voters/ChangePassword";
import { OfficialChooseElectionForCandidate } from "./components/Officials/OfficialChooseElectionForCandidate";
import { ELectionProperties } from "./components/Officials/ElectionProperties";
import { CreateElection } from "./components/Officials/CreateElection";
import { Home } from "./components/Home";
import { VoterRegister } from "./components/Voters/VoterRegister";
import { CandidateRegister } from "./components/Candidates/CandidateRegister";
import { OfficialChangePassword } from "./components/Officials/OfficialsChangePassword";
import { OfficialChooseElectionForResult } from "./components/Officials/OfficialChooseElectionForResult";
import { OfficialResult } from "./components/Officials/OfficialResult";
import { OTPlogin } from "./components/Voters/Otplogin";

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
