import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className=' bg-main-red text-white'>
        <div className=' container mx-auto flex justify-between items-center py-3 px-4'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href='#' className=' hover: text-gray-300'>
                    <TbBrandMeta className=' h-5 w-5'/>
                </a>
                <a href='#' className=' hover: text-gray-300'>
                    <IoLogoInstagram />
                </a>
                <a href='#' className=' hover: text-gray-300'>
                    <RiTwitterXLine />
                </a>
            </div>
            <div className=' text-sm text-center flex-grow'>
                <span> We Ship worldwide - Fast and reliable shipping! </span>
            </div>
            <div className='text-sm hidden md:block'> 
                < a href='tel:+91 9988776655' className=' hover: text-gray-300'>
                +91 9988776655
                </a>
            </div>
        </div>

    </div>
  )
}

export default Topbar