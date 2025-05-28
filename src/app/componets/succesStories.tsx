"use client"
import { useEffect, useState } from "react"
import { SuccessStory } from "../../../store/succesStories"

export const useSuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:3001/successStories') 
        if (!response.ok) throw new Error('Failed to fetch success stories')

        const data = await response.json()
        setStories(data || [])
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  return { stories, isLoading, error }
}

