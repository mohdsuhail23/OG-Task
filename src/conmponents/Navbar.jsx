import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-violet-800 text-white py-2'>
        <span className='font-bold text-2xl mx-6 cursor-pointer hover:text-neutral-200 transition-all duration-100'>Todo List App</span>
        <ul className="flex gap-8 mx-8">
            <li className='text-xl mr-8 hover:font-bold cursor-pointer transition-all back'>Home</li>
            <li className='text-xl  hover:font-bold cursor-pointer transition-all'>About</li>
        </ul>

    </nav>
  )
}

export default Navbar