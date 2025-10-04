import {BrowserRouter , Routes , Route} from "react-router-dom";;

import Header from "./components/Header";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Delete from "./pages/Delete";
import Footer from "./components/Footer";

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-note" element={<Create />} />
        <Route path="/read-note" element={<Read />} />
        <Route path="/delete-note" element={<Delete />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;