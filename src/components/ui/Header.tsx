import React from 'react'

const Header = () => {
  return (
    <nav className='w-full h-16 bg-white flex justify-between items-center py-4 sm:px-8 px-4'>
        <div>
          <img src={require("../../assets/Polygon 1.png")} alt="logo" className='w-10 h-auto' />
        </div>

        <div className='bg-green-800 w-8 h-8 rounded-full'>
          
        </div>

    </nav>
  )
}

export default Header