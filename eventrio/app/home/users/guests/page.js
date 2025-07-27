'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, UserPlus, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react'

export default function GuestsPage() {
  const router = useRouter()
  const [guests, setGuests] = useState([])
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleEdit = (guest) => {
    setSelectedGuest(guest)
    setIsModalOpen(true)
  }

  const handleDelete = (guest) => {
    setSelectedGuest(guest)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setGuests(guests.filter(guest => guest.id !== selectedGuest.id))
    setIsDeleteModalOpen(false)
    setSelectedGuest(null)
  }

  const handleAddGuest = () => {
    setSelectedGuest(null)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-black text-white">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Go Back</span>
      </button>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Guest Management</h1>
          <p className="text-gray-400 mt-2">Manage your event guests and registrations</p>
        </div>
        <button 
          onClick={handleAddGuest}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Guest</span>
        </button>
      </div>

      {/* Guests Grid */}
      {guests.length === 0 ? (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-8 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Guests Joined</h3>
          <p className="text-gray-400 mb-6">Start adding guests to your events to manage their registrations</p>
          <button 
            onClick={handleAddGuest}
            className="inline-flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Your First Guest</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <div 
              key={guest.id}
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4 sm:p-6 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">{guest.name}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(guest)}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(guest)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{guest.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{guest.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Registered: {new Date(guest.registeredAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  guest.status === 'confirmed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Guest Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 border border-purple-500/20 rounded-xl p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {selectedGuest ? 'Edit Guest' : 'Add Guest'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  defaultValue={selectedGuest?.name}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  defaultValue={selectedGuest?.email}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  defaultValue={selectedGuest?.phone}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20"
                >
                  {selectedGuest ? 'Save Changes' : 'Add Guest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 border border-purple-500/20 rounded-xl p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Delete Guest</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to remove &quot;{selectedGuest?.name}&quot; from your guest list? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/20"
              >
                Delete Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 