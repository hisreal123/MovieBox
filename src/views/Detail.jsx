import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from '../components/Loader'
import home from '../assets/sideBar/Home.svg'
import Movie from '../assets/sideBar/Movie.svg'
import Tv from '../assets/sideBar/Tv.svg'
import star from '../assets/sideBar/Star.svg'
import calender from '../assets/sideBar/Calendar.svg'
import expand from '../assets/sideBar/ExpandArrow.svg'
import logo from '../assets/sideBar/Logo2.svg'
import logout from '../assets/sideBar/Logout.svg'
import ticket from '../assets/sideBar/TwoTickets.svg'
import listIcon from '../assets/sideBar/List.svg'
import listIcon2 from '../assets/sideBar/List2.svg'
import play from '../assets/sideBar/Play.svg'
import YouTube from "react-youtube";

const Detail = () => {
  const [playButton, setPlayButton] = useState(false)

  const img_url = "http://image.tmdb.org/t/p/original";

  const [movie, setMovie] = useState(null);
  const [slideMovies, setSlideMovies] = useState(null);

  const { id } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = 'http://api.themoviedb.org/3';


  const icons = {
    Home: <img src={home} alt="Home" className="h-[25px] w-[25px] text-[#000000]/20" />,
    Movie: <img src={Movie} alt="Movies" className="h-[25px] w-[25px] text-[#000000]/20" />,
    'Tv Series': <img src={Tv} alt="Tv Series" className="h-[25px] w-[25px]" />,
    Calernder: <img src={calender} alt="Calender" className="h-[25px] w-[25px]" />,
  }


  const SideBarNav = <ul className="relative w-full">
    {Object.entries(icons).map(([label, icon], index) => (
      <Link to="#" key={index}
        className="group py-5 sideBarList flex text-sm items-center space-x-5
         focus:bg-[#BE123C]/10 focus:border-r-2 border-[#BE123C]">
        <div className="s"></div>
        <div className="s"></div>
        <div className="s"></div>
        {icon}
        <span className="text-[15px] font-[400] text-[#666666] group-focus:text-black/80  hidden md:block ">{label}</span>
      </Link>
    ))}

  </ul >


  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movie/${id}`, {
        params: {
          api_key: apiKey,
          append_to_response: 'videos'
        },
      });
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };


  const fetchSlideMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/discover/movie/`, {
        params: {
          api_key: apiKey,
        },
      });

      setSlideMovies(response.data.results.slice(0, 3));
      console.log(movie)
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const renderTrailer = () => {
    if (movie && movie.videos && movie.videos.results) {
      const trailer = movie.videos.results.find(video => video.type === 'Trailer');
      if (trailer) {
        return (
          <div className="youtube-container absolute min-h-full min-w-full bg-red-200 ">
            <YouTube
              videoId={trailer.key}
              containerClassName={"youtube.channel"}
              className="absolute top-0 right-0 left-0 bottom-0"
              opts={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        );
      }
    }
    return null;
  }

  useEffect(() => {
    fetchMovieDetails();
    fetchSlideMovies();
    setPlayButton(false)
  }, [setPlayButton]);


  return (
    <div>
      {movie ? (
        <>
          <section data-testid="movie-details">
            <div className=" md:grid md:grid-cols-5 h-[100vh] ">

              <div
                className="  hidden sidebar rounded-r-[50px] border-r py-5 bg-[#000000]/[0.06] md:flex flex-col justify-between items-center ">

                <Link to="/">
                  <img src={logo} alt="logo" className="h-[24px] w-[112px] md:h-[40px] md:w-auto" />
                </Link>

                {SideBarNav}

                <div className="b border p-3 w-[60%] mx-auto rounded-xl border-[#BE123C]/70 flex flex-col ">
                  <p className="text-[15px] font-[600]  text-[#333333]/80">Play movie quizes and earn</p>
                  <p className="text-[12px] my-1 text-[#666666]">50k people are playing now</p>
                  <button className=" bg-[#BE123C]/20 w-fit self-center my-2 rounded-full px-3 py-1
                  text-[12px] hover:bg-[#BE123C]/60 transition-all duration-150"> Start playing</button>
                </div>

                <div className="ft flex items-center">
                  <img src={logout} alt="Logout out of your account nigga !" />
                  <span className="text-[#666666] hover:text-[#3d3d3d] cursor-pointer"> Log out </span>
                </div>
              </div>




              {/* trailer section */}

              <div className="mainSection bg-[#ffffff] col-span-4 pt-1 px-2 md:py-5 md:px-5 relative">
                <div
                  className={`hero h-[449px] bg-no-repeat overflow-hidden rounded-[20px] bg-center flex justify-center items-center relative`}
                  style={{
                    backgroundImage: `url(${img_url}${movie.backdrop_path})`,
                  }}
                >

                  {/* {movie.videos ? renderTrailer() : null} */}

                  {!playButton ? (
                    <div className="playTrailer flex flex-col items-center">
                      <button
                        className="bg-[#E8E8E8]/20 rounded-full h-[80px] w-[80px] flex items-center justify-center"
                        onClick={() => setPlayButton(!playButton)}
                      >
                        <img src={play} alt="" className="h-[54px] w-[54px]" />
                      </button>
                      <h3 className="text-white font-[400] mt-1 text-[20px]">Watch Trailer</h3>
                    </div>
                  ) : renderTrailer()}
                </div>




                <div
                  data-testid="movie-details"
                  className="movieDetails ">
                  <div className="grid grid-cols-1 md:grid-cols-3">

                    <div className="a  my-5 col-span-2">

                      <div className="title md:flex  items-center md:space-x-2">


                        <div className="titleSec flex font-bold text-[18px] md:text-[23px] font-bolder truncate space-x-2">
                          <h4
                            data-testid="movie-title"
                            className=" truncate ">{movie?.title} . </h4>
                          <h2 data-testid="movie-release-date">{movie.release_date.split("-")[0]}</h2>
                          <h2
                            data-testid="movie-runtime">
                            {`${Math.floor(movie.runtime / 60)}h ${Math.floor(movie.runtime % 60)}m`}
                          </h2>
                          <h2>. PG-13 .</h2>

                        </div>

                        <div className="genre flex items-center space-x-2 md:space-x-4 my-2 md:my-0">
                          {movie.genres.map((t, i) =>
                            <span key={i} className="rounded-full border border-[#F8E7EB] text-[#B91C1C]/60 px-3 text-xs md:text-[10px] py-1 cursor-pointer hover:bg-[#e7cad1]/40"> {t.name}</span>)}
                        </div>
                      </div>

                      <div className="  flex items-center text-sm sapce-x-2 md:hidden ">
                        <img src={star} className="text-xs mr-2 h-4 " />
                        <span className="text-gray-500/20 text-xs mt-1 md:mt-0 md:text-[20px]">{movie.vote_average}  <b className="text-[15px] text-black"> | {movie.vote_count >= 1000 ? (movie.vote_count / 1000).toFixed() : movie.vote_count.toString()}k</b> </span>
                      </div>

                      <p
                        data-testid="movie-overview"
                        className="mt-5  font-lighter">{movie?.overview}</p>

                      <div className="directorDem mt-8 mb-2">
                        <h3 className="border-t last-of-type:border-b py-3 border-[#E8E8E8]/25">Director: <span className="text-[#BE123C]">{' Joseph Kosinki'}</span></h3>
                        <h3 className="border-t last-of-type:border-b py-3 border-[#E8E8E8]/25">Writers: <span className="text-[#BE123C]">{'  Jim Cash , Jack Epps Jr, Peter Craig'}</span></h3>
                        <h3 className="border-t last-of-type:border-b py-3 border-[#E8E8E8]/25">Sars: <span className="text-[#BE123C]">{'Tom Cruies'}</span></h3>
                      </div>

                      <div className="topRated flex rounded-md border-[#C7C7C7] border text-xs items-center  justify-between mt-3 ">
                        <div className="lf flex items-center space-x-2">
                          <button className="bg-[#BE123C] rounded-md px-2 text-sm py-2 text-white font-bold" > Top rated movies #65</button>
                          <h3 className="font-bold">Awards 9 nominations</h3>
                        </div>
                        <img src={expand} className="text-xs mr-2 h-4 font-bold" />
                      </div>
                    </div>


                    <div className="b md:my-5">
                      <div className="  items-center text-sm sapce-x-2 hidden md:flex justify-end ">
                        <img src={star} className="text-xs mr-2 h-4 md:h-[30px] " />
                        <span className="text-gray-500/20 text-xs mt-1 md:mt-0 md:text-[20px]">{movie.vote_average}  <b className="text-[15px] text-black"> | {movie.vote_count >= 1000 ? (movie.vote_count / 1000).toFixed() : movie.vote_count.toString()}k</b> </span>
                      </div>

                      <div className="btnsLala pb-4 mt-7">

                        <button className="bg-[#BE123C] rounded-md text-md py-3 text-white font-bold flex w-full mb-3
                  items-center justify-center" >
                          <img src={ticket} className=" mr-2 h-6" />
                          <span>See Showtimes </span>
                        </button>

                        <button className="bg-[#BE123C]/10 border border-[#BE123C] rounded-md  text-md py-3 text-black  font-bold flex w-full mb-3
                  items-center justify-center">
                          <img src={listIcon} className=" mr-2 h-6 " />
                          <span >  More watch options</span>
                        </button>

                      </div>

                      {/* slicedMovies */}

                      <div className="more mt-5 rounded-md overflow-hidden h-[229px] relative hover:bg-[[#121212]/50]">

                        <div className="gridwrapper grid grid-cols-3 relative">

                          {slideMovies?.map((t, i) => (
                            <div key={i} className=" relative ">
                              <Link to={`/details/${movie?.id}`}>
                                <img
                                  src={t?.poster_path ? `${img_url}${t?.poster_path}` : t?.backdrop_path}
                                  className=' relative mb-2 cursor-pointer hover:scale-110 transition-all duration-150 h-[229px] '
                                  alt="movie poster"
                                />
                              </Link>
                            </div>
                          ))}
                        </div>


                        <div className="capt absolute bottom-0 w-full font-bold md: text-xs text-white bg-[#121212]/40 rounded-lg px-1 py-2
                        flex justify-center items-center hover:bg-[#121212]/50">
                          <img src={listIcon2} className=" mr-2 h-6 " />
                          <h2>The Best Movies and Shows in September</h2>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="2">

                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <><Loader /> </>
      )}
    </div>
  );
};

export default Detail;
