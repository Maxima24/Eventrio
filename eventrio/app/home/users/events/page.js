'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit, Trash2, Calendar, Users, MapPin } from 'lucide-react'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/app/services/event/api'

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    status: 'upcoming'
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedEvents = await getEvents()
      console.log('Fetched events:', fetchedEvents) // Debug log
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents)
      } else {
        setError('Invalid response format from server')
        setEvents([])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to load events. Please try again later.')
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event) => {
    console.log('Editing event:', event) // Debug log
    setSelectedEvent(event)
    setFormData({
      eventName: event.eventName,
      date: event.date,
      location: event.location,
      status: event.status || 'upcoming'
    })
    setIsModalOpen(true)
  }

  const handleDelete = (event) => {
    console.log('Deleting event:', event) // Debug log
    setSelectedEvent(event)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      if (!selectedEvent?._id) {
        throw new Error('No event selected for deletion')
      }
      console.log('Deleting event with ID:', selectedEvent._id) // Debug log
      await deleteEvent(selectedEvent._id)
      setEvents(events.filter(event => event._id !== selectedEvent._id))
      setIsDeleteModalOpen(false)
      setSelectedEvent(null)
    } catch (error) {
      console.error('Error deleting event:', error)
      setError('Failed to delete event. Please try again.')
    }
  }

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setFormData({
      eventName: '',
      date: '',
      location: '',
      status: 'upcoming'
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedEvent) {
        // Update existing event
        if (!selectedEvent._id) {
          throw new Error('No event ID found for update')
        }
        console.log('Updating event with ID:', selectedEvent._id) // Debug log
        console.log('Update data:', formData) // Debug log
        const updatedEvent = await updateEvent(selectedEvent._id, formData)
        setEvents(events.map(event => 
          event._id === selectedEvent._id ? updatedEvent : event
        ))
      } else {
        // Create new event
        console.log('Creating new event with data:', formData) // Debug log
        const newEvent = await createEvent(formData)
        setEvents([...events, newEvent])
      }
      setIsModalOpen(false)
      setSelectedEvent(null)
      setFormData({
        eventName: '',
        date: '',
        location: '',
        status: 'upcoming'
      })
    } catch (error) {
      console.error('Error saving event:', error)
      setError('Failed to save event. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getCompletedEventsCount = () => {
    return events.filter(event => event.status === 'completed').length
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

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">My Events</h1>
          <p className="text-gray-400 mt-2">Manage your events and registrations</p>
          <p className="text-3xl font-bold text-purple-400 mt-4">
            {getCompletedEventsCount()} Completed Events
          </p>
        </div>
        <button 
          onClick={handleCreateEvent}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-white px-4 py-2 rounded-lg transition-colors border border-purple-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-pulse text-gray-400">Loading events...</div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-8">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchEvents}
              className="mt-4 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-lg transition-colors border border-purple-500/20"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No events found. Create your first event!</p>
          </div>
        ) : (
          events.map((event) => (
            <div 
              key={event._id}
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4 sm:p-6 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">{event.eventName}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(event)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees || 0} attendees</span>
                </div>
              </div>

              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'upcoming' 
                    ? 'bg-blue-500/20 text-white-400' 
                    : 'bg-amber-700 text-white-400'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 border border-purple-500/20 rounded-xl p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {selectedEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Event Title</label>
                <input 
                  type="text" 
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
                  {selectedEvent ? 'Save Changes' : 'Create Event'}
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
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Delete Event</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete &quot;{selectedEvent?.eventName}&quot;? This action cannot be undone.
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
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
