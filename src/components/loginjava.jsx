import React from "react";
import '../styles/loginJava.css';

const LOGINJAVA = (props) => {
    return (
        <div className="login-page">
            <div className="login-card">
                <h3 className="login-title">Login</h3>
                <form method="post" action="/login">
                    <input type="hidden" name="_csrf" value={props.csrfToken} />
                    <div>
                        <label>Email address</label>
                        <input className="login-input" name="username" placeholder="Enter email" />
                    </div>
                    
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Enter password" />
                    </div>

                    <button className="login-button" type="submit">
                        Sign in
                    </button>

                    {/* <div className="login-links">
                        <a href="#">Forgot password?</a>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default LOGINJAVA;








