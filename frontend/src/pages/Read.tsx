import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CryptoJS from "crypto-js";


const Read = () => {

  const [foundId , setFoundId] = useState<string>("");
  const [accessPassword , setAccessPassword] = useState<string>("");
  const [note , setNote] = useState<string>("");

  const handleSubmitData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        let response = await axios.post("http://127.0.0.1:8000/api/see-note" , {
            found_id : foundId,
            access_password : accessPassword,
        });

        if (response.data.message){

            const decrypted_note = CryptoJS.AES.decrypt(response.data.message , accessPassword).toString(CryptoJS.enc.Utf8);

            setNote(`Final Note :   ${decrypted_note}`);

        } else {
            setNote("Note id or password is incorrect.");
        }

    } catch (e) {
        console.log(e)
        setNote("Note id or password is incorrect.");
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
        <h1>Read a note</h1>

        <label>Note id : </label>
        <TextField required sx={{ width: "300px" }} onChange={(e) => setFoundId(e.target.value)} />

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


        {note != "" && <p style={{color: "#0C7FFA"}}>{note}</p>}


      </form>
    </Container>
  );
};

export default Read;
