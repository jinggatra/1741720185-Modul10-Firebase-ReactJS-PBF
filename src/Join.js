import React, {useState, useContext} from 'react';
import {AuthContext} from'./index';
import * as firebase from 'firebase';


const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const Auth = useContext(AuthContext);

    const JoinGoogle = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            Auth.setLoggedIn(true);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }


    const handleForm = e =>{
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res =>{
            if(res.user) Auth.setLoggedIn(true);
        }).catch(e =>{
            setError(e.message);
        });

    };

    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    name = "email"
                    type = "email"
                    placeholder = "email"
                />

                <input
                    onChange = {e => setPassword(e.target.value)}
                    value = {password}
                    name = "password"
                    type = "password"
                    placeholder = "password"
                />
                <hr />
                <button class="googleBtn" type="button" onClick={JoinGoogle}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="logo"
                    />
                    Join With Google
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Join;