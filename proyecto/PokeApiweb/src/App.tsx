import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Navbar } from "./Components/navbar";
import { CardPokemon } from "./Components/Poke";
import { Digimon } from "./Components/Digimon";
import { Error } from "./Components/Errores";

export const App: React.FC = () => {
  return (
    <BrowserRouter>

      {/* CONTENEDOR CENTRAL DE TODA LA WEB */}
      <div className="app-container">

        <Header />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<CardPokemon min={1} max={151} />} />
            <Route path="/gen1" element={<CardPokemon min={1} max={151} />} />
            <Route path="/gen2" element={<CardPokemon min={152} max={251} />} />
            <Route path="/gen3" element={<CardPokemon min={252} max={386} />} />
            <Route path="/digimon" element={<Digimon />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>

      </div>

    </BrowserRouter>
  );
};

export default App;
