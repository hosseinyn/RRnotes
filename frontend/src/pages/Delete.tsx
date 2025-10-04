import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Delete = () => {

  const [foundId , setFoundId] = useState<string>("");
  const [creatorPassword , setCreatorPassword] = useState<string>("");
  const [error , setError] = useState<string>("");

  const navigator = useNavigate();

  const handleSubmitData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        let response = await axios.post("http://127.0.0.1:8000/api/remove-note" , {
            found_id : foundId,
            creator_password : creatorPassword,
        });

        if (response.data.message == "Note removed successfully"){

            alert("Successfully Removed.");
            navigator("/");

        } else {
            setError("Note id or password is incorrect.");
        }

    } catch (e) {
        console.log(e)
        setError("Note id or password is incorrect.");
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
        <h1>Delete a note</h1>

        <label>Note id : </label>
        <TextField sx={{ width: "300px" }} onChange={(e) => setFoundId(e.target.value)} />

        <label>Creator password : </label>
        <TextField type="password" sx={{ width: "300px" }} onChange={(e) => setCreatorPassword(e.target.value)} />

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


        {error != "" && <p style={{color: "#0C7FFA"}}>{error}</p>}


      </form>
    </Container>
  );
};

export default Delete;
