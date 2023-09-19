import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LogRegPage from './views/LogRegPage';
import Dash from './views/Dash';
import Detail from './components/Detail';
import Update from './components/Update';
import MovieForm from './components/MovieForm';

function App() {
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='?' element={<LogRegPage errors={errors} setErrors={setErrors}/>} />
          <Route path='/dashboard' element={<Dash/>} />
          <Route path='/movies/:id' element={<Detail />} />
          <Route path="/movies/edit/:id" element={<Update />} />
          <Route path='/movies/new' element={<MovieForm movies={movies} setMovies={setMovies} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
