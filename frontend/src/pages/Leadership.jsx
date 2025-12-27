import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Leadership() {
  const [isVisible, setIsVisible] = useState(false);
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leadership`);
      const data = await response.json();
      if (data.success) {
        setLeadership(data.leadership);
      }
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  const higherManagement = leadership.filter(member => member.category === 'higher-management');
  const executiveSectors = leadership.filter(member => member.category === 'executive-sector');

  const sectorInfo = {
    'networking-professional': {
      title: 'Networking and Professional Development',
      description: 'Building connections with industry professionals and creating networking opportunities',
      gradient: 'from-blue-500 to-blue-600'
    },
    'innovation-technology': {
      title: 'Innovation and Technology',
      description: 'Fostering innovation and supporting tech-driven entrepreneurship',
      gradient: 'from-purple-500 to-purple-600'
    },
    'event-planning': {
      title: 'Event Planning',
      description: 'Organizing workshops, seminars, and club activities',
      gradient: 'from-green-500 to-green-600'
    },
    'student-career': {
      title: 'Student Career',
      description: 'Providing career guidance, CV support, and job readiness training',
      gradient: 'from-orange-500 to-orange-600'
    },
    'public-relations': {
      title: 'Public Relations',
      description: 'Managing communications, social media, and club visibility',
      gradient: 'from-pink-500 to-pink-600'
    }
  };

  // Fallback data if no leadership is loaded
  const fallbackExecutiveSectors = [
    {
      sector: 'networking-professional',
      description: 'Building connections with industry professionals and creating networking opportunities'
    },
    {
      sector: 'innovation-technology',
      description: 'Fostering innovation and supporting tech-driven entrepreneurship'
    },
    {
      sector: 'event-planning',
      description: 'Organizing workshops, seminars, and club activities'
    },
    {
      sector: 'student-career',
      description: 'Providing career guidance, CV support, and job readiness training'
    },
    {
      sector: 'public-relations',
      description: 'Managing communications, social media, and club visibility'
    }
  ];

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
              Leadership
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated team leading ESCDC towards excellence
            </p>
          </div>
        </div>
      </section>

      {/* Higher Management */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Higher Management
            </h2>
            <p className="text-xl text-gray-600">Strategic leadership guiding ESCDC's vision and mission</p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-spin">
                ⏳
              </div>
              <p className="text-gray-600 text-lg">Loading leadership...</p>
            </div>
          ) : higherManagement.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {higherManagement.map((leader, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="p-8 text-center relative z-10">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        {leader.image ? (
                          <img 
                            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${leader.image}`} 
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl text-gray-600">👤</span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{leader.position}</h3>
                      <p className="text-xl font-semibold text-gray-700 mb-4">{leader.name}</p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{leader.bio}</p>
                      <div className="space-y-2">
                        {leader.email && (
                          <p className="text-sm text-blue-600 font-medium">{leader.email}</p>
                        )}
                        {leader.phone && (
                          <p className="text-sm text-gray-600">{leader.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-8">
                👥
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Leadership Team Coming Soon</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Leadership information will be updated once elections are completed
              </p>
              <p className="text-sm text-gray-500">
                Club admins can add leadership at <a href="/admin" className="text-blue-600 hover:underline font-medium">/admin</a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Executive Sectors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Executive Sectors
            </h2>
            <p className="text-xl text-gray-600">Specialized teams driving our mission forward</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveSectors.length > 0 ? (
              // Show actual executive sector members
              executiveSectors.map((member, index) => {
                const sector = sectorInfo[member.sector] || { 
                  title: member.sector, 
                  description: '', 
                  gradient: 'from-gray-500 to-gray-600' 
                };
                return (
                  <div key={index} className="group">
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200 relative">
                      <div className="bg-gray-100 p-6 text-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-200/50 rounded-full -translate-y-12 translate-x-12"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
                          <p className="text-sm text-gray-600">{sector.description}</p>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center">
                          {member.image ? (
                            <img 
                              src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${member.image}`} 
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                              <span className="text-gray-600 text-lg">👤</span>
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.position}</p>
                          </div>
                        </div>
                        {member.email && (
                          <p className="text-xs text-blue-600 mt-3 font-medium">{member.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Show fallback sector structure
              fallbackExecutiveSectors.map((sector, index) => {
                const info = sectorInfo[sector.sector] || { 
                  title: sector.sector, 
                  description: sector.description,
                  gradient: 'from-gray-500 to-gray-600'
                };
                return (
                  <div key={index} className="group">
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200 relative">
                      <div className="bg-gray-100 p-6 text-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-200/50 rounded-full -translate-y-12 translate-x-12"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <p className="text-gray-500 italic text-center">Team members to be announced</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Leadership Structure */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Our Structure
            </h2>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                The club is managed by an elected executive committee responsible for planning, coordination, 
                and implementation of activities. Our leadership structure ensures effective governance and 
                comprehensive support for all members.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                    H
                  </div>
                  <h3 className="font-bold text-xl text-blue-600 mb-3">Higher Management</h3>
                  <p className="text-gray-600">
                    Provides strategic direction and oversees overall club operations
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                    E
                  </div>
                  <h3 className="font-bold text-xl text-purple-600 mb-3">Executive Sectors</h3>
                  <p className="text-gray-600">
                    Specialized teams focusing on specific areas of club activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Leadership CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Interested in Leadership?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-2xl mx-auto">
              Active members have opportunities to take on leadership roles and contribute to club governance
            </p>
            <p className="text-lg mb-8 text-blue-200">
              Elections are held annually. Stay engaged and make your mark!
            </p>
            <Link to="/membership">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 px-10 py-4 text-xl font-bold shadow-2xl rounded-full">
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
