import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get the correct base URL for media
  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return null;
    // Remove /api from VITE_API_URL to get the base server URL
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${mediaPath}`;
  };

  useEffect(() => {
    setIsVisible(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Fetch upcoming events
      const upcomingResponse = await fetch(`${import.meta.env.VITE_API_URL}/events/upcoming`);
      const upcomingData = await upcomingResponse.json();
      
      // Fetch recent events
      const recentResponse = await fetch(`${import.meta.env.VITE_API_URL}/events/recent`);
      const recentData = await recentResponse.json();

      if (upcomingData.success) {
        setUpcomingEvents(upcomingData.events);
      }
      
      if (recentData.success) {
        setRecentEvents(recentData.events);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Fallback to static data if API fails
      setUpcomingEvents([
        {
          title: 'Entrepreneurship Training Workshop',
          date: '2025-01-15T00:00:00.000Z',
          description: 'Advanced training on business model development, market analysis, and startup fundamentals',
          type: 'workshop',
          icon: '🎓',
          location: 'Haramaya University',
          organizer: 'ESCDC Team'
        },
        {
          title: 'Career Development Seminar',
          date: '2025-02-15T00:00:00.000Z',
          description: 'CV writing, interview preparation, LinkedIn optimization, and professional networking strategies',
          type: 'seminar',
          icon: '💼',
          location: 'Haramaya University',
          organizer: 'ESCDC Team'
        }
      ]);
      
      setRecentEvents([
        {
          title: 'Career Guidance Workshop',
          date: '2024-12-01T00:00:00.000Z',
          description: 'Comprehensive workshop for graduating students on career planning and job search strategies',
          type: 'workshop',
          icon: '🎓',
          location: 'Haramaya University',
          organizer: 'ESCDC Team'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getColorGradient = (type, index) => {
    const gradients = {
      workshop: 'from-blue-500 to-blue-600',
      seminar: 'from-green-500 to-green-600', 
      competition: 'from-purple-500 to-purple-600',
      lecture: 'from-orange-500 to-orange-600',
      networking: 'from-indigo-500 to-indigo-600',
      training: 'from-red-500 to-red-600'
    };
    
    const fallbackGradients = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600'
    ];
    
    return gradients[type] || fallbackGradients[index % fallbackGradients.length];
  };

  const eventTypes = [
    { title: 'Workshops', desc: 'Hands-on training sessions', gradient: 'from-blue-500 to-blue-600', icon: '🎓' },
    { title: 'Seminars', desc: 'Expert talks and discussions', gradient: 'from-green-500 to-green-600', icon: '🎤' },
    { title: 'Competitions', desc: 'Pitch contests and challenges', gradient: 'from-purple-500 to-purple-600', icon: '🏆' },
    { title: 'Networking', desc: 'Meet professionals and peers', gradient: 'from-orange-500 to-orange-600', icon: '🤝' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          {/* Animated particles */}
          {[...Array(25)].map((_, i) => (
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
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* University Badge */}
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

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
                News & Events
              </span>
            </h1>
            
            <div className="mb-12 animate-fade-in-up delay-500">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-blue-200">
                Empowering Through Experience. Growing Through Engagement.
              </p>
              <p className="text-lg md:text-xl text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed">
                Discover our dynamic events, workshops, and activities designed to accelerate your entrepreneurial journey and career development.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center items-center gap-12 md:gap-16 animate-fade-in-up delay-700">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-1 group-hover:scale-110 transition-transform duration-300">
                  {upcomingEvents.length}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  Upcoming Events
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-1 group-hover:scale-110 transition-transform duration-300">
                  {recentEvents.length}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  Recent Activities
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-1 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                  Total Events
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Upcoming Events */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Upcoming Events
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Don't miss these exciting opportunities to grow, learn, and connect
            </p>
          </div>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl mx-auto mb-8 animate-pulse">
                📅
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">No Upcoming Events</h3>
              <p className="text-gray-600 text-xl mb-4">No events scheduled at the moment.</p>
              <p className="text-gray-500 text-lg">Check back soon for new exciting events!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => {
                const gradient = getColorGradient(event.type, index);
                return (
                  <div key={event._id || index} className="group">
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-6 transition-all duration-500 overflow-hidden border border-gray-100 relative">
                      {/* Event Header with Media */}
                      <div className={`bg-gradient-to-r ${gradient} p-8 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{event.icon || '🎓'}</span>
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                              {event.type?.charAt(0).toUpperCase() + event.type?.slice(1) || 'Event'}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-3">{event.title}</h3>
                          <p className="text-lg opacity-90 font-medium">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      
                      {/* Event Media Gallery */}
                      {event.media && event.media.length > 0 && (
                        <div className="p-6 border-b border-gray-100">
                          {/* Featured Media - Show first image/video larger */}
                          {event.media.length === 1 ? (
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                              {event.media[0].mediaType === 'video' ? (
                                <video 
                                  src={getMediaUrl(event.media[0].url)}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  controls={false}
                                  muted
                                />
                              ) : (
                                <img 
                                  src={getMediaUrl(event.media[0].url)}
                                  alt={`${event.title} featured media`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Main featured image */}
                              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                                {event.media[0].mediaType === 'video' ? (
                                  <video 
                                    src={getMediaUrl(event.media[0].url)}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    controls={false}
                                    muted
                                  />
                                ) : (
                                  <img 
                                    src={getMediaUrl(event.media[0].url)}
                                    alt={`${event.title} featured media`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                )}
                              </div>
                              
                              {/* Additional media thumbnails */}
                              {event.media.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                  {event.media.slice(1, 5).map((media, mediaIndex) => (
                                    <div key={mediaIndex + 1} className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                      {media.mediaType === 'video' ? (
                                        <video 
                                          src={getMediaUrl(media.url)}
                                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                          controls={false}
                                          muted
                                        />
                                      ) : (
                                        <img 
                                          src={getMediaUrl(media.url)}
                                          alt={`${event.title} media ${mediaIndex + 2}`}
                                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Media count indicator */}
                          {event.media.length > 1 && (
                            <div className="flex justify-between items-center mt-4">
                              <p className="text-sm text-gray-600 font-medium">
                                📸 {event.media.length} media files
                              </p>
                              {event.media.length > 5 && (
                                <p className="text-sm text-blue-600 font-medium">
                                  +{event.media.length - 5} more in gallery
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Event Details */}
                      <div className="p-8">
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">{event.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-600">
                            <span className="text-lg mr-3">📍</span>
                            <span className="font-medium">{event.location || 'Haramaya University'}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="text-lg mr-3">👤</span>
                            <span className="font-medium">{event.organizer || 'ESCDC Team'}</span>
                          </div>
                          {event.maxParticipants && (
                            <div className="flex items-center text-gray-600">
                              <span className="text-lg mr-3">👥</span>
                              <span className="font-medium">Max {event.maxParticipants} participants</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                          {event.registrationRequired && (
                            <span className={`inline-block bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                              Registration Required
                            </span>
                          )}
                          <span className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">
                            Free Event
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Recent Activities
            </h2>
            <p className="text-xl text-gray-600">Highlights from our past events</p>
          </div>
          
          {recentEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-8">
                📋
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Recent Activities</h3>
              <p className="text-gray-600 text-lg mb-2">No recent activities to display.</p>
              <p className="text-gray-500">Events will appear here after they're completed.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {recentEvents.map((activity, index) => {
                const gradient = getColorGradient(activity.type, index);
                return (
                  <div key={activity._id || index} className="group">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12"></div>
                      
                      {/* Activity Media */}
                      {activity.media && activity.media.length > 0 && (
                        <div className="aspect-video bg-gray-100 overflow-hidden">
                          {activity.media[0].mediaType === 'video' ? (
                            <video 
                              src={getMediaUrl(activity.media[0].url)}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              controls={false}
                              muted
                            />
                          ) : (
                            <img 
                              src={getMediaUrl(activity.media[0].url)}
                              alt={`${activity.title} media`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {activity.media.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              +{activity.media.length - 1} more
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6 relative z-10">
                        <div className="flex items-start">
                          <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                            📅
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h3>
                            <p className="text-sm text-gray-500 mb-3 font-medium">{formatDate(activity.date)}</p>
                            <p className="text-gray-700 leading-relaxed mb-4">{activity.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                                {activity.location || 'Haramaya University'}
                              </span>
                              {activity.organizer && (
                                <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                                  {activity.organizer}
                                </span>
                              )}
                              {activity.media && activity.media.length > 0 && (
                                <span className="inline-block bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-blue-700 border border-blue-200">
                                  📸 {activity.media.length} media
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Types of Events We Host
            </h2>
            <p className="text-xl text-gray-600">Diverse programs for comprehensive development</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="p-8 text-center relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {index === 0 && '🎓'}
                      {index === 1 && '🎤'}
                      {index === 2 && '🏆'}
                      {index === 3 && '🤝'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{type.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{type.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Updated CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Don't Miss Out!
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-2xl mx-auto">
              Follow us on social media and join our Telegram channel for event updates and announcements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://www.facebook.com/escdc.haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Facebook
              </a>
              <a 
                href="https://t.me/escdc_haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Telegram
              </a>
              <a 
                href="https://www.linkedin.com/company/escdc-haramaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                LinkedIn
              </a>
            </div>
            <Link to="/membership">
              <Button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white transform hover:scale-110 transition-all duration-300 px-10 py-4 text-xl font-bold rounded-full">
                Join ESCDC Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
