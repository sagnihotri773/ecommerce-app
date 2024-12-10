import { useState } from "react"
// import { SlSocialFacebook } from "react-icons/sl"
// import { CiTwitter } from "react-icons/ci"
// import { FiYoutube } from "react-icons/fi"

export default function StyleFive() {
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm((prev) => !prev)
  }

  return (
    <footer className="bg-gray-100 py-8 px-4 cursor-pointer">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-6 mb-6">
          {/* <SlSocialFacebook className="w-6 h-6 text-gray-600" />
          <CiTwitter className="w-6 h-6 text-gray-600" />
          <FiYoutube className="w-6 h-6 text-gray-600" /> */}
        </div>
        <nav className="flex justify-center space-x-6 mb-6 text-sm text-gray-600">
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">PRIVACY</a>
          <a href="#" className="hover:underline">TERMS OF USE</a>
          <a href="#" className="hover:underline">CONTACT</a>
        </nav>
        <div className="text-center mb-6">
          <h3 
            className="text-sm text-gray-600 mb-2 cursor-pointer hover:text-gray-800 transition-colors duration-300 underline" 
            onClick={toggleForm}
          >
            SUBSCRIBE TO THE NEWSLETTER
          </h3>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <form className="flex justify-center items-center mt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-64 mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                required
              />
              <button 
                type="submit" 
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}