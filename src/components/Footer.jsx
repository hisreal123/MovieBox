import fb from '../assets/socialIcons/facebook.svg'
import ig from '../assets/socialIcons/ig.svg'
import twitter from '../assets/socialIcons/twitter.svg'
import youtube from '../assets/socialIcons/youtube.svg'


const Footer = () => {


  const icons = [fb, ig, twitter, youtube]
  const bla = ['Conditions of Use', 'Privacy & policy', 'Press Room']
  return (
    <>
      <section>
        <div className='flex  space-x-4 md:space-x-7 justify-center '>
          {icons.map((t, i) =>
            <img key={i} src={t} className='h-[3] w-[5] max-h-[3]  text-sm object-cover'/>
          )}
        </div>

        <div className="bla flex  space-x-2 justify-center items-center w-full mt-3">
          {bla.map((t, i) =>
            <p key={i} className='text-[10px]  md:text-md font-bold'>{t}</p>
          )}
        </div>

        <p className='text-[7px] text-center md:text-[9px] mt-2 mb-2 text-[#6B7280]'>2021 MovieBox by Adraina Eka Pryayudha </p>

      </section>
    </>
  )
}

export default Footer