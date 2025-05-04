import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form.jsx"
import Indexes from "../components/Indexes.jsx";
import Values from "../components/Values.jsx";
import { Link } from "react-router";
function Fib() {
    const [values, setValues] = useState([]);
    const [seenIndexes, setSeenIndexes] = useState([]);

    const fetchValues = useCallback(async () => {
        const values = await axios.get("/api/values");
        setValues(values.data);
    }, []);
    
    const fetchIndexes = useCallback(async () => {
        const indexes = await axios.get("/api/values/current");
        setSeenIndexes(indexes.data);
    }, []);

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [fetchIndexes, fetchValues]);


    const submitHandler = async (values) => {
        await axios.post("/api/values", {index: values.index});
        fetchIndexes();
        fetchValues();
    }

    
    return (
        <>
            <Form onSubmit={submitHandler} />
            <Indexes indexes={seenIndexes} />
            <Values values={values} />
            <Link to="/other">Other page</Link>
        </>
    );
}
export default Fib;