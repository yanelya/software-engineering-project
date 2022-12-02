import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Login from "../components/LoginForm";


it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div)
})


