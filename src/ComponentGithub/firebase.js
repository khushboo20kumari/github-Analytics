import { initializeApp } from "firebase/app";
// import {app} from "./"
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC89YZFdcK-dS_OzP2myhIzhgpz0DbjzTk",
  authDomain: "login-page-e089e.firebaseapp.com",
  projectId: "login-page-e089e",
  storageBucket: "login-page-e089e.firebasestorage.app",
  messagingSenderId: "244580384478",
  appId: "1:244580384478:web:0f56ef8911a9c0bf9b8c4f",
  databaseURL:"https://login-page-e089e-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
// const getauth=getAuth(app)