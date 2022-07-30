import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../media/logo-main.png";
import styles from "./NavBar.module.css";

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
            <Nav.Link className={styles.navL} href="#home">Home</Nav.Link>
            <Nav.Link className={styles.navL} href="#features">Features</Nav.Link>
            <Nav.Link className={styles.navL} href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
