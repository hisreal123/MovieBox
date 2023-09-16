/* eslint-disable react/prop-types */
import imdb from '../assets/imdb.png'
import tomatoes from '../assets/tomato.png'
import favIcon from '../assets/favIcon.png'
import { Link } from 'react-router-dom'


const MovieCard = ({ movie }) => {

    // const [addToFav, setAddToFav] = useState(false)
    const img_url = "https://image.tmdb.org/t/p/w500";

    return (
        <>
            <div className='featuredMovies'>

                {/* Card component
                 [data-testid: movie-card] */}
                <div className="card overflow-hidden [data-testid: movie-card] " data-testid="movie-card" >

                    <div className="imgWrapper overflow-hidden max-h-[300px] relative">
                        <a href={`/details/${movie.id}/`}>
                            <img
                                // eslint-disable-next-line react/prop-types
                                data-testid="movie-poster"
                                src={movie?.poster_path ? `${img_url}${movie?.poster_path}` : movie?.backdrop_path}
                                className=' relative mb-2 cursor-pointer hover:scale-110 transition-all duration-150 '
                                alt="movie poster"
                            />
                        </a>
                        <span className='rounded-full flex justify-center items-center absolute top-3 right-3 bg-[#F3F4F6]/50 h-[29.21px] w-[30px]'>
                            <img src={favIcon}
                                alt="imdb rating"
                                className='  h-[19.47pxpx] w-[20px] hover:scale-110 transition-all duration-150 cursor-pointer' />
                        </span>

                    </div>
                    <span
                        data-testid="movie-release-date"
                        className='text-[10px] font-[700] text-[#9CA3AF] '>USA, {movie?.release_date?.split("-")[0]}        </span>


                    <h3
                        data-testid="movie-title"
                        className='truncate'>
                        <Link to={`/details/${movie?.id}`} className=' text-[18px] font-[700] text-[#111827]  transition-all duration-150 cursor-pointer' >{movie?.title}</Link>
                    </h3>

                    {/* Rating */}
                    <div className='flex justify-between items-center text-[#111827] font-[400] text-[8px] md:text-[12px] my-5'>
                        <div className="ratingA flex space-x-2 items-center ">
                            <img src={imdb} alt="imdb rating" className=' h-[5] w-[8] md:h-[17px] md:w-[35px] hover:scale-110 transition-all duration-150 cursor-pointer' />
                            <span>{movie.vote_average}  <b className=" text-[8px] md:text-[15px] text-black"> | {movie?.vote_count >= 1000 ? (movie.vote_count / 1000).toFixed() : movie.vote_count.toString()}k</b></span>
                        </div>
                        <div className="ratingB flex space-x-2 items-center ">
                            <img src={tomatoes} alt="imdb rating" className=' h-[5] w-[8]  h-[17px] w-[16px] hover:scale-110 transition-all duration-150 cursor-pointer' />
                            <span>97% </span>
                        </div>
                    </div>

                    {movie?.genres?.map((t) =>
                        <p key={t.id} className='genre text-[12px] text-[#9CA3AF] font-[700] my-2'>{t.name}</p>
                    )}
                </div>

            </div >
        </>
    )
}

export default MovieCard
