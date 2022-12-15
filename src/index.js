import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Fragment>
  //   <AuthContextProvider>
  //     <Router />
  //   </AuthContextProvider>
  // </Fragment>,
  <Router />
)