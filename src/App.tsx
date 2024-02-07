import React from "react";
import "./App.css";
import { Layout } from "./layouts/Admin-layout";
import { VoterLogin } from "./pages/Voters/Voter-login/Voter-login";
import { Route, Routes } from "react-router-dom";
import { AdminLogin } from "./pages/Admin/Admin-login/Admin-login";
import { AdminDashboard } from "./pages/Admin/Admin-dashboard";
import { AdminCandidateList } from "./pages/Admin/Admin-candidate-list";
import { Election } from "./pages/Admin/Election";
import { AdminSettings } from "./pages/Admin/Admin-settings";
import { Result } from "./pages/Voters/Voter-result";
import { VoterLayout } from "./layouts/Voter-layout";
import { VoterDashboard } from "./pages/Voters/Voter-dashboard";
import { VoterProfile } from "./pages/Voters/Voter-profile";
import { VoterSettings } from "./pages/Voters/Voter-settings";
import { ChooseElection } from "./pages/Voters/ChooseElection";
import { Vote } from "./pages/Voters/Voter-vote/Vote";
import { ChooseElectionForElection } from "./pages/Voters/ChooseElectionForResult";
import { VoterChangepassword } from "./pages/Voters/Voter-change-password";
import { OfficialChooseElectionForCandidate } from "./pages/Admin/OfficialChooseElectionForCandidate";
import { ELectionProperties } from "./pages/Admin/Admin-election-properties/ElectionProperties";
import AdminCreateElection from "./pages/Admin/Admin-create-election/Admin-create-election";
import { LandingPage } from "./pages/Landing-page";
import { VoterRegister } from "./pages/Voters/Voter-registration/Voter-register";
import { CandidateRegister } from "./pages/Candidates/Candidate-register";
import { AdminChangePassword } from "./pages/Admin/Admin-change-password";
import { OfficialChooseElectionForResult } from "./pages/Admin/OfficialChooseElectionForResult";
import { AdminResult } from "./pages/Admin/Admin-result";
import { OTPlogin } from "./pages/Voters/Voter-login/Voter-otp-login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="official" element={<AdminLogin />} />
        <Route path="voter" element={<VoterLogin />} />
        <Route path="voter/otp" element={<OTPlogin />} />
        <Route path="voter/register" element={<VoterRegister />} />
        <Route path="candidate/register" element={<CandidateRegister />} />
        <Route
          path="official/dashboard"
          element={
            <Layout>
              <AdminDashboard />
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
              <AdminCandidateList />
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
              <AdminCreateElection />
            </Layout>
          }
        />

        <Route
          path="official/settings"
          element={
            <Layout>
              <AdminSettings />
            </Layout>
          }
        />

        <Route
          path="official/settings/changepassword"
          element={
            <Layout>
              <AdminChangePassword />
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
              <AdminResult />
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
              <VoterChangepassword />
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
