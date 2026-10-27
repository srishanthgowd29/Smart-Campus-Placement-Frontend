import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        branch: "",
        cgpa: "",
        skills: "",
        resume: ""
    })

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {

        e.preventDefault()

        if (data.password.length < 6) {
            alert("Password must contain at least 6 characters")
            return
        }

        if (data.phone && !/^[0-9]{10}$/.test(data.phone)) {
            alert("Please enter a valid 10-digit phone number")
            return
        }

        if (data.cgpa && (Number(data.cgpa) < 0 || Number(data.cgpa) > 10)) {
            alert("CGPA must be between 0 and 10")
            return
        }

        try {

            const result = await axios.post(
                "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/register",
                data
            )

            alert(result.data)

            if (result.data === "Registration successful") {

                setData({
                    username: "",
                    email: "",
                    password: "",
                    phone: "",
                    branch: "",
                    cgpa: "",
                    skills: "",
                    resume: ""
                })

                navigate("/log")
            }

        } catch (error) {

            console.log("Registration error:", error)

            alert(
                error.response?.data ||
                "Registration failed. Please try again."
            )
        }
    }

    return (
        <div className="auth-page">

            <div className="register-box">

                <div className="auth-icon">
                    🎓
                </div>

                <h1>Student Registration</h1>

                <p className="auth-subtitle">
                    Create your account for campus placement
                </p>

                <form onSubmit={submit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Username *</label>

                            <input
                                name="username"
                                placeholder="Enter your username"
                                value={data.username}
                                onChange={change}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>

                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={change}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password *</label>

                            <input
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={data.password}
                                onChange={change}
                                minLength="6"
                                required
                            />

                            <small className="form-help">
                                Minimum 6 characters
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>

                            <input
                                name="phone"
                                type="tel"
                                placeholder="10-digit phone number"
                                value={data.phone}
                                onChange={change}
                                maxLength="10"
                            />
                        </div>

                        <div className="form-group">
                            <label>Branch</label>

                            <select
                                name="branch"
                                value={data.branch}
                                onChange={change}
                            >
                                <option value="">
                                    Select your branch
                                </option>

                                <option value="CSE">
                                    Computer Science Engineering
                                </option>

                                <option value="CSE-DS">
                                    CSE - Data Science
                                </option>

                                <option value="CSE-AIML">
                                    CSE - AI & ML
                                </option>

                                <option value="ECE">
                                    Electronics & Communication
                                </option>

                                <option value="EEE">
                                    Electrical & Electronics
                                </option>

                                <option value="ME">
                                    Mechanical Engineering
                                </option>

                                <option value="CE">
                                    Civil Engineering
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>CGPA</label>

                            <input
                                name="cgpa"
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                placeholder="Example: 8.50"
                                value={data.cgpa}
                                onChange={change}
                            />
                        </div>

                    </div>

                    <div className="form-group">

                        <label>Technical Skills</label>

                        <textarea
                            name="skills"
                            placeholder="Example: Java, Python, SQL, React"
                            value={data.skills}
                            onChange={change}
                            rows="3"
                        />

                        <small className="form-help">
                            Add skills that you know.
                        </small>

                    </div>

                    <div className="form-group">

                        <label>Resume Link</label>

                        <input
                            name="resume"
                            type="url"
                            placeholder="Paste Google Drive resume link"
                            value={data.resume}
                            onChange={change}
                        />

                        <small className="form-help">
                            You can add your Google Drive resume link.
                        </small>

                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Create Student Account
                    </button>

                </form>

                <div className="auth-links">

                    <span>
                        Already have an account?
                    </span>

                    <Link to="/log">
                        Login
                    </Link>

                </div>

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    )
}

export default Register