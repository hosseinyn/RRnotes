import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


const Create = () => {

  const [creatorName, setCreatorName] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [creatorPassword, setCreatorPassword] = useState<string>("");
  const [accessPassword, setAccessPassword] = useState<string>("");

  const navigator = useNavigate();

  const handleSubmitData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        let response = await axios.post("http://127.0.0.1:8000/api/create-note" , {
            creator_name : creatorName,
            creator_password : creatorPassword,
            note_text : CryptoJS.AES.encrypt(noteText , accessPassword).toString(),
            access_password : accessPassword,
        });

        if (response.data.message.startsWith("Note created successfully")) {
            alert(response.data.message);
            navigator("/");
        }

    } catch (e) {
        console.log(e)
    }

  }

  return (
    <Container>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
        onSubmit={handleSubmitData}
      >
        <h1>Create a new note</h1>

        <label>Creator name : </label>
        <TextField required sx={{ width: "300px" }} onChange={(e) => setCreatorName(e.target.value)} />

        <label>Note text : </label>
        <TextField required sx={{ width: "300px" }} onChange={(e) => setNoteText(e.target.value)}/>

        <label>Creator password : </label>
        <TextField required type="password" sx={{ width: "300px" }} onChange={(e) => setCreatorPassword(e.target.value)} />

        <label>Access password : </label>
        <TextField required type="password" sx={{ width: "300px" }} onChange={(e) => setAccessPassword(e.target.value)} />

        <Button
          type="submit"
          sx={{
            my: 2,
            width: "170px",
            color: "white",
            display: "block",
            backgroundColor: "#0c7ffaff",
          }}
        >
          Submit
        </Button>


      </form>
    </Container>
  );
};

export default Create;
