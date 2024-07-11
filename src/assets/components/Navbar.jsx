import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-600 text-white py-2'>
        <div className="logo">
        <span className="font-bold text-xl mx-8">iTask</span>
        </div>
        <ul className="flex gap-9 mx-7">
            <li className='cursor-pointer hover:text-black font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:text-black font-bold transition-all'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
