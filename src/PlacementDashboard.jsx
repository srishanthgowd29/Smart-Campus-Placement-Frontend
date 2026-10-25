import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function PlacementDashboard() {

    const [user, setUser] = useState({})
    const [jobs, setJobs] = useState([])
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {

        const username = localStorage.getItem("uname")

        if (!username) {
            navigate("/log")
            return
        }

        const loadData = async () => {

            try {

                const userResult = await axios.get(
                    "http://localhost:8080/user/" + username,
                    {
                        withCredentials: true
                    }
                )

                if (typeof userResult.data === "string") {
                    navigate("/log")
                    return
                }

                setUser(userResult.data)


                const jobsResult = await axios.get(
                    "http://localhost:8080/jobs"
                )

                setJobs(jobsResult.data)


                const applicationsResult = await axios.get(
                    "http://localhost:8080/applications",
                    {
                        withCredentials: true
                    }
                )

                const myApplications =
                    applicationsResult.data.filter(
                        app => app.username === username
                    )

                setApplications(myApplications)

            } catch (error) {

                console.log(
                    "Placement dashboard error:",
                    error
                )

            } finally {

                setLoading(false)

            }
        }

        loadData()

    }, [navigate])


    /*
     * PROFILE COMPLETION
     */

    const profileFields = [
        user.username,
        user.email,
        user.phone,
        user.branch,
        user.cgpa,
        user.skills,
        user.resume
    ]

    const completedFields =
        profileFields.filter(
            field =>
                field !== null &&
                field !== undefined &&
                String(field).trim() !== ""
        ).length


    const profilePercentage = Math.round(
        (completedFields / profileFields.length) * 100
    )


    /*
     * SKILLS AND RESUME
     */

    const hasSkills =
        user.skills &&
        user.skills.trim() !== ""


    const hasResume =
        user.resume &&
        user.resume.trim() !== ""


    /*
     * READINESS SCORE
     */

    const readinessScore = Math.round(
        (profilePercentage * 0.4) +
        (hasSkills ? 30 : 0) +
        (hasResume ? 30 : 0)
    )


    const getReadinessMessage = () => {

        if (readinessScore >= 80) {
            return "Excellent! You are getting placement ready 🚀"
        }

        if (readinessScore >= 50) {
            return "Good progress! Improve your profile and skills 💪"
        }

        return "Keep learning and complete your profile 📚"
    }


    /*
     * LOADING
     */

    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-icon">
                    🎯
                </div>

                <h3>
                    Preparing your placement dashboard...
                </h3>

                <p>
                    Please wait while we check your placement readiness.
                </p>

            </div>
        )
    }


    return (

        <div className="placement-page">

            {/* HEADER */}

            <div className="placement-header">

                <div>

                    <p className="dashboard-label">
                        PLACEMENT PREPARATION
                    </p>

                    <h1>
                        Placement Readiness 🎯
                    </h1>

                    <p>
                        Welcome, {user.username || "Student"} 👋
                    </p>

                </div>

                <Link
                    to="/dboard"
                    className="back-dashboard"
                >
                    ← Dashboard
                </Link>

            </div>


            {/* READINESS SCORE */}

            <div className="readiness-card">

                <div className="readiness-content">

                    <div>

                        <p className="readiness-label">
                            YOUR PLACEMENT READINESS
                        </p>

                        <h2>
                            Placement Readiness Score
                        </h2>

                        <p>
                            Based on your profile, skills and resume
                        </p>

                        <strong className="readiness-message">
                            {getReadinessMessage()}
                        </strong>

                    </div>

                    <div className="readiness-score">

                        {readinessScore}

                        <span>
                            /100
                        </span>

                    </div>

                </div>


                <div className="readiness-progress">

                    <div
                        className="readiness-progress-fill"
                        style={{
                            width: `${readinessScore}%`
                        }}
                    >
                    </div>

                </div>

            </div>


            {/* PROFILE COMPLETION */}

            <div className="placement-card">

                <div className="placement-section-heading">

                    <div>

                        <h2>
                            Profile Completion
                        </h2>

                        <p>
                            Complete your profile to improve your readiness.
                        </p>

                    </div>

                    <strong className="percentage-number">
                        {profilePercentage}%
                    </strong>

                </div>


                <div className="profile-progress">

                    <div
                        className="profile-progress-fill"
                        style={{
                            width: `${profilePercentage}%`
                        }}
                    >
                    </div>

                </div>

            </div>


            {/* SUMMARY CARDS */}

            <div className="placement-stats">

                <div className="placement-stat-card">

                    <div className="stat-icon">
                        📊
                    </div>

                    <span>
                        Your CGPA
                    </span>

                    <strong>
                        {user.cgpa || "Not Added"}
                    </strong>

                </div>


                <div className="placement-stat-card">

                    <div className="stat-icon">
                        💻
                    </div>

                    <span>
                        Your Skills
                    </span>

                    <strong className="skills-value">
                        {user.skills || "Not Added"}
                    </strong>

                </div>


                <div className="placement-stat-card">

                    <div className="stat-icon">
                        💼
                    </div>

                    <span>
                        Available Jobs
                    </span>

                    <strong>
                        {jobs.length}
                    </strong>

                </div>


                <div className="placement-stat-card">

                    <div className="stat-icon">
                        📄
                    </div>

                    <span>
                        Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>

            </div>


            {/* READINESS CHECKLIST */}

            <div className="placement-card">

                <div className="placement-section-heading">

                    <div>

                        <h2>
                            Readiness Checklist
                        </h2>

                        <p>
                            Check the important parts of your placement profile.
                        </p>

                    </div>

                </div>


                <div className="readiness-checklist">

                    <div
                        className={
                            user.username
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {user.username ? "✓" : "○"}
                        </span>

                        Username

                    </div>


                    <div
                        className={
                            user.email
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {user.email ? "✓" : "○"}
                        </span>

                        Email

                    </div>


                    <div
                        className={
                            user.phone
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {user.phone ? "✓" : "○"}
                        </span>

                        Phone Number

                    </div>


                    <div
                        className={
                            user.branch
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {user.branch ? "✓" : "○"}
                        </span>

                        Branch

                    </div>


                    <div
                        className={
                            user.cgpa !== null &&
                            user.cgpa !== undefined &&
                            user.cgpa !== ""
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {
                                user.cgpa !== null &&
                                user.cgpa !== undefined &&
                                user.cgpa !== ""
                                    ? "✓"
                                    : "○"
                            }
                        </span>

                        CGPA

                    </div>


                    <div
                        className={
                            hasSkills
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {hasSkills ? "✓" : "○"}
                        </span>

                        Skills

                    </div>


                    <div
                        className={
                            hasResume
                                ? "check-item completed"
                                : "check-item"
                        }
                    >

                        <span>
                            {hasResume ? "✓" : "○"}
                        </span>

                        Resume

                    </div>

                </div>

            </div>


            {/* PROFILE INFORMATION */}

            <div className="placement-card">

                <div className="placement-section-heading">

                    <div>

                        <h2>
                            Profile Information
                        </h2>

                        <p>
                            Your current placement profile details.
                        </p>

                    </div>


                    <Link
                        to="/edit"
                        className="edit-profile-link"
                    >
                        Edit Profile
                    </Link>

                </div>


                <div className="placement-profile-grid">

                    <div>

                        <span>
                            Username
                        </span>

                        <strong>
                            {user.username || "Not Added"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Email
                        </span>

                        <strong>
                            {user.email || "Not Added"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Phone
                        </span>

                        <strong>
                            {user.phone || "Not Added"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Branch
                        </span>

                        <strong>
                            {user.branch || "Not Added"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            CGPA
                        </span>

                        <strong>
                            {user.cgpa || "Not Added"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Resume
                        </span>

                        {hasResume ? (

                            <a
                                href={user.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📄 View Resume
                            </a>

                        ) : (

                            <strong>
                                Not Added
                            </strong>

                        )}

                    </div>


                    <div className="placement-profile-full">

                        <span>
                            Skills
                        </span>

                        <strong>
                            {user.skills || "Not Added"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* PLACEMENT ACTIONS */}

            <div className="placement-card">

                <div className="placement-section-heading">

                    <div>

                        <h2>
                            Placement Actions
                        </h2>

                        <p>
                            Continue your placement preparation.
                        </p>

                    </div>

                </div>


                <div className="placement-actions">

                    <Link to="/jobs">

                        💼

                        <span>

                            <strong>
                                Browse Jobs
                            </strong>

                            <small>
                                Find suitable opportunities
                            </small>

                        </span>

                    </Link>


                    <Link to="/applications">

                        📋

                        <span>

                            <strong>
                                My Applications
                            </strong>

                            <small>
                                Track application status
                            </small>

                        </span>

                    </Link>


                    <Link to="/edit">

                        ✏️

                        <span>

                            <strong>
                                Update Profile
                            </strong>

                            <small>
                                Keep your information updated
                            </small>

                        </span>

                    </Link>

                </div>

            </div>


            {/* FOOTER */}

            <div className="dashboard-footer">

                <p>
                    Smart Campus Placement & Career Management System
                </p>

                <p>
                    Prepare your profile. Apply for jobs. Get placed.
                </p>

            </div>

        </div>
    )
}

export default PlacementDashboard