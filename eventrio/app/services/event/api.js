const API_URL = "https://eventhive-2.onrender.com/cdapi/v1"

export const getEvents = async () => {
    try {
        console.log('Fetching events from:', `${API_URL}/events`)
        const response = await fetch(`${API_URL}/events`)
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        
        const data = await response.json()
        console.log('Received data:', data)
        // The server sends data in format: { status: 'success', event: [...] }
        return data.event || []
    } catch (error) {
        console.error('Error fetching events:', error)
        if (error.message.includes('Failed to fetch')) {
            console.error('Server might be down or not accessible')
        }
        return []
    }
}

export const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`)
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const data = await response.json()
        return data.data?.event || null
    } catch (error) {
        console.error('Error fetching event:', error)
        return null
    }
}

export const createEvent = async (event) => {
    try {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const data = await response.json()
        return data.data?.event
    } catch (error) {
        console.error('Error creating event:', error)
        throw error
    }
}

export const updateEvent = async (id, event) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const data = await response.json()
        return data.data?.event
    } catch (error) {
        console.error('Error updating event:', error)
        throw error
    }
}

export const deleteEvent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        return true
    } catch (error) {
        console.error('Error deleting event:', error)
        throw error
    }
}
