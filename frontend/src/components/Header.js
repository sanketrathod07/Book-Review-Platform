import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.users);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Book Review</Navbar.Brand>
                <Nav className="ms-auto">
                    {userInfo ? (
                        <>
                            <Nav.Link as={Link} to="/profile">{userInfo.user.name}</Nav.Link>
                            <Button variant="danger" onClick={() => dispatch(logout())}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
