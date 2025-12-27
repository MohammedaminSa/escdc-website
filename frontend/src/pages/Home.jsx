import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { number: "500+", label: "Members" },
    { number: "50+", label: "Workshops" },
    { number: "100+", label: "Success Stories" },
    
  ];

  useEffect(() => {
    setIsVisible(true);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Ultra Interactive Hero Section */}
      <section className="relative min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center overflow-hidden">
        {/* Dynamic Particle Background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Interactive gradient orbs */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
            }}
          />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Animated University Badge */}
            <div className="mb-8 animate-fade-in-up">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-white/20 p-1">
                  <img 
                    src="/escdc-logo.jpg" 
                    alt="ESCDC Logo" 
                    className="w-full h-full object-contain bg-white rounded-full"
                  />
                </div>
                <p className="text-lg font-semibold tracking-wide group-hover:text-blue-200 transition-colors">
                  HARAMAYA UNIVERSITY
                </p>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full ml-3 animate-pulse delay-500"></div>
              </div>
            </div>

            {/* Dynamic Main Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
                  Entrepreneurship &
                </span>
                <span className="block bg-gradient-to-r from-purple-200 via-blue-200 to-white bg-clip-text text-transparent animate-fade-in-up delay-300">
                  Student Career
                </span>
                <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent animate-fade-in-up delay-500">
                  Development Club
                </span>
              </h1>
              
              {/* Updated description */}
              <div className="mb-8 animate-fade-in-up delay-700">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-blue-200">
                  Empowering Students. Building Careers. Creating Entrepreneurs.
                </p>
                <p className="text-lg md:text-xl text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed">
                  A student-led platform dedicated to empowering students with entrepreneurial mindset, career readiness skills, and leadership capacity.
                </p>
              </div>
            </div>

            {/* Enhanced CTA Buttons - Moved up and made smaller */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-900">
              <Link to="/membership">
                <Button size="lg" className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 px-10 py-5 text-lg font-bold shadow-2xl border-0 rounded-full overflow-hidden">
                  <span className="relative z-10">Join ESCDC</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-5 text-lg font-bold rounded-full">
                  <span className="group-hover:text-blue-200 transition-colors duration-300">Discover More</span>
                </Button>
              </Link>
            </div>

            {/* Clean Stats Display - Smaller and 3 stats */}
            <div className="flex mb-12 justify-center items-center gap-12 md:gap-16 animate-fade-in-up delay-1100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group cursor-pointer">
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Enhanced Interactivity */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Our Purpose
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Driving innovation and excellence in student development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg relative z-10">
                  To create a generation of innovative, employable, and entrepreneurial graduates who 
                  contribute meaningfully to national and global development through cutting-edge skills and leadership.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:-rotate-1 transition-all duration-500 border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-y-16 -translate-x-16"></div>
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    🚀
                  </div>
                  <h3 className="text-3xl font-bold text-purple-600">Our Mission</h3>
                </div>
                <ul className="space-y-3 text-gray-700 relative z-10">
                  {[
                    "Promote entrepreneurship culture among students",
                    "Enhance career development and employability skills", 
                    "Connect students with industry professionals",
                    "Support student-led innovations and business ideas"
                  ].map((item) => (
                    <li key={item} className="flex items-start group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-purple-500 mr-3 text-xl">✨</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Innovation', icon: '💡' },
              { name: 'Integrity', icon: '🛡️' },
              { name: 'Inclusiveness', icon: '🤝' },
              { name: 'Professionalism', icon: '👔' },
              { name: 'Collaboration', icon: '🌟' }
            ].map((value) => (
              <div key={value.name} className="group cursor-pointer">
                <div className="bg-white p-8 rounded-3xl text-gray-800 text-center transform hover:scale-105 hover:rotate-2 transition-all duration-300 shadow-lg hover:shadow-2xl border border-gray-200">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{value.icon}</div>
                  <h3 className="text-xl font-bold">{value.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to accelerate your personal and professional growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎓',
                title: 'Training & Workshops',
                description: 'Comprehensive career development workshops, entrepreneurship bootcamps, and leadership masterclasses',
                features: ['Career Planning', 'Skill Development', 'Industry Insights', 'Certification Programs']
              },
              {
                icon: '🤝',
                title: 'Mentorship Program',
                description: 'Connect with successful alumni, industry leaders, and experienced professionals for personalized guidance',
                features: ['1-on-1 Mentoring', 'Industry Networks', 'Career Guidance', 'Personal Development']
              },
              {
                icon: '💡',
                title: 'Innovation Hub',
                description: 'Support for student business ideas, startup incubation, and innovation projects with funding opportunities',
                features: ['Startup Support', 'Funding Access', 'Business Planning', 'Market Research']
              }
            ].map((service) => (
              <div key={service.title} className="group">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 p-6 text-gray-800">
                    <div className="text-5xl mb-4 group-hover:animate-pulse">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 text-sm">
                          <span className="text-blue-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 font-medium">
              Join thousands of students who have already started their success journey with ESCDC
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/membership">
                <Button size="lg" className="group relative bg-white text-blue-900 hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 px-12 py-6 text-xl font-bold shadow-2xl rounded-full">
                  <span className="relative z-10">Become a Member</span>
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-12 py-6 text-xl font-bold rounded-full">
                  <span>Explore Programs</span>
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-8 text-blue-200">
              <span className="text-sm font-medium">Free membership</span>
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              <span className="text-sm font-medium">Exclusive workshops</span>
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              <span className="text-sm font-medium">Industry connections</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
