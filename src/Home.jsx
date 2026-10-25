import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home-page">

            <div className="home-box">

                <div className="logo">
                    🎓
                </div>

                <h1>
                    Smart Campus Placement
                    <br />
                    & Career Management System
                </h1>

                <p className="home-subtitle">
                    Build your career. Discover opportunities. Get placed.
                </p>

                <p className="home-description">
                    A centralized platform that helps students manage their
                    profiles, discover placement opportunities, apply for jobs
                    and track their application status.
                </p>

                <div className="home-buttons">

                    <Link to="/log" className="main-btn">
                        Student Login
                    </Link>

                    <Link to="/reg" className="main-btn">
                        Student Registration
                    </Link>

                    <Link to="/jobs" className="main-btn">
                        Available Jobs
                    </Link>

                    <Link to="/applications" className="main-btn">
                        My Applications
                    </Link>

                    <Link to="/admin" className="admin-btn">
                        Admin Panel
                    </Link>

                </div>

                <div className="features-section">

                    <h2>Key Features</h2>

                    <div className="features-grid">

                        <div className="feature-card">
                            <div className="feature-icon">👨‍🎓</div>
                            <h3>Student Management</h3>
                            <p>
                                Manage student profiles, skills, CGPA and
                                resume information.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💼</div>
                            <h3>Job Opportunities</h3>
                            <p>
                                Students can view available placement
                                opportunities and job requirements.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📝</div>
                            <h3>Online Applications</h3>
                            <p>
                                Students can apply for suitable jobs directly
                                through the system.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Application Tracking</h3>
                            <p>
                                Students can track whether their application
                                is pending, shortlisted, selected or rejected.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">👨‍💼</div>
                            <h3>Admin Management</h3>
                            <p>
                                Admin can manage students, jobs and placement
                                applications.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="about-section">

                    <h2>About the Project</h2>

                    <p>
                        The Smart Campus Placement & Career Management System
                        is designed to simplify the campus placement process.
                        It connects students and administrators through one
                        centralized platform for managing career opportunities
                        and placement applications.
                    </p>

                </div>

                <div className="home-footer">
                    <p>
                        Smart Campus Placement & Career Management System
                    </p>
                    <p>
                        © 2026 All Rights Reserved
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Home