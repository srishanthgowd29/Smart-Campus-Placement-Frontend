import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Admin() {

    const navigate = useNavigate()

    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [skills, setSkills] = useState("")
    const [minCgpa, setMinCgpa] = useState("")
    const [packageLpa, setPackageLpa] = useState("")
    const [lastDate, setLastDate] = useState("")

    const [users, setUsers] = useState([])
    const [applications, setApplications] = useState([])
    const [jobs, setJobs] = useState([])

    const [loading, setLoading] = useState(true)
    const [addingJob, setAddingJob] = useState(false)


    useEffect(() => {

        const loadAdminData = async () => {

            try {

                const checkResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/admin/check",
                    {
                        withCredentials: true
                    }
                )


                if (
                    checkResult.data !==
                    "Admin authenticated"
                ) {
                    navigate("/log")
                    return
                }


                const usersResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/users",
                    {
                        withCredentials: true
                    }
                )

                setUsers(usersResult.data)


                const applicationsResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/applications",
                    {
                        withCredentials: true
                    }
                )

                setApplications(
                    applicationsResult.data
                )


                const jobsResult = await axios.get(
                    "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/jobs",
                    {
                        withCredentials: true
                    }
                )

                setJobs(jobsResult.data)

            } catch (error) {

                console.log(
                    "Admin dashboard error:",
                    error
                )

                navigate("/log")

            } finally {

                setLoading(false)

            }
        }


        loadAdminData()

    }, [navigate])


    /*
     * APPLICATION STATISTICS
     */

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
                app.status === "Applied" ||
                app.status === "Shortlisted" ||
                !app.status
        ).length


    /*
     * ADD JOB
     */

    const addJob = async () => {

        if (
            !company ||
            !role ||
            !skills ||
            !minCgpa ||
            !packageLpa ||
            !lastDate
        ) {

            alert(
                "Please fill all job details"
            )

            return
        }


        if (
            Number(minCgpa) < 0 ||
            Number(minCgpa) > 10
        ) {

            alert(
                "Minimum CGPA must be between 0 and 10"
            )

            return
        }


        if (Number(packageLpa) <= 0) {

            alert(
                "Package must be greater than 0"
            )

            return
        }


        setAddingJob(true)


        try {

            const result = await axios.post(
                "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/job",
                {
                    company: company,
                    role: role,
                    skills: skills,
                    minCgpa: Number(minCgpa),
                    packageLpa: Number(packageLpa),
                    lastDate: lastDate
                },
                {
                    withCredentials: true
                }
            )


            alert(
                "Job added successfully"
            )


            setJobs(prevJobs => [
                ...prevJobs,
                result.data
            ])


            setCompany("")
            setRole("")
            setSkills("")
            setMinCgpa("")
            setPackageLpa("")
            setLastDate("")

        } catch (error) {

            console.log(
                "Add job error:",
                error
            )

            alert(
                error.response?.data ||
                "Failed to add job"
            )

        } finally {

            setAddingJob(false)

        }
    }


    /*
     * UPDATE APPLICATION STATUS
     */

    const updateStatus = async (
        id,
        status
    ) => {

        try {

            await axios.put(
                "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/application/" +
                id +
                "/status",
                {
                    status: status
                },
                {
                    withCredentials: true
                }
            )


            alert(
                "Status updated successfully"
            )


            setApplications(
                prevApplications =>
                    prevApplications.map(app =>
                        app.id === id
                            ? {
                                ...app,
                                status: status
                            }
                            : app
                    )
            )

        } catch (error) {

            console.log(
                "Status update error:",
                error
            )

            alert(
                error.response?.data ||
                "Failed to update status"
            )

        }
    }


    /*
     * ADMIN LOGOUT
     */

    const logout = async () => {

        try {

            await axios.post(
                "[https://smart-campus-placement-backend.onrender.com](https://smart-campus-placement-backend.onrender.com)/admin/logout",
                {},
                {
                    withCredentials: true
                }
            )

        } catch (error) {

            console.log(
                "Admin logout error:",
                error
            )

        }

        navigate("/log")
    }


    /*
     * LOADING
     */

    if (loading) {

        return (

            <div className="dashboard-loading">

                <div className="loading-icon">
                    👨‍💼
                </div>

                <h3>
                    Loading Admin Dashboard...
                </h3>

                <p>
                    Please wait while we load administration data.
                </p>

            </div>

        )
    }


    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-header">

                <div>

                    <p className="dashboard-label">
                        ADMINISTRATION
                    </p>

                    <h1>
                        Admin Dashboard 👨‍💼
                    </h1>

                    <p>
                        Manage students, jobs and placement applications
                    </p>

                </div>


                <button
                    className="admin-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


            {/* MAIN STATISTICS */}

            <div className="admin-stats">

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        👨‍🎓
                    </div>

                    <span>
                        Registered Students
                    </span>

                    <strong>
                        {users.length}
                    </strong>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        💼
                    </div>

                    <span>
                        Available Jobs
                    </span>

                    <strong>
                        {jobs.length}
                    </strong>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📋
                    </div>

                    <span>
                        Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>

            </div>


            {/* APPLICATION STATUS STATISTICS */}

            <div className="admin-status-stats">

                <div className="admin-status-card">

                    <span>
                        ⏳
                    </span>

                    <div>

                        <strong>
                            {pendingCount}
                        </strong>

                        <small>
                            Pending
                        </small>

                    </div>

                </div>


                <div className="admin-status-card">

                    <span>
                        🎉
                    </span>

                    <div>

                        <strong>
                            {selectedCount}
                        </strong>

                        <small>
                            Selected
                        </small>

                    </div>

                </div>


                <div className="admin-status-card">

                    <span>
                        ❌
                    </span>

                    <div>

                        <strong>
                            {rejectedCount}
                        </strong>

                        <small>
                            Rejected
                        </small>

                    </div>

                </div>

            </div>


            {/* STUDENTS */}

            <div className="admin-card">

                <div className="admin-section-heading">

                    <div>

                        <h2>
                            Registered Students 👨‍🎓
                        </h2>

                        <p>
                            View student profiles and resumes
                        </p>

                    </div>

                    <span>
                        {users.length} Students
                    </span>

                </div>


                {users.length === 0 ? (

                    <div className="admin-empty">
                        No registered students found.
                    </div>

                ) : (

                    <div className="students-list">

                        {users.map(user => (

                            <div
                                key={user.id}
                                className="student-card"
                            >

                                <div className="student-card-header">

                                    <div>

                                        <h3>
                                            {user.username}
                                        </h3>

                                        <span>
                                            Student ID: #{user.id}
                                        </span>

                                    </div>


                                    <div className="student-cgpa">

                                        <small>
                                            CGPA
                                        </small>

                                        <strong>
                                            {user.cgpa || "N/A"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="student-details">

                                    <div>

                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {user.email || "Not added"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Phone
                                        </span>

                                        <strong>
                                            {user.phone || "Not added"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Branch
                                        </span>

                                        <strong>
                                            {user.branch || "Not added"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Skills
                                        </span>

                                        <strong>
                                            {user.skills || "Not added"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="student-resume">

                                    <span>
                                        Resume
                                    </span>

                                    {user.resume ? (

                                        <a
                                            href={user.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            📄 View Resume →
                                        </a>

                                    ) : (

                                        <strong>
                                            Not uploaded
                                        </strong>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* APPLICATIONS */}

            <div className="admin-card">

                <div className="admin-section-heading">

                    <div>

                        <h2>
                            Applications 📋
                        </h2>

                        <p>
                            Review applications and update their status
                        </p>

                    </div>

                    <span>
                        {applications.length} Applications
                    </span>

                </div>


                {applications.length === 0 ? (

                    <div className="admin-empty">
                        No applications found.
                    </div>

                ) : (

                    <div className="applications-admin-list">

                        {applications.map(app => {

                            const job = jobs.find(
                                j =>
                                    Number(j.id) ===
                                    Number(app.jobId)
                            )


                            return (

                                <div
                                    key={app.id}
                                    className="admin-application"
                                >

                                    <div className="admin-application-main">

                                        <p className="application-label">
                                            APPLICATION #{app.id}
                                        </p>

                                        <h3>
                                            {job?.company ||
                                                "Unknown Company"}
                                        </h3>

                                        <p className="admin-role">
                                            {job?.role ||
                                                "Unknown Role"}
                                        </p>

                                    </div>


                                    <div className="admin-application-info">

                                        <div>

                                            <span>
                                                Student
                                            </span>

                                            <strong>
                                                {app.username}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Job ID
                                            </span>

                                            <strong>
                                                #{app.jobId}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Applied Date
                                            </span>

                                            <strong>
                                                {app.appliedDate ||
                                                    "Not available"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="admin-status">

                                        <span>
                                            Update Status
                                        </span>

                                        <select
                                            value={
                                                app.status ||
                                                "Applied"
                                            }
                                            onChange={(e) =>
                                                updateStatus(
                                                    app.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Applied">
                                                Applied
                                            </option>

                                            <option value="Shortlisted">
                                                Shortlisted
                                            </option>

                                            <option value="Selected">
                                                Selected
                                            </option>

                                            <option value="Rejected">
                                                Rejected
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                )}

            </div>


            {/* ADD JOB */}

            <div className="admin-card">

                <div className="admin-section-heading">

                    <div>

                        <h2>
                            Add New Job 💼
                        </h2>

                        <p>
                            Create a new placement opportunity for students
                        </p>

                    </div>

                </div>


                <div className="admin-job-form">

                    <div className="admin-form-group">

                        <label>
                            Company
                        </label>

                        <input
                            placeholder="Example: TCS"
                            value={company}
                            onChange={e =>
                                setCompany(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Role
                        </label>

                        <input
                            placeholder="Example: Software Developer"
                            value={role}
                            onChange={e =>
                                setRole(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Required Skills
                        </label>

                        <input
                            placeholder="Example: Java, SQL, React"
                            value={skills}
                            onChange={e =>
                                setSkills(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Minimum CGPA
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            placeholder="Example: 7.5"
                            value={minCgpa}
                            onChange={e =>
                                setMinCgpa(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Package (LPA)
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="Example: 8"
                            value={packageLpa}
                            onChange={e =>
                                setPackageLpa(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-form-group">

                        <label>
                            Last Date
                        </label>

                        <input
                            type="date"
                            value={lastDate}
                            onChange={e =>
                                setLastDate(e.target.value)
                            }
                        />

                    </div>

                </div>


                <button
                    className="add-job-btn"
                    onClick={addJob}
                    disabled={addingJob}
                >

                    {addingJob
                        ? "Adding Job..."
                        : "＋ Add Job"
                    }

                </button>

            </div>


            {/* AVAILABLE JOBS */}

            <div className="admin-card">

                <div className="admin-section-heading">

                    <div>

                        <h2>
                            Available Jobs 💼
                        </h2>

                        <p>
                            Jobs currently available for students
                        </p>

                    </div>

                    <span>
                        {jobs.length} Jobs
                    </span>

                </div>


                {jobs.length === 0 ? (

                    <div className="admin-empty">
                        No jobs available.
                    </div>

                ) : (

                    <div className="admin-jobs-list">

                        {jobs.map(job => (

                            <div
                                key={job.id}
                                className="admin-job-card"
                            >

                                <div>

                                    <p className="application-label">
                                        JOB #{job.id}
                                    </p>

                                    <h3>
                                        {job.company}
                                    </h3>

                                    <p>
                                        {job.role}
                                    </p>

                                </div>


                                <div className="admin-job-package">
                                    ₹{job.packageLpa} LPA
                                </div>


                                <div className="admin-job-info">

                                    <span>
                                        Min CGPA:{" "}
                                        <strong>
                                            {job.minCgpa}
                                        </strong>
                                    </span>

                                    <span>
                                        Last Date:{" "}
                                        <strong>
                                            {job.lastDate}
                                        </strong>
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* FOOTER */}

            <div className="dashboard-footer">

                <p>
                    Smart Campus Placement & Career Management System
                </p>

                <p>
                    Administration Portal • © 2026
                </p>

            </div>

        </div>
    )
}

export default Admin