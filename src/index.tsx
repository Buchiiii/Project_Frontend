import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Route
, createRoutesFromElements, 
RouterProvider,
BrowserRouter} from 'react-router-dom';
import { Login } from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { OfficialLogin } from './components/Officials/OfficialLogin';




//const router= createBrowserRouter([{<Route path='/' element={<Login/>}/>, <Route path='/official' element={<OfficialLogin/>} />}])



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter >
    <App />
    </BrowserRouter>
    
    
    {/* <RouterProvider router={router}/> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
