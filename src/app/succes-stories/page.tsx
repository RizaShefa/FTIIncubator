'use client'

import React from 'react'
import SuccessStories from '../componets/ProjectsOverview' // adjust path if needed
import { useSuccessStories } from '../../../store/succesStories'

const HomePage: React.FC = () => {
  const { stories, isLoading, error } = useSuccessStories()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Optionally show error */}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      {/* Success Stories Section */}
      <SuccessStories stories={stories} isLoading={isLoading} />
    </main>
  )
}

export default HomePage
