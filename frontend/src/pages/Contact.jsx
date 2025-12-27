import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { submitContactForm } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    }
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
                Contact Us
              </span>
            </h1>
            
            <div className="mb-12 animate-fade-in-up delay-500">
              <p className="text-xl md:text-2xl font-bold mb-4 text-blue-200">
                Let's Connect. Let's Collaborate.
              </p>
              <p className="text-lg md:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
                Get in touch with ESCDC - We'd love to hear from you and explore opportunities together.
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

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  📍
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Haramaya University<br />
                  Main Campus<br />
                  Building II, Office NO. 12
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  📧
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:escdc@haramaya.edu.et" className="hover:text-blue-600 transition-colors duration-300 font-medium">
                    escdc@haramaya.edu.et
                  </a>
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  📱
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">Phone</h3>
                <p className="text-gray-600 font-medium">
                  +251 25 553 0325
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Send Us a Message</h2>
              <p className="text-xl text-gray-600">We'll get back to you within 24 hours</p>
            </div>
            
            {submitted ? (
              <div className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-3xl p-12 text-center shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <div className="text-4xl text-white">✓</div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-green-700">Message Sent Successfully!</h3>
                <p className="text-xl text-green-600">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                <div className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-2xl">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">⚠️</div>
                          <p className="font-medium">{error}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-gray-800 font-bold mb-3 text-lg">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-800 font-bold mb-3 text-lg">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-800 font-bold mb-3 text-lg">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-800 font-bold mb-3 text-lg">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 px-12 py-6 text-xl font-bold shadow-2xl border-0 rounded-full overflow-hidden"
                      >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Connect With Us</h2>
            <p className="text-xl text-gray-600">Follow us on social media for updates and news</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="https://www.facebook.com/escdc.haramaya" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 text-center border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">Facebook</h3>
                <p className="text-gray-600 font-medium">Follow us for updates</p>
              </div>
            </a>
            
            <a 
              href="https://t.me/escdc_haramaya" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 text-center border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 group-hover:text-blue-500 transition-colors duration-300 mb-2">Telegram</h3>
                <p className="text-gray-600 font-medium">Join our channel</p>
              </div>
            </a>
            
            <a 
              href="https://www.linkedin.com/company/escdc-haramaya" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:-rotate-1 transition-all duration-500 text-center border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-2xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300 mb-2">LinkedIn</h3>
                <p className="text-gray-600 font-medium">Professional network</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-3xl text-center border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-4xl">🕒</div>
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Office Hours</h2>
            <p className="text-2xl font-bold mb-4 text-blue-200">Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p className="text-xl text-gray-300 font-medium">Visit us at our office or reach out via email anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
}
