import { Star, Heart, RotateCcw, Maximize } from 'lucide-react'

export default function CardNine() {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden group">
      <div className="relative">
        <img
          src="/placeholder.svg?height=200&width=256"
          alt="Green Xbox Controller"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300">
          <button 
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Expand"
          >
            <Maximize className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Rotate view"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex mb-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
          Xoggle aute et pariatur adipisicing nostrud et...
        </h3>
        <div className="relative h-10">
          <button className="w-full bg-orange-400 text-white py-2 px-4 rounded-md font-semibold hover:bg-primary transition-all duration-300 absolute opacity-0 group-hover:opacity-100 bottom-0 group-hover:bottom-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}