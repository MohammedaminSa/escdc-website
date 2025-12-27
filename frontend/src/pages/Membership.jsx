import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { submitMembershipForm } from '../services/api';

export default function Membership() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    interests: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
    
    try {
      const response = await submitMembershipForm(formData);
      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: '',
            studentId: '',
            email: '',
            phone: '',
            department: '',
            year: '',
            interests: ''
          });
        }, 3000);
      }
    } catch (error) {
      alert(error.message || 'Failed to submit registration. Please try again.');
    }
  };

  const benefits = [
    { text: 'Develop practical career and business skills' },
    { text: 'Build strong professional networks' },
    { text: 'Gain leadership and teamwork experience' },
    { text: 'Access training, mentorship, and opportunities' },
    { text: 'Enhance your employability and entrepreneurial potential' },
    { text: 'Be part of a supportive community' }
  ];

  const steps = [
    {
      number: '01',
      title: 'Fill the Form',
      description: 'Complete the membership registration form below'
    },
    {
      number: '02',
      title: 'Attend Orientation',
      description: 'Join our orientation session to learn more'
    },
    {
      number: '03',
      title: 'Get Active',
      description: 'Participate in club activities and events'
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
              Join ESCDC
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Be part of a community dedicated to your success and professional growth
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Why Join ESCDC?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock your potential with exclusive benefits and opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
                  <div className="flex items-start relative z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">
                      ✓
                    </div>
                    <span className="text-gray-700 text-lg font-medium leading-relaxed">{benefit.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Who Can Join?
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <ul className="space-y-6">
                {[
                  'All Haramaya University students',
                  'Students from any academic discipline',
                  'Passionate, motivated, and committed individuals'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      ✓
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              How to Join
            </h2>
            <p className="text-xl text-gray-600">Simple steps to become an ESCDC member</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-blue-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center">
                Membership Registration Form
              </h3>
              
              {submitted ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 p-8 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    ✓
                  </div>
                  <h4 className="text-2xl font-bold mb-4">Registration Successful!</h4>
                  <p className="text-lg">Thank you for joining ESCDC. We'll contact you soon with next steps.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">Student ID *</label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="Your student ID"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="+251 9XX XXX XXX"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">Department *</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="Your department"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">Year of Study *</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="5">5th Year</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Areas of Interest</label>
                    <textarea
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your interests in entrepreneurship, career development, or leadership..."
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Registration
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
