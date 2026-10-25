import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function UserDashboard() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        const username = localStorage.getItem("uname")

        if (!username) {
            navigate("/log")
            return
        }

        axios.get(
            "http://localhost:8080/user/" + username,
            {
                withCredentials: true
            }
        )
        .then(result => {

            if (
                typeof result.data === "string" &&
                result.data !== "User not found"
            ) {
                navigate("/log")
                return
            }

            setUser(result.data)
        })
        .catch(error => {
            console.log("Dashboard error:", error)

            if (error.response?.status === 401) {
                localStorage.removeItem("uname")
                navigate("/log")
            }
        })

    }, [navigate])


    const logout = () => {

        localStorage.removeItem("uname")

        navigate("/log")
    }


    if (!user) {

        return (
            <div className="dashboard-loading">

                <div className="loading-icon">
                    🎓
                </div>

                <h3>
                    Loading your dashboard...
                </h3>

                <p>
                    Please wait while we load your profile.
                </p>

            </div>
        )
    }


    const fields = [
        user.email,
        user.phone,
        user.branch,
        user.cgpa,
        user.skills,
        user.resume
    ]


    const completedFields = fields.filter(
        field =>
            field !== null &&
            field !== undefined &&
            field !== ""
    ).length


    const profileCompletion = Math.round(
        (completedFields / fields.length) * 100
    )


    return (

        <div className="dashboard-page">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        STUDENT PORTAL
                    </p>

                    <h1>
                        Welcome, {user.username} 👋
                    </h1>

                    <p>
                        Manage your profile and placement journey
                    </p>

                </div>


                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


            {/* QUICK STATS */}

            <div className="dashboard-stats">

                <div className="stat-card">

                    <div className="stat-icon">
                        🎓
                    </div>

                    <div>
                        <span>Branch</span>
                        <strong>
                            {user.branch || "Not Added"}
                        </strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        📊
                    </div>

                    <div>
                        <span>CGPA</span>
                        <strong>
                            {user.cgpa || "Not Added"}
                        </strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        💻
                    </div>

                    <div>
                        <span>Skills</span>
                        <strong>
                            {user.skills ? "Added" : "Not Added"}
                        </strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        📄
                    </div>

                    <div>
                        <span>Resume</span>
                        <strong>
                            {user.resume ? "Uploaded" : "Not Added"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* PROFILE COMPLETION */}

            <div className="dashboard-card completion-card">

                <div className="completion-top">

                    <div>

                        <h2>
                            Profile Completion
                        </h2>

                        <p>
                            Complete your profile to improve your
                            placement opportunities.
                        </p>

                    </div>


                    <div className="completion-number">
                        {profileCompletion}%
                    </div>

                </div>


                <div className="progress-background">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${profileCompletion}%`
                        }}
                    >
                    </div>

                </div>


                <p className="completion-message">

                    {profileCompletion === 100
                        ? "🎉 Your profile is complete!"
                        : "Complete the missing information to improve your profile."
                    }

                </p>

            </div>


            {/* STUDENT INFORMATION */}

            <div className="dashboard-card">

                <div className="section-heading">

                    <div>
                        <h2>
                            Student Information
                        </h2>

                        <p>
                            Your registered profile details
                        </p>
                    </div>

                    <span>
                        Profile
                    </span>

                </div>


                <div className="student-grid">

                    <div className="info-item">

                        <span>
                            Username
                        </span>

                        <strong>
                            {user.username}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            {user.email || "Not added"}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            Phone
                        </span>

                        <strong>
                            {user.phone || "Not added"}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            Branch
                        </span>

                        <strong>
                            {user.branch || "Not added"}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            CGPA
                        </span>

                        <strong>
                            {user.cgpa || "Not added"}
                        </strong>

                    </div>


                    <div className="info-item full-width">

                        <span>
                            Technical Skills
                        </span>

                        <strong>
                            {user.skills || "Not added"}
                        </strong>

                    </div>


                    <div className="info-item full-width">

                        <span>
                            Resume
                        </span>


                        {user.resume ? (

                            <a
                                href={user.resume}
                                target="_blank"
                                rel="noreferrer"
                            >
                                📄 View Resume
                            </a>

                        ) : (

                            <strong>
                                Not added
                            </strong>

                        )}

                    </div>

                </div>


                <div className="profile-edit-area">

                    <Link
                        to="/edit"
                        className="dashboard-edit-btn"
                    >
                        ✏️ Edit Profile
                    </Link>

                </div>

            </div>


            {/* PLACEMENT & CAREER */}

            <div className="dashboard-card">

                <div className="section-heading">

                    <div>

                        <h2>
                            Placement & Career
                        </h2>

                        <p>
                            Explore opportunities and manage your applications
                        </p>

                    </div>

                    <span>
                        Career
                    </span>

                </div>


                <div className="dashboard-actions">


                    <Link
                        to="/jobs"
                        className="dashboard-action primary"
                    >

                        <span className="action-icon">
                            💼
                        </span>

                        <div>

                            <strong>
                                Available Jobs
                            </strong>

                            <small>
                                Explore suitable placement opportunities
                            </small>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/placement"
                        className="dashboard-action"
                    >

                        <span className="action-icon">
                            🎯
                        </span>

                        <div>

                            <strong>
                                Placement Readiness
                            </strong>

                            <small>
                                Check your placement preparation
                            </small>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        to="/applications"
                        className="dashboard-action"
                    >

                        <span className="action-icon">
                            📋
                        </span>

                        <div>

                            <strong>
                                My Applications
                            </strong>

                            <small>
                                Track your job applications
                            </small>

                        </div>

                        <span className="action-arrow">
                            →
                        </span>

                    </Link>

                </div>

            </div>


            {/* ACCOUNT SETTINGS */}

            <div className="dashboard-card">

                <div className="section-heading">

                    <div>

                        <h2>
                            Account Settings
                        </h2>

                        <p>
                            Manage your account securely
                        </p>

                    </div>

                    <span>
                        Settings
                    </span>

                </div>


                <div className="settings-actions">

                    <Link to="/edit">
                        ✏️ Edit Profile
                    </Link>


                    <Link to="/password">
                        🔐 Update Password
                    </Link>


                    <Link
                        to="/delete"
                        className="danger-link"
                    >
                        🗑️ Delete Account
                    </Link>

                </div>

            </div>


            {/* FOOTER */}

            <div className="dashboard-footer">

                <p>
                    Smart Campus Placement & Career Management System
                </p>

                <p>
                    Student Portal • © 2026
                </p>

            </div>

        </div>
    )
}

export default UserDashboard