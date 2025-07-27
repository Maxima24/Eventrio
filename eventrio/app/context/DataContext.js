'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DataContext = createContext()

export function DataProvider({ children }) {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    totalRevenue: 0,
    pendingTasks: 0,
    userGrowth: 0,
    eventGrowth: 0,
    revenueGrowth: 0,
    taskGrowth: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate data fetching
      const mockData = {
        stats: {
          totalUsers: 1234,
          activeEvents: 56,
          totalRevenue: 45678,
          pendingTasks: 23,
          userGrowth: 12,
          eventGrowth: 8,
          revenueGrowth: 15,
          taskGrowth: -5
        },
        recentActivity: [
          {
            id: 1,
            type: 'event_created',
            user: 'John Doe',
            event: 'Tech Conference 2024',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            icon: '🎉'
          },
          {
            id: 2,
            type: 'user_registered',
            user: 'Sarah Smith',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            icon: '👤'
          },
          {
            id: 3,
            type: 'payment_received',
            user: 'Mike Johnson',
            amount: 299.99,
            timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
            icon: '💰'
          },
          {
            id: 4,
            type: 'event_updated',
            user: 'Emma Wilson',
            event: 'Music Festival',
            timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
            icon: '📝'
          },
          {
            id: 5,
            type: 'task_completed',
            user: 'Alex Brown',
            task: 'Venue Setup',
            timestamp: new Date(Date.now() - 1000 * 60 * 150), // 2.5 hours ago
            icon: '✅'
          }
        ]
      }

      setStats(mockData.stats)
      setRecentActivity(mockData.recentActivity)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Format timestamp to relative time
  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 1000 / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  // Handle quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case 'create_event':
        router.push('/home/users/events')
        break
      case 'view_reports':
        router.push('/home/users/reports')
        break
      case 'manage_users':
        router.push('/home/users/manage')
        break
      case 'settings':
        router.push('/home/users/settings')
        break
      default:
        console.warn('Unknown action:', action)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <DataContext.Provider value={{
      stats,
      recentActivity,
      isLoading,
      formatTimestamp,
      handleQuickAction,
      refreshData: fetchDashboardData
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
} 