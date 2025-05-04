import { useCallback, useEffect, useState } from "react";
import axios from "axios";
//import Form from "../components/Form.jsx";
//import Indexes from "../components/Indexes.jsx";
//import Values from "../components/Values.jsx";

function Fib() {
    const [values, setValues] = useState([]);
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [current, setCurrent] = useState("");

    useEffect(() => {
        //fetchValues();
        //fetchIndexes();
    }, []);

    const fetchValues = useCallback(async () => {
       // const values = await axios.get("/api/values/current");
        //setValues(values);
    }, [axios]);
    
    const fetchIndexes = useCallback(async () => {
        //const indexes = await axios.get("/api/values");
       // setSeenIndexes(indexes);
    }, [axios]);


    
    return (
        <>
        <div>
                
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            
        </>
    );
}

export default Fib;