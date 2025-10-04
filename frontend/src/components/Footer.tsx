import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <Container sx={{display: "flex" , backgroundColor: "#1976D2" , justifyContent: "center" , alignItems: "center" , height: "40px" , borderRadius : "30px" , color: "#fff" , marginTop: "60px"}}>

        <strong>RRnote ©2025 | Made with 💖 by <a href="https://github.com/hosseinyn" style={{color: "#fff"}}>hosseinyn</a> </strong>

    </Container>
  )
}

export default Footer;