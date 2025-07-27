import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                  Event Management Reimagined
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Create Unforgettable
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 block mt-2">
                  Event Experiences
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Transform your events with our cutting-edge platform. From intimate gatherings to grand celebrations, 
              we&apos;re here to make your vision a reality.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/auth/signup" 
                className="group relative px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-purple-700"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/auth/login" 
                className="group relative px-8 py-4 bg-transparent text-purple-500 rounded-lg font-semibold text-lg border-2 border-purple-500 overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">10K+</div>
                <div className="text-sm text-gray-400">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">50K+</div>
                <div className="text-sm text-gray-400">Happy Users</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-3xl font-bold text-purple-500">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="group flex items-center gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gray-200 font-medium">Easy Registration</h3>
                  <p className="text-sm text-gray-400">Quick and seamless signup process</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gray-200 font-medium">Real-time Updates</h3>
                  <p className="text-sm text-gray-400">Stay informed with live notifications</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gray-200 font-medium">Team Collaboration</h3>
                  <p className="text-sm text-gray-400">Work together seamlessly</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gray-200 font-medium">Secure Platform</h3>
                  <p className="text-sm text-gray-400">Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="flex-1 relative mt-8 lg:mt-0">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] group">
              <div className="absolute inset-0 backdrop-blur-[1px] rounded-2xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/heros.png"
                  alt="Event Management Platform"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
