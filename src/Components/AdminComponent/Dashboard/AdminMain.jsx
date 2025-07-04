import React from 'react'
import Header from './Header'
import Index from './Index'
import StatsCard from './StatsCard'


export default function AdminMain() {
  return (
    <div className='bg-blue-500'>
      <Header/>
      <Index/>
      
      <StatsCard/>
      
    </div>
  )
}
