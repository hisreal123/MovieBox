import { AiOutlineSearch } from 'react-icons/ai'

import logo from '../assets/Logo.svg'
import sigin from '../assets/signin.svg'
const Nav = () => {


    return (
        <>
            <section className="h-[40px] flex justify-between px-5 ">
                <div className="logoWrapper flex items-center">
                    <a href="/home">
                        <img src={logo} alt="LOGO" className='h-6' />
                    </a>
                </div>

                <div className="searchWrapper border-[#D1D5DB] rounded-md md:flex items-center hidden">
                    <input type="text" placeholder="What do you want to watch?" />
                    <AiOutlineSearch />
                </div>

                <div className="signinWrapper flex items-center space-x-2">
                    <h3 className=''> Sign in</h3>
                    <img src={sigin} alt="siginin" className='h-6' />
                </div>
            </section>
        </>
    )
}

export default Nav