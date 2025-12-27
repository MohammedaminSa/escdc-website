import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Programs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const programs = [
    {
      title: 'Entrepreneurship Development Program',
      description: 'Transform your innovative ideas into successful business ventures',
      color: 'blue',
      activities: [
        'Business idea generation workshops',
        'Startup and business plan training',
        'Innovation challenges and pitch competitions',
        'Financial literacy and small business management'
      ]
    },
    {
      title: 'Career Development Program',
      description: 'Build the skills and confidence needed for professional success',
      color: 'green',
      activities: [
        'CV and cover letter writing workshops',
        'Interview skills and workplace readiness training',
        'Career guidance and counseling sessions',
        'Internship and job opportunity awareness'
      ]
    },
    {
      title: 'Leadership & Soft Skills Training',
      description: 'Develop essential leadership qualities and interpersonal skills',
      color: 'purple',
      activities: [
        'Communication and public speaking',
        'Teamwork and problem-solving',
        'Time management and professionalism',
        'Ethical leadership and responsibility'
      ]
    },
    {
      title: 'Industry & Community Engagement',
      description: 'Connect with industry professionals and real-world opportunities',
      color: 'orange',
      activities: [
        'Guest speakers from industry and academia',
        'Company visits and experience-sharing sessions',
        'Collaboration with NGOs, startups, and institutions',
        'Community-based entrepreneurship initiatives'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Practical Skills',
      description: 'Hands-on training in entrepreneurship and career development',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Networking',
      description: 'Connect with professionals, mentors, and like-minded peers',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Recognition',
      description: 'Certificates and opportunities to showcase your achievements',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const colorGradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Programs & Activities
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Comprehensive programs designed to develop your entrepreneurial mindset and professional skills
            </p>
            <div className="flex justify-center">
              <Link to="/membership">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Join Our Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Our Core Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four comprehensive programs designed to transform your career and entrepreneurial journey
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200"
              >
                <div className="bg-gray-100 p-8 text-gray-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {program.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-8">
                  <h4 className="text-lg font-bold mb-6 text-gray-800">What You'll Learn:</h4>
                  <ul className="space-y-4">
                    {program.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start group-hover:translate-x-2 transition-transform duration-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              What You'll Gain
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your potential into measurable success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600 text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && '📚'}
                      {index === 1 && '🌐'}
                      {index === 2 && '🏆'}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium">
              Join ESCDC today and unlock your potential through our comprehensive programs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/membership">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 px-10 py-4 text-xl font-bold shadow-2xl rounded-full">
                  Become a Member
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-4 text-xl font-bold rounded-full">
                  Get More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
