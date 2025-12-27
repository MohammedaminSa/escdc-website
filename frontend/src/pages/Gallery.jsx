import { useState, useEffect } from 'react';
import { getGalleryImages } from '../services/api';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'workshops', name: 'Workshops & Trainings' },
    { id: 'lectures', name: 'Guest Lectures' },
    { id: 'competitions', name: 'Competitions' },
    { id: 'networking', name: 'Networking Events' },
    { id: 'team', name: 'Team Activities' },
    { id: 'community', name: 'Community Engagement' }
  ];

  useEffect(() => {
    fetchImages();
    setIsVisible(true);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gallery`);
      const data = await response.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Modern Hero Section */}
      <section className="relative min-h-[70vh] pt-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Gradient orbs */}
          <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* University Badge */}
            <div className="mb-8 animate-fade-in-up">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 animate-pulse"></div>
                <p className="text-lg font-semibold tracking-wide">HARAMAYA UNIVERSITY</p>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full ml-3 animate-pulse delay-500"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight animate-fade-in-up delay-300">
              <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            
            <div className="mb-12 animate-fade-in-up delay-500">
              <p className="text-xl md:text-2xl font-bold mb-4 text-blue-200">
                Capturing Moments. Celebrating Success.
              </p>
              <p className="text-lg md:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
                Explore our journey through workshops, events, and memorable moments that define the ESCDC experience.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator with Animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse by Category</h2>
            <p className="text-gray-600">Filter photos by event type</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 animate-spin-slow">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <p className="text-xl text-gray-600 font-medium">Loading amazing moments...</p>
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${image.url}`}
                        alt={image.title || 'Gallery image'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {(image.title || image.description) && (
                      <div className="p-6">
                        {image.title && (
                          <h3 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{image.title}</h3>
                        )}
                        {image.description && (
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{image.description}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">{getCategoryName(image.category)}</span>
                          {image.eventDate && (
                            <span className="font-medium">{new Date(image.eventDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="text-6xl">📸</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'all' ? 'No Images Yet' : 'No Images in This Category'}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Gallery images will appear here once uploaded by club executives. Stay tuned for amazing moments!
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-sm text-blue-700 font-medium">
                  Club admins can upload images at <a href="/admin" className="text-blue-600 hover:underline font-bold">/admin</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Follow Us for More
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 font-medium">
              Stay connected and see our latest photos and videos on social media
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-4 text-lg font-bold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-4 text-lg font-bold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-4 text-lg font-bold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 group-hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
