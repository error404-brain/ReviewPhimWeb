import React, { useState, useEffect } from 'react';
import './App.css';
import Interstellar from './assets/Interstellar.jpg';
import IronMan from './assets/IronMan.jpg';
import The_Avengers from './assets/The Avengers.jpg';
import BatMan from './assets/BatMan.jpg';
import logo from './assets/tmdb.svg';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    { 
      title: 'Interstellar', 
      genre: 'Adventure, Drama, Science Fiction', 
      releaseDate: '2014-11-05', 
      boxOffice: '$701,729,206', 
      runningTime: '169 mins', 
      voteAverage: '8.4 / 10',
      productionCompany: 'Legendary Pictures, Syncopy, Lynda Obst Productions',
      descriptionTitle: 'Mankind was born on Earth. It was never meant to die here.',
      description: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      image: Interstellar
    },
    { 
      title: 'Iron Man', 
      genre: 'Action, Science Fiction, Adventure', 
      releaseDate: '2008-04-30', 
      boxOffice: '$585,174,222', 
      runningTime: '126 mins', 
      voteAverage: '7.6 / 10',
      productionCompany: 'Marvel Studios',
      descriptionTitle: "Heroes aren't born. They're built",
      description: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
      image: IronMan
    },
    { 
      title: 'The Avengers', 
      genre: 'Science Fiction, Action, Adventure', 
      releaseDate: '2012-05-04', 
      boxOffice: '$1,518,812,988', 
      runningTime: '143 mins', 
      voteAverage: '8.0 / 10',
      productionCompany: 'Marvel Studios',
      descriptionTitle: 'Some assembly required.',
      description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.',
      image: The_Avengers
    },
    {
      title: 'Batman',
      genre: 'Action',
      releaseDate: '1989-06-23',
      boxOffice: '$1,110,000,000',
      runningTime: '126 mins',
      voteAverage: '7.4 / 10',
      productionCompany: 'Warner Bros.',
      descriptionTitle: 'Overview',
      description:'Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gotham\'s criminal underworld.',
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

      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 font-oswald">
        <div className="flex items-center justify-between w-full max-w-4xl mb-6">
          <div className="flex-shrink-0 mr-4">
            <img src={logo} alt="TMDB" className="w-32" /> {/* Logo lớn hơn */}
          </div>
          <div className="flex-grow flex justify-end">
            <input 
              type="text" 
              placeholder="Search for movies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full max-w-xs p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-oswald text-sm" 
            />
          </div>
        </div>

        {selectedMovie ? (
          <div className="relative w-full max-w-4xl h-auto flex rounded-lg shadow-xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="relative w-1/2 flex items-center justify-center bg-black rounded-l-lg overflow-hidden">
              <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full h-full object-cover rounded-l-lg transform hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="relative w-1/2 bg-black p-8 opacity-90 text-white text-left">
              <div className="text-5xl font-bold mb-4">
                <p>{selectedMovie.title}</p>
              </div>
              <div className="text-lg mb-4">
                <h3 className="font-bold text-green-500 mb-2">{selectedMovie.descriptionTitle}</h3>
                <p>{selectedMovie.description}</p>
              </div>
              <div className='mb-4'>
                <p className="text-lg font-bold text-green-500">{selectedMovie.genre}</p>
                <p className="font-bold">{selectedMovie.productionCompany}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Original Release:</p>
                  <p className="text-2xl font-bold text-green-500">{new Date(selectedMovie.releaseDate).toLocaleDateString()}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-300">Running Time:</p>
                  <p className="text-2xl font-bold text-green-500">{selectedMovie.runningTime}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Box Office:</p>
                  <p className="text-2xl font-bold text-green-500">{selectedMovie.boxOffice}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-300">Rating:</p>
                  <p className="text-2xl font-bold text-green-500">{selectedMovie.voteAverage}</p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <p className="text-white text-xl">No movie found. Please try a different search term.</p>
        )}

        <footer className="absolute bottom-0 left-0 w-full py-4 text-center text-white">
          <p className="text-sm">
            Created by <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">Hưng Võ</a>
          </p>
          <a>
            View Code
          </a><br></br>
          <a>
            Developer Google Play Store
          </a><br></br>
          <a>
            Developer Apple App Store
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
