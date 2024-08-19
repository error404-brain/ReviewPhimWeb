import React, { useState, useEffect } from 'react';
import './App.css';
import Interstellar from './assets/Interstellar.jpg';
import IronMan from './assets/IronMan.jpg';
import The_Avengers from './assets/The Avengers.jpg';
import BatMan from './assets/BatMan.jpg';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Danh sách phim
  const movies = [
    { 
      title: 'Interstellar', 
      genre: 'Sci-Fi', 
      releaseDate: 'November 5, 2014', 
      boxOffice: '$701,729,206', 
      runningTime: '169 mins', 
      voteAverage: '8.4 / 10',
      description: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      image: Interstellar
    },
    { 
      title: 'Iron Man', 
      genre: 'Sci-Fi', 
      releaseDate: 'May 2, 2008', 
      boxOffice: '$585,174,222', 
      runningTime: '126 mins', 
      voteAverage: '7.6 / 10',
      description: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
      image: IronMan
    },
    { 
      title: 'The Avengers', 
      genre: 'Sci-Fi', 
      releaseDate: 'May 4, 2012', 
      boxOffice: '$1,518,812,988', 
      runningTime: '143 mins', 
      voteAverage: '8.0 / 10',
      description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.',
      image: The_Avengers
    },

    {
      title: 'Batman',
      genre: 'Action',
      releaseDate: 'June 23, 1989',
      boxOffice: '$1,110,000,000',
      runningTime: '126 mins',
      voteAverage: '7.4 / 10',
      description:'Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gothams criminal underworld.',
      image: BatMan
    }

  ];


  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
      const result = storedMovies.find(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSelectedMovie(result || null); 
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full" style={{
      backgroundImage: `url(${selectedMovie ? selectedMovie.image : Interstellar})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
    }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
        <div className="mb-6 w-full max-w-4xl">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
          />
        </div>

        {selectedMovie ? (
          <div className="relative w-full max-w-4xl h-auto flex rounded-lg shadow-xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="relative w-1/2 flex items-center justify-center bg-black rounded-l-lg overflow-hidden">
              <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full h-full object-cover rounded-l-lg transform hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="relative w-1/2 bg-black p-8 opacity-90 overflow-y-auto rounded-r-lg text-white">
              <p className="text-5xl font-extrabold mb-4">{selectedMovie.title}</p>
              <p className="text-lg italic mb-6">“{selectedMovie.description}”</p>
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  <span className="font-semibold">Genres:</span> {selectedMovie.genre}
                </p>
                <p className="text-base leading-relaxed">
                  <span className="font-semibold">Original Release:</span> {selectedMovie.releaseDate}
                </p>
                <p className="text-base leading-relaxed">
                  <span className="font-semibold">Box Office:</span> {selectedMovie.boxOffice}
                </p>
                <p className="text-base leading-relaxed">
                  <span className="font-semibold">Running Time:</span> {selectedMovie.runningTime}
                </p>
                <p className="text-base leading-relaxed">
                  <span className="font-semibold">Vote Average:</span> {selectedMovie.voteAverage}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white text-xl">No movie found. Please try a different search term.</p>
        )}
      </div>
    </div>
  );
}

export default App;
