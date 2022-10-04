import axios from "axios";
import { useEffect, useState } from "react";
function Reset() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
            // const config = {
            //     method: 'POST',
            //     body: JSON.stringify(email),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // };
    
            // const response = await axios.post(`http://localhost:5000/api/users/forgot-password`, {email}, config);
            // if (!response.ok) throw Error(response.message);
            //     try {
            //         const data = await response.json();
            //         return data;
            //     } catch (err) {
            //         console.log(err)
            //         throw err;
            //     }
            e.preventDefault()
            fetch("http://localhost:5000/api/users/forgot-password",
            {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(
                    {
                        email
                    }
                ),
            })
            .then((res)=>res.json())
            .then((data)=> {
                console.log(data, "userRegister");
                alert(data.status);
            })
    };
    return ( 
        <form>
            <h3>Forgot Password</h3>
        <div>
            <label>email address</label>
            <br />
            <input
                type="email"
                value={email}
                id="email"
                placeholder="email@gmail.com"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>
                submit
            </button>
        </div>
        {/* <p>
            <a href="">Sign Up</a>
        </p> */}
        </form>
     );
}

export default Reset;