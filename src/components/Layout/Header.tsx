import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import LoginModal from "../Modals/LoginModal";
import { useAuth } from "@/context/AuthContext";
import GitLogo from "../../../public/gitLogo.svg";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const { user, logoutHandler } = useAuth();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href={`/`}>WD Forum</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="https://github.com/jaw163/techForumFrontend">
              <GitLogo />
              <p style={{ all: "unset", padding: "0.4rem" }}>Front End</p>
            </Nav.Link>
            <Nav.Link href="https://github.com/jaw163/techForumBackend">
              <GitLogo />
              <p style={{ all: "unset", padding: "0.4rem" }}>Back End</p>
            </Nav.Link>
            {user ? (
              <Nav.Link>{user?.user_name}</Nav.Link>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
            )}
            {user && (
              <Nav.Link
                onClick={() => {
                  logoutHandler(user?.token);
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal show={showModal} setShow={setShowModal} />
    </Navbar>
  );
}
