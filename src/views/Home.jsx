import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { FiChevronRight } from 'react-icons/fi';
import imdb from '../assets/imdb.svg';
import tomatoes from '../assets/tomates.svg';
import playT from '../assets/sideBar/homePlayTrailer.svg';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Home = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const img_url = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroMovies, setHeroMovies] = useState([]);
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

    const baseUrl = "https://api.themoviedb.org/3";


    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${baseUrl}/discover/movie/`, {
                params: {
                    api_key: apiKey,
                },
            });

            const allMovies = response.data.results;
            setHeroMovies(allMovies.slice(1, 6));
            setMovies(allMovies);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const featuredMovies = () => (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );

    // Step 2: Handle dot click
    const handleDotClick = (index) => {
        setSelectedMovieIndex(index);
    };

    return (
        <>
            <section>
                <div className="movies">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {/* banner */}
                            <div className="heroBanner h-[600px] relative w-full">
                                {heroMovies?.map((t, i) => (
                                    <div
                                        key={i}
                                        className={`wrap overflow-hidden ${i === selectedMovieIndex ? 'active h-full  bg-no-repeat  bg-cover bg-local bg-top ' : 'hidden'
                                            }`}
                                        style={{
                                            backgroundImage: `url(${img_url}${t?.backdrop_path})`,
                                        }}
                                    >
                                        {/* Navigation Dots */}



                                        <div className="Container relative flex justify-between items-center  h-full w-full  px-3 md:px-10">


                                            <div className="details md:w-[40%] text-white">
                                                <h2 key={i} className="text-[48px] font-bold md:truncate w-[40%] md:w-auto">
                                                    {t.title}
                                                </h2>

                                                <div className="flex items-center space-x-4 font-[400] text-[12px] my-5">
                                                    <div className="ratingA flex space-x-2 ">
                                                        <img
                                                            src={imdb}
                                                            alt="imdb rating"
                                                            className="h-[17px] w-[35px] hover:scale-110 transition-all duration-150 cursor-pointer"
                                                        />
                                                        <span>
                                                            {t?.vote_average}{' '}
                                                            <b className="text-[15px] ">
                                                                |{' '}
                                                                {t?.vote_count >= 1000
                                                                    ? (t.vote_count / 1000).toFixed()
                                                                    : t.vote_count.toString()}
                                                                k
                                                            </b>
                                                        </span>
                                                    </div>
                                                    <div className="ratingB flex space-x-2 items-center ">
                                                        <img
                                                            src={tomatoes}
                                                            alt="imdb rating"
                                                            className="h-[17px] w-[16px] hover:scale-110 transition-all duration-150 cursor-pointer"
                                                        />
                                                        <span>97% </span>
                                                    </div>
                                                </div>

                                                <p className="my-5 font-light leading-7 hidden md:block md:w-[100%] pr-20 md:pr-0 ">{t.overview}</p>

                                                <button className=" bg-[#BE123C] rounded-md  text-md py-3  px-4 font-bold flex w-fit mb-3
                                                items-center justify-center text-white">
                                                    <img
                                                        src={playT}
                                                        alt="imdb rating"
                                                        className="h-[17px] w-[16px] hover:scale-110 transition-all duration-150 cursor-pointer"
                                                    />
                                                    <span>WATCH TRAILER </span>
                                                </button>
                                            </div>

                                            <div className="dots relative ">
                                                {heroMovies.map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`dot text-white font-light  ${index === selectedMovieIndex ? ' font-bold active' : ''}`}
                                                        onClick={() => handleDotClick(index)}
                                                    >

                                                        <p className='flex justify-between items-center  space-x-2'>
                                                            {index === selectedMovieIndex && (
                                                                <span className='flex-start h-1 bg-white w-3 rounded-xl block'></span>
                                                            )}
                                                            <span className='inline-flex flex-end'>{index + 1}</span>
                                                        </p>


                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* featured */}
                            <div className="wrapFeatured  px-3 md:px-0 md:w-[70%] mx-auto">
                                <div className="top flex items-center justify-between mt-20 mb-10">
                                    <h2 className="font-bolder lg:text-lg ">Featured Movie</h2>
                                    <a href="#" className=" text-[#BE123C] flex space-x-3 items-center text-sm ">
                                        See More
                                        <span>
                                            <FiChevronRight />
                                        </span>
                                    </a>
                                </div>
                                {featuredMovies()}
                            </div>

                            <div className="footer w-[70%] mx-auto mt-20">
                                <Footer />
                            </div>
                        </>
                    )}
                </div>
            </section >
        </>
    );
};

export default Home;
