'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useCurrency } from '@/app/context/CurrencyContext'
import { useData } from '@/app/context/DataContext'

export default function OverviewPage() {
  const router = useRouter()
  const { formatCurrency } = useCurrency()
  const { 
    stats, 
    recentActivity, 
    isLoading, 
    formatTimestamp, 
    handleQuickAction,
    refreshData 
  } = useData()

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-400'
    if (growth < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const getGrowthIcon = (growth) => {
    if (growth > 0) return '↑'
    if (growth < 0) return '↓'
    return '→'
  }

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'event_created':
        return `${activity.user} created a new event: ${activity.event}`
      case 'user_registered':
        return `${activity.user} registered as a new user`
      case 'payment_received':
        return `Received payment of ${formatCurrency(activity.amount)} from ${activity.user}`
      case 'event_updated':
        return `${activity.user} updated event: ${activity.event}`
      case 'task_completed':
        return `${activity.user} completed task: ${activity.task}`
      default:
        return 'Unknown activity'
    }
  }

  const handleCreateEvent = () => {
    router.push('/home/users/events')
  }

  return (
    <div className="p-6 bg-black text-white">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Go Back</span>
      </button>

      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <button 
          onClick={refreshData}
          className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">{stats.totalUsers.toLocaleString()}</p>
          <p className={`${getGrowthColor(stats.userGrowth)} text-sm mt-2`}>
            {getGrowthIcon(stats.userGrowth)} {Math.abs(stats.userGrowth)}% from last month
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-sm font-medium text-gray-400">Active Events</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">{stats.activeEvents}</p>
          <p className={`${getGrowthColor(stats.eventGrowth)} text-sm mt-2`}>
            {getGrowthIcon(stats.eventGrowth)} {Math.abs(stats.eventGrowth)}% from last month
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">{formatCurrency(stats.totalRevenue)}</p>
          <p className={`${getGrowthColor(stats.revenueGrowth)} text-sm mt-2`}>
            {getGrowthIcon(stats.revenueGrowth)} {Math.abs(stats.revenueGrowth)}% from last month
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-sm font-medium text-gray-400">Pending Tasks</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">{stats.pendingTasks}</p>
          <p className={`${getGrowthColor(stats.taskGrowth)} text-sm mt-2`}>
            {getGrowthIcon(stats.taskGrowth)} {Math.abs(stats.taskGrowth)}% from last month
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-4 hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{getActivityDescription(activity)}</p>
                    <p className="text-sm text-gray-400">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleCreateEvent}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
              >
                Create New Event
              </button>
              <button 
                onClick={() => handleQuickAction('view_reports')}
                className="w-full bg-black/40 hover:bg-purple-500/10 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
              >
                View Reports
              </button>
              <button 
                onClick={() => handleQuickAction('manage_users')}
                className="w-full bg-black/40 hover:bg-purple-500/10 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
              >
                Manage Users
              </button>
              <button 
                onClick={() => handleQuickAction('settings')}
                className="w-full bg-black/40 hover:bg-purple-500/10 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
