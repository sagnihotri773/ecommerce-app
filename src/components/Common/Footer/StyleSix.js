// import { SlSocialFacebook } from "react-icons/sl";
// import { CiTwitter } from "react-icons/ci";


const companyLinks = [
  { text: "About Us", href: "#" },
  { text: "Contact Us", href: "#" },
  { text: "Customer Service", href: "#" },
  { text: "Privacy Policy", href: "#" },
];

const customerServiceLinks = [
  { text: "My Account", href: "#" },
  { text: "Track My Order", href: "#" },
  { text: "Shipping & Returns", href: "#" },
  { text: "FAQs", href: "#" },
  { text: "Documentation", href: "#" },
];

// const socialLinks = [
//   { icon: <SlSocialFacebook className="w-5 h-5 mr-2" />, text: "Facebook", href: "#" },
//   { icon: <CiTwitter className="w-5 h-5 mr-2" />, text: "Twitter", href: "#" },
//   { icon: <CiTwitter className="w-5 h-5 mr-2" />, text: "Instagram", href: "#" },
// ];

const storeLocations = [
  { text: "New York", href: "#" },
  { text: "Los Angeles", href: "#" },
  { text: "London", href: "#" },
  { text: "Paris", href: "#" },
];

export const StyleSix = () => {
  return (
    <footer className="bg-[#232323] text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-3xl font-light mb-8">pearl.</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              {customerServiceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
            <ul className="space-y-2">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="flex items-center hover:underline">
                    {link.icon} {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
          
          <div>
            <h2 className="text-lg font-semibold mb-4">SUBSCRIBE TO OUR NEWSLETTER</h2>
            <form className="flex flex-row space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white w-full border text-black border-[#E1E5E6] py-2 focus:outline-none focus:border-transparent"
              />
              <button type="submit" className="bg-white px-5 text-gray-900 text-sm justify-center items-center flex hover:bg-gray-200">
                SignUp
              </button>
            </form>
            <p className="text-xs mt-2 text-gray-400">
              By clicking "Submit," you agree to receive emails from pearl and accept our web terms of use and privacy and cookie policy.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <h3 className="text-lg font-semibold mb-4">STORES</h3>
          <ul className="flex flex-wrap gap-4">
            {storeLocations.map((location, index) => (
              <li key={index}>
                <a href={location.href} className="hover:underline">{location.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
