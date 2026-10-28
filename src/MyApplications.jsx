import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function MyApplications() {

    const [applications, setApplications] = useState([])
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    useEffect(() => {

        const username = localStorage.getItem("uname")

        if (!username) {
            navigate("/log")
            return
        }


        const loadApplications = async () => {

            try {

                const applicationsResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/applications",
                    {
                        withCredentials: true
                    }
                )


                const myApps =
                    applicationsResult.data.filter(
                        app =>
                            app.username === username
                    )


                setApplications(myApps)


                const jobsResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/jobs"
                )


                setJobs(jobsResult.data)

            } catch (error) {

                console.log(
                    "Applications loading error:",
                    error
                )

            } finally {

                setLoading(false)

            }
        }


        loadApplications()

    }, [navigate])


    const getStatusClass = (status) => {

        if (status === "Selected") {
            return "status-selected"
        }

        if (status === "Rejected") {
            return "status-rejected"
        }

        return "status-pending"
    }


    const getStatusMessage = (status) => {

        if (status === "Selected") {
            return "🎉 Congratulations! You have been selected."
        }

        if (status === "Rejected") {
            return "Application closed"
        }

        return "⏳ Your application is awaiting a decision."
    }


    const selectedCount =
        applications.filter(
            app => app.status === "Selected"
        ).length


    const rejectedCount =
        applications.filter(
            app => app.status === "Rejected"
        ).length


    const pendingCount =
        applications.filter(
            app =>
                app.status !== "Selected" &&
                app.status !== "Rejected"
        ).length


    if (loading) {

        return (

            <div className="dashboard-loading">

                <div className="loading-icon">
                    📋
                </div>

                <h3>
                    Loading your applications...
                </h3>

                <p>
                    Please wait while we retrieve your placement applications.
                </p>

            </div>

        )
    }


    return (

        <div className="applications-page">

            {/* HEADER */}

            <div className="applications-header">

                <div>

                    <p className="dashboard-label">
                        APPLICATION TRACKER
                    </p>

                    <h1>
                        My Applications 📋
                    </h1>

                    <p>
                        Track the progress of your placement applications
                    </p>

                </div>


                <Link
                    to="/dboard"
                    className="back-dashboard"
                >
                    ← Dashboard
                </Link>

            </div>


            {/* SUMMARY */}

            <div className="applications-summary">

                <div className="application-summary-card">

                    <span>
                        Total Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>


                <div className="application-summary-card">

                    <span>
                        Selected
                    </span>

                    <strong>
                        {selectedCount}
                    </strong>

                </div>


                <div className="application-summary-card">

                    <span>
                        Pending
                    </span>

                    <strong>
                        {pendingCount}
                    </strong>

                </div>


                <div className="application-summary-card">

                    <span>
                        Rejected
                    </span>

                    <strong>
                        {rejectedCount}
                    </strong>

                </div>

            </div>


            {/* SUCCESS MESSAGE */}

            {selectedCount > 0 && (

                <div className="selection-banner">

                    <span>
                        🎉
                    </span>

                    <div>

                        <strong>
                            Congratulations!
                        </strong>

                        <p>
                            You have been selected for {selectedCount}
                            {" "}
                            {selectedCount === 1
                                ? "opportunity"
                                : "opportunities"
                            }.
                        </p>

                    </div>

                </div>

            )}


            {/* EMPTY STATE */}

            {applications.length === 0 && (

                <div className="empty-applications">

                    <div className="empty-icon">
                        📭
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any jobs yet.
                        Explore available opportunities and start
                        building your career.
                    </p>

                    <Link
                        to="/jobs"
                        className="browse-jobs-btn"
                    >
                        Browse Available Jobs →
                    </Link>

                </div>

            )}


            {/* APPLICATION LIST */}

            <div className="applications-list">

                {applications.map(app => {

                    const job = jobs.find(
                        j =>
                            Number(j.id) ===
                            Number(app.jobId)
                    )


                    return (

                        <div
                            key={app.id}
                            className="application-card"
                        >

                            {/* APPLICATION HEADER */}

                            <div className="application-top">

                                <div>

                                    <p className="application-label">
                                        APPLICATION #{app.id}
                                    </p>

                                    <h2>
                                        {job
                                            ? job.company
                                            : "Job Opportunity"
                                        }
                                    </h2>


                                    {job && (

                                        <h3>
                                            {job.role}
                                        </h3>

                                    )}

                                </div>


                                <span
                                    className={
                                        `application-status ${
                                            getStatusClass(app.status)
                                        }`
                                    }
                                >
                                    {app.status || "Pending"}
                                </span>

                            </div>


                            {/* JOB DETAILS */}

                            {job && (

                                <div className="application-details">

                                    <div>

                                        <span>
                                            Package
                                        </span>

                                        <strong>
                                            ₹{job.packageLpa} LPA
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Applied Date
                                        </span>

                                        <strong>
                                            {app.appliedDate || "Not available"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Minimum CGPA
                                        </span>

                                        <strong>
                                            {job.minCgpa}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Application Status
                                        </span>

                                        <strong>
                                            {app.status || "Pending"}
                                        </strong>

                                    </div>

                                </div>

                            )}


                            {/* STATUS TIMELINE */}

                            <div className="application-progress">

                                <div
                                    className={
                                        app.status === "Rejected"
                                            ? "progress-step completed"
                                            : "progress-step completed"
                                    }
                                >

                                    <span>
                                        ✓
                                    </span>

                                    <small>
                                        Applied
                                    </small>

                                </div>


                                <div
                                    className={
                                        app.status === "Pending" ||
                                        !app.status
                                            ? "progress-line"
                                            : "progress-line active"
                                    }
                                >
                                </div>


                                <div
                                    className={
                                        app.status === "Selected" ||
                                        app.status === "Rejected"
                                            ? "progress-step completed"
                                            : "progress-step"
                                    }
                                >

                                    <span>
                                        {app.status === "Selected"
                                            ? "✓"
                                            : app.status === "Rejected"
                                            ? "✕"
                                            : "2"
                                        }
                                    </span>

                                    <small>
                                        Screening
                                    </small>

                                </div>


                                <div
                                    className={
                                        app.status === "Selected"
                                            ? "progress-line active"
                                            : "progress-line"
                                    }
                                >
                                </div>


                                <div
                                    className={
                                        app.status === "Selected"
                                            ? "progress-step completed"
                                            : "progress-step"
                                    }
                                >

                                    <span>
                                        {app.status === "Selected"
                                            ? "✓"
                                            : "3"
                                        }
                                    </span>

                                    <small>
                                        Final Decision
                                    </small>

                                </div>

                            </div>


                            {/* FOOTER */}

                            <div className="application-footer">

                                <span>
                                    Application ID: #{app.id}
                                </span>

                                <span
                                    className={
                                        getStatusClass(app.status)
                                    }
                                >
                                    {getStatusMessage(app.status)}
                                </span>

                            </div>

                        </div>

                    )

                })}

            </div>


            {/* ACTIONS */}

            {applications.length > 0 && (

                <div className="application-actions">

                    <Link
                        to="/jobs"
                        className="browse-jobs-btn"
                    >
                        💼 Explore More Jobs
                    </Link>

                    <Link
                        to="/dboard"
                        className="application-dashboard-btn"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            )}


            {/* FOOTER */}

            <div className="dashboard-footer">

                <p>
                    Smart Campus Placement & Career Management System
                </p>

                <p>
                    Track your journey. Build your career. Get placed.
                </p>

            </div>

        </div>

    )
}

export default MyApplications