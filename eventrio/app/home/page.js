'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Settings, Plus } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleCreateEvent = () => {
    router.push('/home/users/events')
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-8">
          Welcome to EventHive
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Event Card */}
          <div 
            onClick={handleCreateEvent}
            className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 cursor-pointer hover:bg-purple-500/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Create New Event</h2>
              <Plus className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-gray-400">Start planning your next event with our easy-to-use tools.</p>
          </div>

          {/* View Events Card */}
          <div 
            onClick={() => router.push('/home/users/events')}
            className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 cursor-pointer hover:bg-purple-500/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">View Events</h2>
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-gray-400">Manage and track all your upcoming events.</p>
          </div>

          {/* User Management Card */}
          <div 
            onClick={() => router.push('/home/users/manage')}
            className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 cursor-pointer hover:bg-purple-500/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">User Management</h2>
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-gray-400">Manage user accounts and permissions.</p>
          </div>

          {/* Settings Card */}
          <div 
            onClick={() => router.push('/home/users/settings')}
            className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 cursor-pointer hover:bg-purple-500/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <Settings className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-gray-400">Configure your account and application preferences.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 