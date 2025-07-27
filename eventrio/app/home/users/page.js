'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calendar, Plus, Home, Users, Settings, LogOut } from 'lucide-react'
import { getEvents } from '@/app/services/event/api'

export default function DashboardPage() {
  const [events,setEvents] = useState([])
  useEffect(() => {
    const fetchEvents = async () => { 
      const events = await getEvents()
      console.log(events)
      setEvents(events)
    }
    fetchEvents()
  }, [])
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'events', label: 'My Events', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleClick = (section) => {
    setActiveSection(section)
    switch(section) {
      case 'overview':
        router.push('/home/users/overview')
        break
      case 'events':
        router.push('/home/users/events')
        break
      case 'guests':
        router.push('/home/users/guests')
        break
      case 'settings':
        router.push('/home/users/settings')
        break
    }
  }

  const handleCreateEvent = () => {
    router.push('/home/users/events')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Navigation */}
      <div className="w-64 min-h-screen bg-black/40 backdrop-blur-lg border-r border-purple-500/20 p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative w-32 h-32">
            <Image
              src="/heros.png"
              alt="EventHive Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:bg-purple-500/10 hover:text-purple-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-purple-300 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Welcome back, User!
          </h1>
          <p className="text-gray-400 mt-2">Manage your events and guests from here</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={handleCreateEvent}
            className="bg-purple-500/20 hover:bg-purple-500/30 p-6 rounded-xl border border-purple-500/20 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Create New Event</h3>
                <p className="text-sm text-gray-400">Start planning your next event</p>
              </div>
            </div>
          </button>

          <div className="bg-black/40 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
            <h3 className="font-medium text-white mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold text-purple-400">{events.filter((event) => event.status === 'upcoming').length}</p>
            <p className="text-sm text-gray-400 mt-2">Events in the next 7 days</p>
          </div>

          <div className="bg-black/40 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
            <h3 className="font-medium text-white mb-2">Total Guests</h3>
            <p className="text-3xl font-bold text-purple-400">127</p>
            <p className="text-sm text-gray-400 mt-2">Across all your events</p>
          </div>
        </div>

        {/* Recent Events */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div 
                key={event._id || `event-${index}`} 
                className="bg-black/50 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="aspect-video bg-purple-500/10 rounded-lg mb-4"></div>
                <h3 className="font-medium text-white mb-2">{event.eventName || 'Untitled Event'}</h3>
                <p className="text-sm text-gray-400">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400">Guests: {event.attendees || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>  
    </div>
  )
}