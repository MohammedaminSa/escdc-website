import { Link } from 'react-router-dom';

export default function Footer() {
  
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/escdc-logo.jpg" 
                  alt="ESCDC Logo" 
                  className="w-full h-full object-contain bg-white p-1 rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                ESCDC
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Entrepreneurship and Student Career Development Club of Haramaya University
            </p>
            <p className="text-blue-200 text-sm font-medium">
              Empowering Students for a Better Future
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-200">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About Us</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Programs</Link></li>
              <li><Link to="/membership" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Membership</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-purple-200">More</h3>
            <ul className="space-y-3">
              <li><Link to="/leadership" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Leadership</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Events</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Resources</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-indigo-200">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-white transition-colors duration-300">Haramaya University</li>
              <li className="hover:text-white transition-colors duration-300">Building II, Office NO. 12</li>
              <li className="hover:text-white transition-colors duration-300">escdc@haramaya.edu.et</li>
              <li className="hover:text-white transition-colors duration-300">+251 25 553 0325</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.facebook.com/escdc.haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/escdc_haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/escdc-haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-300 text-sm">
          <p className="font-medium">© {new Date().getFullYear()} Haramaya University – Entrepreneurship and Student Career Development Club</p>
          <p className="mt-2 text-blue-200">Empowering Students for a Better Future</p>
        </div>
      </div>
    </footer>
  );
}
