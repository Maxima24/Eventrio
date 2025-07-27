'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Lock, Bell, Globe, CreditCard, Shield, Palette, HelpCircle, DollarSign } from 'lucide-react'
import { useCurrency } from '@/app/context/CurrencyContext'

export default function SettingsPage() {
  const router = useRouter()
  const { currency, setCurrency, formatCurrency, formatEquivalentAmount } = useCurrency()
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  })
  const [theme, setTheme] = useState('dark')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    dataCollection: true
  })

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'currency', label: 'Currency', icon: DollarSign },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ]

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-black text-white">
      {/* Back Button */}
      <button 
        onClick={() => router.push('/home/users')}
        className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Go Back</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4">
          <nav className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-purple-500/10 hover:text-purple-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4 sm:p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-purple-400" />
                    </div>
                    <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                      Change Photo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    defaultValue="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Bio</label>
                  <textarea 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 h-32"
                    defaultValue="Event organizer and tech enthusiast"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <div>
                    <h3 className="text-white font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-400">Receive marketing and promotional emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={notifications.marketing}
                      onChange={() => handleNotificationChange('marketing')}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Appearance Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border ${
                        theme === 'dark'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="h-20 bg-gray-800 rounded-lg mb-2"></div>
                      <p className="text-center text-white">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border ${
                        theme === 'light'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                      <p className="text-center text-white">Light</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Currency Settings */}
          {activeTab === 'currency' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Currency Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Select Currency</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`p-4 rounded-lg border ${
                        currency === 'USD'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">US Dollar</p>
                          <p className="text-sm text-gray-400">USD</p>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-400">$100.00</p>
                          <p className="text-sm text-gray-400">≈ {formatEquivalentAmount(100, 'NGN')}</p>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setCurrency('NGN')}
                      className={`p-4 rounded-lg border ${
                        currency === 'NGN'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/20 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Nigerian Naira</p>
                          <p className="text-sm text-gray-400">NGN</p>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-400">{formatEquivalentAmount(100, 'NGN')}</p>
                          <p className="text-sm text-gray-400">≈ $100.00</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Currency Preview</h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">Sample amounts and their equivalents:</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-black/40 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Small amount</p>
                        <div className="flex justify-between items-center">
                          <p className="text-purple-400">{formatCurrency(10)}</p>
                          <p className="text-gray-400 text-sm">≈ {formatCurrency(10)}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Medium amount</p>
                        <div className="flex justify-between items-center">
                          <p className="text-purple-400">{formatCurrency(100)}</p>
                          <p className="text-gray-400 text-sm">≈ {formatCurrency(100)}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Large amount</p>
                        <div className="flex justify-between items-center">
                          <p className="text-purple-400">{formatCurrency(1000)}</p>
                          <p className="text-gray-400 text-sm">≈ {formatCurrency(1000)}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Pro Plan</p>
                        <div className="flex justify-between items-center">
                          <p className="text-purple-400">{formatCurrency(29)}</p>
                          <p className="text-gray-400 text-sm">≈ {formatCurrency(29)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Billing Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Current Plan</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 font-medium">Pro Plan</p>
                      <p className="text-sm text-gray-400">{formatCurrency(29)}/month</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                      Change Plan
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Available Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-purple-500/20 bg-black/40">
                      <h4 className="text-white font-medium mb-2">Free Plan</h4>
                      <p className="text-2xl font-bold text-purple-400 mb-2">{formatCurrency(0)}<span className="text-sm text-gray-400">/month</span></p>
                      <ul className="text-sm text-gray-400 space-y-2 mb-4">
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Up to 4 events per month
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Basic event features
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Community support
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-400 mr-2">×</span>
                          <span className="text-gray-500">Advanced features</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-400 mr-2">×</span>
                          <span className="text-gray-500">Priority support</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-400 mr-2">×</span>
                          <span className="text-gray-500">Analytics dashboard</span>
                        </li>
                      </ul>
                      <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                        Current Plan
                      </button>
                    </div>
                    <div className="p-4 rounded-lg border border-purple-500/20 bg-black/40">
                      <h4 className="text-white font-medium mb-2">Pro Plan</h4>
                      <p className="text-2xl font-bold text-purple-400 mb-2">{formatCurrency(29)}<span className="text-sm text-gray-400">/month</span></p>
                      <ul className="text-sm text-gray-400 space-y-2 mb-4">
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Unlimited events
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Basic event features
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Community support
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Advanced features
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Priority support
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          Analytics dashboard
                        </li>
                      </ul>
                      <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Billing Cycle</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-2 rounded-lg border ${
                        billingCycle === 'monthly'
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-purple-500/20 text-gray-400 hover:bg-purple-500/10'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-2 rounded-lg border ${
                        billingCycle === 'yearly'
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-purple-500/20 text-gray-400 hover:bg-purple-500/10'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Profile Visibility</h3>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="connections">Connections Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <div>
                    <h3 className="text-white font-medium">Activity Status</h3>
                    <p className="text-sm text-gray-400">Show when you&apos;re active</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={privacySettings.activityStatus}
                      onChange={() => handlePrivacyChange('activityStatus', !privacySettings.activityStatus)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Help & Support */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Help & Support</h2>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Contact Support</h3>
                  <p className="text-gray-400 mb-4">Need help? Our support team is here for you.</p>
                  <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                    Contact Support
                  </button>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
                  <h3 className="text-white font-medium mb-4">Documentation</h3>
                  <p className="text-gray-400 mb-4">Check out our documentation for detailed guides and tutorials.</p>
                  <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}