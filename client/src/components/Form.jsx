import { useState } from "react";

function Form({onSubmit}) {
    const [index, setIndex] = useState("");
    const submitForm = (event) => {
        event.preventDefault();
        onSubmit({index: index});
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <label>Enter your index: </label>
                <input 
                    onChange={(event) => setIndex(event.target.value)} 
                    value={index}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}   

export default Form;