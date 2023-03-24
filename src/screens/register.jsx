import React, { useRef } from "react";
import { auth } from "../firebase";

const Register = () => {

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
        <section>
            <div>
                <p>PASO 1 DE 3</p>
                <h2>¡Te damos de nuevo la bienvenida!</h2>
                <h2>Es fácil suscribirse a Netflix.</h2>
                <p>Escribe tu contraseña para empezar a disfrutar.</p>
            </div>
            <form>
                <p>Dirección de correo</p>

                <input type="password" placeholder="Password" />
                <p>¿Has olvidado tu contraseña?</p>
            </form>
            <button >Next</button>
        </section>
    )
};

export default Register;