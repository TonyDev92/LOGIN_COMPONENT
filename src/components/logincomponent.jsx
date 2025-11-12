import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosClient from "../Api/axios.client";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <Component {...props} router={{ navigate, location, params }} />;
    }
    return ComponentWithRouterProp;
}

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            Verifing: false,
            error: "",
            nonce: null, // <--- Guardamos el nonce
        };
        this.responseInterceptor = null;
    }

    componentDidMount() {
        this.responseInterceptor = axiosClient.interceptors.response.use(
            (response) => response,
            (err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            this.setState({ error: "Error 404: Not Found" });
                            break;
                        case 500:
                            this.setState({ error: "Error 500: Internal Server Error" });
                            break;
                        case 403:
                            this.setState({ error: "Unauthorized" });
                            break;
                        default:
                            this.setState({
                                error: `Error ${err.response.status}: ${err.response.statusText}`,
                            });
                    }
                } else if (err.request) {
                    this.setState({ error: "No response was received from the server" });
                } else {
                    this.setState({ error: `Error: ${err.message}` });
                }
                this.setState({ Verifing: false });
                return Promise.reject(err);
            }
        );
    }

    componentWillUnmount() {
        axiosClient.interceptors.response.eject(this.responseInterceptor);
    }

    decodeBase64URL = (base64url) => {
        const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
        const pad = base64.length % 4;
        const padded = base64 + (pad ? "=".repeat(4 - pad) : "");
        return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { user, password } = this.state;

        this.setState({ Verifing: true, error: "" });

        try {
            // SEND CREDENTIALS TO THE BACKEND
            const loginResponse = await axiosClient.post("/auth/login", { user, password });

            // SAVE THE NONCE
            const nonce = loginResponse.data?.token;
            this.setState({ nonce });
            console.log("Nonce recibido:", nonce);

            if (!nonce) throw new Error("No nonce received from backend");

            // SEND NONCE 
            const { data: options } = await axiosClient.post("/auth/webauthn", {
                purpose: "login-access",
                nonce, 
            });

            const publicKey = {
                ...options,
                challenge: this.decodeBase64URL(options.challenge),
                allowCredentials: options.allowCredentials?.map((cred) => ({
                    ...cred,
                    id: this.decodeBase64URL(cred.id),
                })),
            };

            // EXECUTE WEBAUTHN AUTHENTICATION
            const credential = await navigator.credentials.get({ publicKey });

            
            await axiosClient.post("/auth/web/authn/precheck/verify", {
                nonce, // <--- SEND THE NONCE
                id: credential.id,
                rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                type: credential.type,
                response: {
                    authenticatorData: btoa(
                        String.fromCharCode(...new Uint8Array(credential.response.authenticatorData))
                    ),
                    clientDataJSON: btoa(
                        String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))
                    ),
                    signature: btoa(
                        String.fromCharCode(...new Uint8Array(credential.response.signature))
                    ),
                    userHandle: credential.response.userHandle
                        ? btoa(
                            String.fromCharCode(
                                ...new Uint8Array(credential.response.userHandle)
                            )
                        )
                        : null,
                },
            });

            
            this.props.router.navigate("/securepage");

        } catch (err) {
            console.error("Error durante login + WebAuthn:", err);
        } finally {
            this.setState({ Verifing: false });
        }
    };

    render() {
        const { user, password, Verifing, error } = this.state;

        return (
            <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
                <h2>Iniciar Sesión</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={Verifing}>
                        {Verifing ? "Verifing..." : "Entrar"}
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginComponent);
