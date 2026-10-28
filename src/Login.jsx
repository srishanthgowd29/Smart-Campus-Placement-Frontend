
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const API = "https://smart-campus-placement-backend.onrender.com"

function Login() {
    const navigate = useNavigate()

    const [data, setData] = useState({
        uname: "",
        psw: ""
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

        if (!data.uname || !data.psw) {
            alert("Please enter username and password")
            return
        }

        setLoading(true)

        try {
            // ADMIN LOGIN
            if (data.uname.trim() === "admin") {
                const adminResult = await axios.post(
                    `${API}/admin/login`,
                    {
                        username: data.uname.trim(),
                        password: data.psw
                    },
                    { withCredentials: true }
                )

                if (adminResult.data === "Admin login successful") {
                    navigate("/admin")
                    return
                }

                alert(adminResult.data)
                return
            }

            // STUDENT LOGIN
            const result = await axios.post(
                `${API}/login`,
                {
                    uname: data.uname.trim(),
                    psw: data.psw
                },
                { withCredentials: true }
            )

            if (
                typeof result.data === "string" ||
                !result.data?.username
            ) {
                alert(
                    typeof result.data === "string"
                        ? result.data
                        : "Login failed. Please try again."
                )
                return
            }

            localStorage.setItem("uname", result.data.username)
            navigate("/dboard")

        } catch (error) {
            console.error("Login error:", error)

            if (error.response) {
                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Login failed. Please try again."
                )
            } else {
                alert("Cannot connect to the backend. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-box">
                <div className="auth-icon">🎓</div>

                <h1>Student Login</h1>

                <p className="auth-subtitle">
                    Login to manage your campus placement journey
                </p>

                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="uname"
                            placeholder="Enter your username"
                            value={data.uname}
                            onChange={change}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="psw"
                            placeholder="Enter your password"
                            value={data.psw}
                            onChange={change}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/forgot">Forgot Password?</Link>

                    <span>Don't have a student account?</span>

                    <Link to="/reg">Create Student Account</Link>
                </div>

                <div className="login-info">
                    <span>🔒</span>
                    <p>
                        Your account information is protected
                        with secure authentication.
                    </p>
                </div>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}

export default Login
