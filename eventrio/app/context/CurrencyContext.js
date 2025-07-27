'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  const [exchangeRate, setExchangeRate] = useState(1)

  // Fetch exchange rate when currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'USD') {
        setExchangeRate(1)
        return
      }
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        const data = await response.json()
        setExchangeRate(data.rates[currency])
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
        setExchangeRate(1)
      }
    }

    fetchExchangeRate()
  }, [currency])

  const formatCurrency = (amount) => {
    const convertedAmount = amount * exchangeRate
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(convertedAmount)
  }

  const getEquivalentAmount = (amount, targetCurrency) => {
    if (targetCurrency === 'USD') {
      return amount / exchangeRate
    } else {
      return amount * exchangeRate
    }
  }

  const formatEquivalentAmount = (amount, targetCurrency) => {
    const equivalentAmount = getEquivalentAmount(amount, targetCurrency)
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(equivalentAmount)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, formatEquivalentAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 