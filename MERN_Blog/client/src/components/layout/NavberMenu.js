import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import learnItLogo from "../../accsets/logo.svg";
import logoutIcon from "../../accsets/logout.svg";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavberMenu = () => {

  const  {
    authState :{
      user  :{username}
    }, logoutUser 
  }= useContext(AuthContext);


  const logout = () => logoutUser();
  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={learnItLogo}
            alt=""
            width="32"
            height="32"
            className="mr-2"
          />
          LearnIt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              DashBoard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              Abount
            </Nav.Link>
          </Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username} 
          </Nav.Link>
          <Button 
                variant="secondary" 
                className="font-weight-bolder text-white" 
                onClick={logout}
          >
            <img src={logoutIcon} alt="" width="32" height="32" className="mr-2" />
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavberMenu;
