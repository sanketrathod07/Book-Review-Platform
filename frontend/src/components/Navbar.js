import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logoutUser } from "../redux/slices/userSlice";

const Navigation = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchUserProfile(id));
        }
    }, [dispatch, id]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logoutUser());
        navigate("/login");
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-light fs-4">
                    📚 Book Review Platform
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="text-light fw-semibold px-3">Home</Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to={`/profile/${user._id}`} className="text-light fw-semibold px-3">
                                    Profile
                                </Nav.Link>
                                {user.isAdmin && (
                                    <Nav.Link as={Link} to="/add-book" className="text-warning fw-semibold px-3">
                                        Add Book
                                    </Nav.Link>
                                )}
                                <Button
                                    variant="outline-light"
                                    className="fw-semibold ms-3"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-light fw-semibold px-3">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="warning" className="fw-semibold ms-3">
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
