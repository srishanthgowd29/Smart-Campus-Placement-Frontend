import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Jobs() {

    const [jobs, setJobs] = useState([])
    const [applications, setApplications] = useState([])
    const [userCgpa, setUserCgpa] = useState(0)
    const [userSkills, setUserSkills] = useState("")
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

                setUserCgpa(Number(userResult.data.cgpa) || 0)
                setUserSkills(userResult.data.skills || "")


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

                const myApps = applicationsResult.data.filter(
                    app => app.username === username
                )

                setApplications(myApps)

            } catch (error) {

                console.log("Jobs loading error:", error)

            } finally {

                setLoading(false)

            }
        }

        loadData()

    }, [navigate])


    const applyJob = async (jobId) => {

        const username = localStorage.getItem("uname")

        try {

            const result = await axios.post(
                "http://localhost:8080/apply",
                {
                    username: username,
                    jobId: jobId
                },
                {
                    withCredentials: true
                }
            )

            alert(result.data || "Application submitted successfully")

            setApplications(prevApplications => [

                ...prevApplications,

                {
                    jobId: jobId,
                    username: username,
                    status: "Applied"
                }

            ])

        } catch (error) {

            console.log("Application error:", error)

            alert(
                error.response?.data ||
                "Application failed"
            )
        }
    }


    const convertSkills = (skills) => {

        return (skills || "")
            .split(",")
            .map(skill => skill.trim().toLowerCase())
            .filter(skill => skill !== "")

    }


    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-icon">
                    💼
                </div>

                <h3>
                    Loading placement opportunities...
                </h3>

                <p>
                    Please wait while we find suitable jobs for you.
                </p>

            </div>
        )
    }


    return (

        <div className="jobs-page">

            {/* HEADER */}

            <div className="jobs-header">

                <div>

                    <p className="dashboard-label">
                        CAREER OPPORTUNITIES
                    </p>

                    <h1>
                        Available Jobs 💼
                    </h1>

                    <p>
                        Find placement opportunities that match your profile
                    </p>

                </div>

                <Link
                    to="/dboard"
                    className="back-dashboard"
                >
                    ← Dashboard
                </Link>

            </div>


            {/* PROFILE SUMMARY */}

            <div className="job-profile-summary">

                <div className="job-profile-item">

                    <span>
                        Your CGPA
                    </span>

                    <strong>
                        {userCgpa || "Not added"}
                    </strong>

                </div>


                <div className="job-profile-item skills-summary">

                    <span>
                        Your Skills
                    </span>

                    <strong>
                        {userSkills || "Not added"}
                    </strong>

                </div>

            </div>


            {/* JOB COUNT */}

            <div className="jobs-overview">

                <div>

                    <strong>
                        {jobs.length}
                    </strong>

                    <span>
                        Opportunities Available
                    </span>

                </div>

                <div>

                    <strong>
                        {applications.length}
                    </strong>

                    <span>
                        Applications Submitted
                    </span>

                </div>

            </div>


            {/* NO JOBS */}

            {jobs.length === 0 && (

                <div className="no-jobs">

                    <div className="no-jobs-icon">
                        📭
                    </div>

                    <h2>
                        No Jobs Available
                    </h2>

                    <p>
                        There are no placement opportunities available
                        right now.
                    </p>

                </div>

            )}


            {/* JOB LIST */}

            <div className="jobs-list">

                {jobs.map(job => {

                    const alreadyApplied = applications.some(
                        app =>
                            Number(app.jobId) === Number(job.id)
                    )


                    const eligible =
                        userCgpa >= Number(job.minCgpa)


                    const studentSkills =
                        convertSkills(userSkills)


                    const requiredSkills =
                        convertSkills(job.skills)


                    const matchingSkills =
                        requiredSkills.filter(
                            skill =>
                                studentSkills.includes(skill)
                        )


                    const missingSkills =
                        requiredSkills.filter(
                            skill =>
                                !studentSkills.includes(skill)
                        )


                    const skillMatch =
                        requiredSkills.length > 0
                            ? Math.round(
                                (
                                    matchingSkills.length /
                                    requiredSkills.length
                                ) * 100
                            )
                            : 0


                    return (

                        <div
                            key={job.id}
                            className="job-card"
                        >

                            {/* JOB HEADER */}

                            <div className="job-top">

                                <div>

                                    <p className="job-company-label">
                                        COMPANY
                                    </p>

                                    <h2>
                                        {job.company}
                                    </h2>

                                    <h3>
                                        {job.role}
                                    </h3>

                                </div>


                                <div className="package-badge">

                                    ₹{job.packageLpa} LPA

                                </div>

                            </div>


                            {/* JOB DETAILS */}

                            <div className="job-details">

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
                                        Your CGPA
                                    </span>

                                    <strong>
                                        {userCgpa || "Not added"}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Application Deadline
                                    </span>

                                    <strong>
                                        {job.lastDate}
                                    </strong>

                                </div>

                            </div>


                            {/* REQUIRED SKILLS */}

                            <div className="job-section">

                                <h4>
                                    Required Skills
                                </h4>

                                <div className="skill-tags">

                                    {requiredSkills.length > 0

                                        ? requiredSkills.map(
                                            skill => (

                                                <span key={skill}>
                                                    {skill}
                                                </span>

                                            )
                                        )

                                        : (

                                            <span>
                                                No specific skills mentioned
                                            </span>

                                        )
                                    }

                                </div>

                            </div>


                            {/* ELIGIBILITY */}

                            <div
                                className={
                                    eligible
                                        ? "eligibility eligible"
                                        : "eligibility not-eligible"
                                }
                            >

                                {eligible

                                    ? "✓ You meet the CGPA eligibility requirement"

                                    : "✕ You do not meet the CGPA eligibility requirement"

                                }

                            </div>


                            {/* SKILL MATCH */}

                            <div className="skill-match-section">

                                <div className="skill-match-header">

                                    <h4>
                                        Your Skill Match
                                    </h4>

                                    <strong>
                                        {skillMatch}%
                                    </strong>

                                </div>


                                <div className="skill-progress">

                                    <div
                                        className="skill-progress-fill"
                                        style={{
                                            width: `${skillMatch}%`
                                        }}
                                    >
                                    </div>

                                </div>


                                <div className="match-details">

                                    <div>

                                        <span>
                                            Matching Skills
                                        </span>

                                        <p>
                                            {matchingSkills.length > 0
                                                ? matchingSkills.join(", ")
                                                : "None"
                                            }
                                        </p>

                                    </div>


                                    <div>

                                        <span>
                                            Skills to Improve
                                        </span>

                                        <p>
                                            {missingSkills.length > 0
                                                ? missingSkills.join(", ")
                                                : "None"
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* APPLY */}

                            <div className="job-action">

                                {alreadyApplied ? (

                                    <button
                                        disabled
                                        className="applied-btn"
                                    >
                                        ✓ Already Applied
                                    </button>

                                ) : !eligible ? (

                                    <button
                                        disabled
                                        className="not-eligible-btn"
                                    >
                                        Not Eligible
                                    </button>

                                ) : (

                                    <button
                                        className="apply-btn"
                                        onClick={() =>
                                            applyJob(job.id)
                                        }
                                    >
                                        Apply Now →
                                    </button>

                                )}

                            </div>

                        </div>

                    )

                })}

            </div>


            {/* FOOTER */}

            <div className="dashboard-footer">

                <p>
                    Smart Campus Placement & Career Management System
                </p>

                <p>
                    Find opportunities. Build your career. Get placed.
                </p>

            </div>

        </div>
    )
}

export default Jobs