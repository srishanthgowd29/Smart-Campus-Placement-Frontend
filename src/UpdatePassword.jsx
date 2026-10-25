import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function UpdatePassword() {

    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const update = async (e) => {

        e.preventDefault()


        const username = localStorage.getItem("uname")


        if (!username) {
            navigate("/log")
            return
        }


        if (password.length < 6) {
            alert("Password must contain at least 6 characters")
            return
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }


        setLoading(true)


        try {

            const result = await axios.put(
                "http://localhost:8080/user/" +
                username +
                "/password",
                {
                    password: password
                },
                {
                    withCredentials: true
                }
            )


            alert(result.data)


            if (
                result.data ===
                "Password updated successfully"
            ) {

                setPassword("")
                setConfirmPassword("")

            }

        } catch (error) {

            console.log(
                "Password update error:",
                error
            )


            if (error.response) {

                alert(
                    error.response.data ||
                    "Password update failed"
                )

            } else if (error.request) {

                alert(
                    "Backend is not responding. Please start Spring Boot."
                )

            } else {

                alert(
                    "Password update failed. Please try again."
                )

            }

        } finally {

            setLoading(false)

        }
    }


    return (

        <div className="auth-page">

            <div className="password-box">

                <div className="auth-icon">
                    🔐
                </div>


                <h1>
                    Update Password
                </h1>


                <p className="auth-subtitle">
                    Create a new secure password for your account
                </p>


                <div className="password-info-box">

                    <span>
                        🛡️
                    </span>

                    <p>
                        Choose a password that is difficult
                        for others to guess.
                    </p>

                </div>


                <form onSubmit={update}>

                    <div className="form-group">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            minLength="6"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Re-enter new password"
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
                            ? "Updating Password..."
                            : "Update Password"
                        }

                    </button>

                </form>


                <div className="edit-links">

                    <Link to="/dboard">
                        ← Back to Dashboard
                    </Link>

                </div>


                <div className="password-security-info">

                    <span>
                        🔒
                    </span>

                    <p>
                        Your password is protected using
                        encrypted password storage.
                    </p>

                </div>

            </div>

        </div>

    )
}

export default UpdatePassword