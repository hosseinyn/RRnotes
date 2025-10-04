import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <h1
          style={{ fontSize: "40px", letterSpacing: "3px" }}
          className="animate__animated animate__backInDown"
        >
          <span style={{ color: "#FFD700" }}>What</span> is{" "}
          <span style={{ color: "#0c7ffaff" }}>THIS Platform?</span>
        </h1>

        <img
          src="https://skillicons.dev/icons?i=html,css,js,ts,vite,react,materialui,rust,rocket,postgresql"
          style={{maxWidth: "80%"}}
          className="animate__animated animate__backInLeft animate__slow"
        />

        <p
          className="animate__animated animate__fadeInDown"
          style={{ width: "70%", textAlign: "center", marginTop: "21px" }}
        >
          RRnote is a full-stack open source project for sharing text and notes
          full-anonymous and secure between people , full encrypted. This
          project powered by react , material-ui frontend and rust/rocket.rs
          backend , diesel rust orm and postgresql as database and many other
          libraries. The notes are full encrypted with CryptoJS AES method and
          the passwords are full encrypted by bcrypt and no one can read your
          text and your passwords. you can delete your note or share your note
          link with public password for people.
        </p>

        <Link to="/create-note" style={{textDecoration: "none"}}>
          <Button
            sx={{
              my: 2,
              width: "170px",
              color: "white",
              display: "block",
              backgroundColor: "#0c7ffaff",
            }}
            className="animate__animated animate__fadeInUpBig"
          >
            First Note
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Home;
