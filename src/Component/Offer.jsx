import React from 'react'
import { FaSearch,FaStar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'


const Offer = () => {
    const features = [
        {
            id: 1,
            title:"Search and Booking" ,
            description: "lorem Epsum lorem Epsum Akrith lorem",
            icon: <FaSearch/>
        },
        {
            id: 2,
            title:"Review and Ratings" ,
            description: "lorem Epsum lorem Epsum Akrith lorem",
            icon: <FaStar/>
        },
        {
            id: 3,
            title:"Map Integration" ,
            description: "lorem Epsum lorem Epsum Akrith lorem",
            icon: <FaLocationDot/>
        },
        {
            id: 4,
            title:"Cancellation Policy" ,
            description: "lorem Epsum lorem Epsum Akrith lorem",
            icon: <MdCancel/>
        },
    ]
  return (
    <div className="bg-[#E8F8F5] pt-12 ">
        <div className="font-bold font-[poppins] text-[#2C3E50] text-center text-4xl">What we offer?</div>
    </div>
  )
}

export default Offer