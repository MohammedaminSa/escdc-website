export default function About() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Modern Header */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              About ESCDC
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Empowering Haramaya University students for career success and entrepreneurship
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Who We Are
            </h2>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                ESCDC is an officially recognized student club at Haramaya University, established to support 
                students in career planning, entrepreneurship, and professional growth.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                The club is open to students from all colleges and departments, regardless of academic background, 
                who are passionate about career success, business creation, and leadership development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              What We Do
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Organize career development workshops',
              'Conduct entrepreneurship and startup training',
              'Facilitate mentorship and coaching programs',
              'Host guest lectures, seminars, and panel discussions',
              'Support student business ideas and innovation projects',
              'Provide career guidance and CV/interview preparation'
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">
                      ✓
                    </div>
                    <span className="text-gray-700 text-lg font-medium">{item}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    V
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg relative z-10">
                  To create a generation of innovative, employable, and entrepreneurial graduates who 
                  contribute meaningfully to national and global development.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 hover:-rotate-1 transition-all duration-500 border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-y-16 -translate-x-16"></div>
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    M
                  </div>
                  <h3 className="text-3xl font-bold text-purple-600">Our Mission</h3>
                </div>
                <ul className="space-y-3 text-gray-700 relative z-10">
                  {[
                    "Promote an entrepreneurship culture among Haramaya University students",
                    "Enhance career development, employability, and leadership skills",
                    "Connect students with industry professionals, startups, and institutions",
                    "Support student-led innovations and business ideas"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-purple-500 mr-3 text-xl">•</span>
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text">
              Core Values
            </h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Innovation' },
              { name: 'Integrity' },
              { name: 'Inclusiveness' },
              { name: 'Professionalism' },
              { name: 'Collaboration' }
            ].map((value) => (
              <div key={value.name} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center transform hover:scale-105 hover:rotate-2 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto group-hover:animate-bounce">
                    {value.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold">{value.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
