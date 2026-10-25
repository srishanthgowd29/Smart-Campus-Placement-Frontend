import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function ForgotPassword() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)

    const change = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const submit = async (e) => {

        e.preventDefault()


        if (
            !data.username ||
            !data.email ||
            !data.newPassword ||
            !data.confirmPassword
        ) {
            alert("Please fill all fields")
            return
        }


        if (data.newPassword.length < 6) {
            alert("Password must contain at least 6 characters")
            return
        }


        if (data.newPassword !== data.confirmPassword) {
            alert("Passwords do not match")
            return
        }


        setLoading(true)


        try {

            const result = await axios.put(
                "http://localhost:8080/forgot-password",
                {
                    username: data.username,
                    email: data.email,
                    newPassword: data.newPassword
                }
            )


            const message =
                typeof result.data === "string"
                    ? result.data
                    : result.data?.message ||
                      "Password reset completed"


            alert(message)


            if (message === "Password reset successful") {

                setData({
                    username: "",
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })

                navigate("/log")
            }


        } catch (error) {

            console.log(
                "Password reset error:",
                error
            )


            let errorMessage =
                "Password reset failed"


            if (error.response) {

                const responseData =
                    error.response.data


                if (typeof responseData === "string") {

                    errorMessage =
                        responseData

                }
                else if (responseData?.message) {

                    errorMessage =
                        responseData.message

                }
                else {

                    errorMessage =
                        "Unable to reset password"

                }

            }
            else if (error.request) {

                errorMessage =
                    "Backend is not responding. Please start Spring Boot."

            }
            else {

                errorMessage =
                    "Unable to reset password. Please try again."

            }


            alert(errorMessage)


        } finally {

            setLoading(false)

        }
    }


    return (

        <div className="auth-page">

            <div className="forgot-password-box">

                <div className="auth-icon">
                    🔐
                </div>


                <h1>
                    Reset Password
                </h1>


                <p className="auth-subtitle">
                    Verify your account and create a new password
                </p>


                <div className="password-info-box">

                    <span>
                        🔒
                    </span>

                    <p>
                        Enter your registered username and email
                        to reset your password securely.
                    </p>

                </div>


                <form onSubmit={submit}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={data.username}
                            onChange={change}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Registered Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your registered email"
                            value={data.email}
                            onChange={change}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            New Password
                        </label>

                        <input
                            name="newPassword"
                            type="password"
                            placeholder="Enter your new password"
                            value={data.newPassword}
                            onChange={change}
                            minLength="6"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your new password"
                            value={data.confirmPassword}
                            onChange={change}
                            minLength="6"
                            required
                        />

                    </div>


                    <p className="password-hint">
                        Password must contain at least 6 characters.
                    </p>


                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"
                        }

                    </button>

                </form>


                <div className="forgot-links">

                    <Link to="/log">
                        ← Back to Login
                    </Link>

                </div>


                <div className="password-security-info">

                    <span>
                        🛡️
                    </span>

                    <p>
                        Your new password is securely stored
                        using encrypted password protection.
                    </p>

                </div>

            </div>

        </div>

    )
}

export default ForgotPassword