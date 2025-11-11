import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Api/axios.client";

export default function SECUREGATE() {
    const [Verifing, setVerifing] = useState(false); 
    const [error, setError] = useState(false);
    const navigate = useNavigate(); 

    // -----------------------------
    // INTERCEPTOR OF AXIOS
    // -----------------------------
    useEffect(() => {
        const responseInterceptor = axiosClient.interceptors.response.use(
            response => response, // Passthrough si es exitoso
            err => {
                // MANEJO DE ERRORES HTTP
                if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            setError("Error 404: Not Found");
                            break;
                        case 500:
                            setError("Error 500: Internal Server Error");
                            break;
                        case 403:
                            setError("Unauthorized");
                            break;
                        default:
                            setError(`Error ${err.response.status}: ${err.response.statusText}`);
                    }
                } else if (err.request) {
                    setError("No se recibió respuesta del servidor");
                } else {
                    setError(`Error: ${err.message}`);
                }
                setVerifing(false);
                return Promise.reject(err); // Para no bloquear la cadena de promesas
            }
        );

        
        return () => {
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    const decodeBase64URL = (base64url) => {
        // CONVERT BASE64 TO BASE64 STANDAR REPLACE + FOR - && / FOR _
        const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
        const pad = base64.length % 4;
        /* 
        Base64 requires that the length be a multiple of 4.
        If it isn't, equal signs (=) are added at the end for padding.
        */
        const padded = base64 + (pad ? "=".repeat(4 - pad) : "");
        // DECODE TO BYTES
        return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();
        setVerifing(true);
        setError("");

        try {
            // CHALLENGE TO THE BACKEND
            const { data: options } = await axiosClient.post("/webauthn", { purpose: "login-access" });

            const publicKey = {
                ...options,
                challenge: decodeBase64URL(options.challenge),
                allowCredentials: options.allowCredentials?.map((cred) => ({
                    ...cred,
                    id: decodeBase64URL(cred.id),
                })),
            };

            // EXECUTE WEBAUTHN
            const credential = await navigator.credentials.get({ publicKey });

            // VERIFY ON BACKEND
            await axiosClient.post("/web/authn/precheck/verify", {
                id: credential.id,
                // ARRAY BUFFER : ID IN BYTES to STRING
                rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                type: credential.type,
                response: {
                    authenticatorData: btoa(String.fromCharCode(...new Uint8Array(credential.response.authenticatorData))),
                    clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))),
                    signature: btoa(String.fromCharCode(...new Uint8Array(credential.response.signature))),
                    userHandle: credential.response.userHandle
                        ? btoa(String.fromCharCode(...new Uint8Array(credential.response.userHandle)))
                        : null,
                }
            });

            // IF PASS NAVIGATE TO LOGIN COMPONENT
            navigate("/login");

        } catch (err) {
            console.error("Error en pre-check WebAuthn:", err);
            // the interceptor handles the error message
        } finally {
            setVerifing(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <h2 className="text-xl font-semibold">Welcome</h2>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={handleLoginClick}
                    disabled={Verifing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {Verifing ? "Verifing..." : "LOGIN"}
                </button>
            </div>
        </>
    );
}