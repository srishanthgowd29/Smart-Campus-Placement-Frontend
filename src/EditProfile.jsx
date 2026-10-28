import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function EditProfile() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
        branch: "",
        cgpa: "",
        skills: "",
        resume: ""
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {

        const username = localStorage.getItem("uname")

        if (!username) {
            navigate("/log")
            return
        }

        axios.get(
            "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/user/" + username,
            {
                withCredentials: true
            }
        )
        .then(result => {

            if (typeof result.data === "string") {
                alert(result.data)
                navigate("/log")
                return
            }

            setData(result.data)
            setLoading(false)

        })
        .catch(error => {

            console.log("Profile loading error:", error)

            alert(
                error.response?.data ||
                "Unable to load your profile"
            )

            setLoading(false)
        })

    }, [navigate])


    const change = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const update = async (e) => {

        e.preventDefault()

        const username = localStorage.getItem("uname")

        if (!username) {
            navigate("/log")
            return
        }


        if (!data.email) {
            alert("Email is required")
            return
        }


        if (
            data.phone &&
            !/^[0-9]{10}$/.test(data.phone)
        ) {
            alert("Please enter a valid 10-digit phone number")
            return
        }


        if (
            data.cgpa !== "" &&
            (Number(data.cgpa) < 0 ||
             Number(data.cgpa) > 10)
        ) {
            alert("CGPA must be between 0 and 10")
            return
        }


        setSaving(true)

        try {

            const result = await axios.put(
                "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/user/" + username,
                data,
                {
                    withCredentials: true
                }
            )

            alert(result.data)

            if (
                result.data ===
                "Profile updated successfully"
            ) {
                navigate("/dboard")
            }

        } catch (error) {

            console.log("Profile update error:", error)

            alert(
                error.response?.data ||
                "Profile update failed"
            )

        } finally {

            setSaving(false)
        }
    }


    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-icon">
                    ✏️
                </div>

                <h3>
                    Loading your profile...
                </h3>

                <p>
                    Please wait.
                </p>

            </div>
        )
    }


    return (

        <div className="auth-page">

            <div className="edit-profile-box">

                {/* HEADER */}

                <div className="auth-icon">
                    ✏️
                </div>

                <h1>
                    Edit Profile
                </h1>

                <p className="auth-subtitle">
                    Keep your placement profile up to date
                </p>


                {/* PROFILE INFORMATION */}

                <div className="profile-info-banner">

                    <span>
                        👤
                    </span>

                    <div>

                        <strong>
                            {data.username}
                        </strong>

                        <small>
                            Student Profile
                        </small>

                    </div>

                </div>


                <form onSubmit={update}>

                    {/* BASIC INFORMATION */}

                    <div className="edit-section-title">

                        <h2>
                            Basic Information
                        </h2>

                        <p>
                            Update your contact and academic details.
                        </p>

                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Email *
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={data.email || ""}
                                onChange={change}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                name="phone"
                                type="tel"
                                value={data.phone || ""}
                                onChange={change}
                                placeholder="10-digit phone number"
                                maxLength="10"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Branch
                            </label>

                            <select
                                name="branch"
                                value={data.branch || ""}
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

                            <label>
                                CGPA
                            </label>

                            <input
                                name="cgpa"
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                value={data.cgpa || ""}
                                onChange={change}
                                placeholder="Example: 8.50"
                            />

                        </div>

                    </div>


                    {/* SKILLS */}

                    <div className="edit-section-title">

                        <h2>
                            Career Information
                        </h2>

                        <p>
                            Add your technical skills and resume.
                        </p>

                    </div>


                    <div className="form-group">

                        <label>
                            Technical Skills
                        </label>

                        <textarea
                            name="skills"
                            value={data.skills || ""}
                            onChange={change}
                            placeholder="Example: Java, Python, SQL, React"
                            rows="4"
                        />

                        <small className="form-help">
                            Add the technologies and skills you know.
                        </small>

                    </div>


                    <div className="form-group">

                        <label>
                            Resume Link
                        </label>

                        <input
                            name="resume"
                            type="url"
                            value={data.resume || ""}
                            onChange={change}
                            placeholder="Paste your Google Drive resume link"
                        />

                        <small className="form-help">
                            Make sure your resume link is accessible.
                        </small>

                    </div>


                    {/* BUTTONS */}

                    <div className="edit-button-row">

                        <Link
                            to="/dboard"
                            className="cancel-btn"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving Changes..."
                                : "Save Changes"
                            }
                        </button>

                    </div>

                </form>


                {/* SECURITY MESSAGE */}

                <div className="profile-security-info">

                    <span>
                        🔒
                    </span>

                    <p>
                        Your profile information is visible only
                        to you and authorized placement administrators.
                    </p>

                </div>


                <div className="edit-links">

                    <Link to="/dboard">
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default EditProfile