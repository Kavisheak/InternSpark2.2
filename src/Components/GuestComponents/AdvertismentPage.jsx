import React from 'react'
import { AdNavbar } from './AdNavbar'
import { AdHero } from './AdHero'
import AdFooter from './AdFooter'



const AdvertismentPage = () => {
  return (
    <div className='bg-sky-100'>
      <AdNavbar/>
      <AdHero/>
      <AdFooter/>
    </div>
  )
}

export default AdvertismentPage
