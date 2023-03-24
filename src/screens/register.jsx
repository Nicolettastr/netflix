import React, { useRef } from "react";
import { auth } from "../firebase";

const Register = ({ email }) => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (ev) => {
        //when clicked, we want to create an user account
        ev.preventDefault()
        //set up the auth created in the firebase.js file 
        auth
            .createUserWithEmailAndPassword(
                //it takes the value of whatever emailRef and passwordRef is pointing
                emailRef.current.value,
                passwordRef.current.value
            ).then((authUser) => {
                console.log(authUser)
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <>
            <section>
                <div>
                    <p>STEP 1 OF 3</p>
                    <h2>Welcome back!</h2>
                    <h2>Joining Netflix is easy.</h2>
                    <p>Enter your password and you'll be watching in no time.</p>
                </div>
                <form>
                    <p>Email</p>
                    <p>{email}</p>
                    <input type="password" placeholder="Password" />
                    <p>¿Has olvidado tu contraseña?</p>
                </form>
                <button >Next</button>
            </section>
        </>
    )
};

export default Register;