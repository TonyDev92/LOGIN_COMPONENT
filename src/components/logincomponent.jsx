import React from "react";

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            token: ""
        };

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { user, password } = this.state;

        const loginData = {
            user,
            password
        }

        if (this.props.onLogin) {
            this.props.onLogin(loginData);
        }

    }

    render() {
        const { user, password } = this.state;

        return (
            <>
                <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Usuario</label>
                            <br />
                            <input
                                type="text"
                                name="user"
                                value={user}
                                onChange={this.handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label>Contraseña</label>
                            <br />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="enter your password"
                                required
                            />
                        </div>

                        <button type="submit">Entrar</button>
                    </form>
                </div>
            
            </>
        )
    }
}

export default LoginComponent;
