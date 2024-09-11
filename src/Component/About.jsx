import React from 'react'

const About = () => {
  return (
   <>
   <div className="w-full h-screen bg-[#E8F8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-auto bg-[#a7e8dc] flex flex-col md:flex-row items-center mx-auto rounded-lg">
          {/* Left content section */}
          <div className="flex justify-center items-center w-full md:w-1/2 h-full p-4">
            <img 
              src="https://knowledgemission.kerala.gov.in/img/official-login.jpg" 
              className="w-auto h-auto max-w-full max-h-full rounded-lg" 
              alt="login" 
            />
          </div>
          </div>
          </div>
   </>
  )
}

export default About