import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { getResources } from '../services/api';

export default function Resources() {
  const [isVisible, setIsVisible] = useState(false);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/resources`);
      const data = await response.json();
      if (data.success) {
        // Group resources by category
        const grouped = data.resources.reduce((acc, resource) => {
          if (!acc[resource.category]) {
            acc[resource.category] = [];
          }
          acc[resource.category].push(resource);
          return acc;
        }, {});
        setResources(grouped);
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryInfo = {
    career: {
      title: 'Career Development',
      gradient: 'from-blue-500 to-blue-600'
    },
    entrepreneurship: {
      title: 'Entrepreneurship',
      gradient: 'from-green-500 to-green-600'
    },
    leadership: {
      title: 'Leadership & Skills',
      gradient: 'from-purple-500 to-purple-600'
    },
    opportunities: {
      title: 'Opportunities',
      gradient: 'from-orange-500 to-orange-600'
    }
  };

  const additionalResources = [
    {
      title: 'Reading Materials',
      description: 'Books and articles on entrepreneurship and career development',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Video Tutorials',
      description: 'Educational videos and recorded workshops',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Useful Links',
      description: 'External resources and partner organizations',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const handleDownload = (resourceId, filename) => {
    window.open(`${import.meta.env.VITE_API_URL}/resources/download/${resourceId}`, '_blank');
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl">Loading resources...</p>
        </div>
      </div>
    );
  }

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
              Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Access valuable materials to support your career and entrepreneurship journey
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {Object.keys(resources).length > 0 ? (
            <div className="space-y-16">
              {Object.entries(resources).map(([category, items]) => {
                const info = categoryInfo[category] || { 
                  title: category, 
                  gradient: 'from-gray-500 to-gray-600' 
                };
                return (
                  <div key={category}>
                    <div className="text-center mb-12">
                      <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
                        {info.title}
                      </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {items.map((item) => (
                        <div key={item._id} className="group">
                          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-gray-200 relative">
                            <div className="bg-gray-100 p-6 text-gray-800 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-200/50 rounded-full -translate-y-12 translate-x-12"></div>
                              <div className="relative z-10">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="text-xl font-bold flex-1">{item.title}</h3>
                                  <span className="text-xs px-3 py-1 rounded-full font-semibold bg-gray-200 text-gray-700 ml-2">
                                    {item.fileType.toUpperCase().replace('.', '')}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  <span className="font-medium">{formatFileSize(item.fileSize)}</span>
                                  {item.downloads > 0 && (
                                    <span className="ml-3">{item.downloads} downloads</span>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDownload(item._id, item.filename)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-4xl mx-auto mb-8">
                📄
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Resources Yet</h2>
              <p className="text-gray-600 text-lg mb-6">
                Resources will appear here once uploaded by club executives
              </p>
              <p className="text-sm text-gray-500">
                Club admins can upload resources at <a href="/admin" className="text-blue-600 hover:underline font-medium">/admin</a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              More Resources
            </h2>
            <p className="text-xl text-gray-600">Additional materials to support your growth</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalResources.map((resource, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600 text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && '📚'}
                      {index === 1 && '🎥'}
                      {index === 2 && '🔗'}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{resource.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Note */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-xl mr-6 flex-shrink-0">
                  📌
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Note for Members</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    These resources are continuously updated. Members receive exclusive access to additional materials 
                    and personalized guidance. Join ESCDC to unlock more opportunities!
                  </p>
                  <Link to="/membership">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Join ESCDC
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
