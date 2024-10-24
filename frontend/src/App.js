import "./App.css";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/apiRequest";

function App() {

  return (
      <div className="App"> 
        <RouterProvider router={router}/>
      </div>
    
  );
}

export default App;
