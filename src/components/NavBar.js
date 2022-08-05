import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../media/logo-main.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar fixed="top" className={styles.navB}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              width="140px"
              height="auto"
              className="img-responsive"
              src={Logo}
              alt="logo"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className={styles.navL} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className={styles.navL} as={Link} to="/my-collection">
              My Collection
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
