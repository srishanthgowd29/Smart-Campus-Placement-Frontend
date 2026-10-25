import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Delete() {

    const navigate = useNavigate()

    const [deleting, setDeleting] = useState(false)


    const deleteAccount = async () => {

        const username = localStorage.getItem("uname")


        if (!username) {
            navigate("/log")
            return
        }


        const firstConfirm = window.confirm(
            "Are you sure you want to permanently delete your account?"
        )


        if (!firstConfirm) {
            return
        }


        const secondConfirm = window.confirm(
            "This cannot be undone. Do you really want to delete your account?"
        )


        if (!secondConfirm) {
            return
        }


        setDeleting(true)


        try {

            const result = await axios.delete(
                "http://localhost:8080/user/" + username,
                {
                    withCredentials: true
                }
            )


            alert(result.data)


            if (
                result.data ===
                "User deleted successfully"
            ) {

                localStorage.removeItem("uname")

                navigate("/log")

            }

        } catch (error) {

            console.log(
                "Account deletion error:",
                error
            )


            if (error.response) {

                alert(
                    error.response.data ||
                    "Account deletion failed"
                )

            } else if (error.request) {

                alert(
                    "Backend is not responding. Please start Spring Boot."
                )

            } else {

                alert(
                    "Account deletion failed. Please try again."
                )

            }

        } finally {

            setDeleting(false)

        }
    }


    return (

        <div className="auth-page">

            <div className="delete-box">

                <div className="delete-icon">
                    ⚠️
                </div>


                <h1>
                    Delete Account
                </h1>


                <p className="delete-warning">
                    This action will permanently delete your
                    student account and profile information.
                </p>


                <div className="delete-consequences">

                    <h3>
                        What will be deleted?
                    </h3>

                    <ul>

                        <li>
                            Student profile information
                        </li>

                        <li>
                            Academic details
                        </li>

                        <li>
                            Skills and resume information
                        </li>

                        <li>
                            Account login access
                        </li>

                    </ul>

                </div>


                <button
                    className="delete-confirm-btn"
                    onClick={deleteAccount}
                    disabled={deleting}
                >

                    {deleting
                        ? "Deleting Account..."
                        : "Delete My Account"
                    }

                </button>


                <Link
                    to="/dboard"
                    className="cancel-delete"
                >
                    ← Cancel and return to Dashboard
                </Link>


                <p className="delete-security-note">
                    🔒 Your account can only be deleted while
                    you are logged in.
                </p>

            </div>

        </div>

    )
}

export default Delete