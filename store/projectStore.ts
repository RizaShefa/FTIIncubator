import { create } from 'zustand'
import data from '../db.json'

// Define types for your data
interface Project {
  title: string
  description: string
  shortTermImpact: string[]
  longTermImpact: string[]
}


interface SuccessStory {
  id: number
  name: string
  description: string
  country: string
  type: string
}

interface FundingOpportunity {
  id: number
  name: string
  description: string
}

// Define the store's state and actions
interface StoreState {
  project: Project
  successStories: SuccessStory[]
  fundingOpportunities: FundingOpportunity[]

  activeTab: string
  selectedStory: SuccessStory | null
  selectedFunding: FundingOpportunity | null
  searchTerm: string
  filterCountry: string
  filterType: string
  isLoading: boolean

  setActiveTab: (tab: string) => void
  setSelectedStory: (story: SuccessStory | null) => void
  setSelectedFunding: (funding: FundingOpportunity | null) => void
  setSearchTerm: (term: string) => void
  setFilterCountry: (country: string) => void
  setFilterType: (type: string) => void
  setLoading: (loading: boolean) => void

  getFilteredSuccessStories: () => SuccessStory[]
  getFilteredFundingOpportunities: () => FundingOpportunity[]
  getUniqueCountries: () => string[]
  getUniqueTypes: () => string[]

  resetFilters: () => void
}

const useStore = create<StoreState>((set, get) => ({
  project: data.project,
  successStories: data.successStories,
  fundingOpportunities: data.fundingOpportunities,

  activeTab: 'home',
  selectedStory: null,
  selectedFunding: null,
  searchTerm: '',
  filterCountry: 'all',
  filterType: 'all',
  isLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedStory: (story) => set({ selectedStory: story }),

  setSelectedFunding: (funding) => set({ selectedFunding: funding }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilterCountry: (country) => set({ filterCountry: country }),

  setFilterType: (type) => set({ filterType: type }),

  setLoading: (loading) => set({ isLoading: loading }),

  getFilteredSuccessStories: () => {
    const { successStories, searchTerm, filterCountry, filterType } = get()
    return successStories.filter((story) => {
      const matchesSearch =
        story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCountry = filterCountry === 'all' || story.country === filterCountry
      const matchesType = filterType === 'all' || story.type === filterType

      return matchesSearch && matchesCountry && matchesType
    })
  },

  getFilteredFundingOpportunities: () => {
    const { fundingOpportunities, searchTerm } = get()
    return fundingOpportunities.filter((funding) => {
      return (
        funding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funding.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  },

  getUniqueCountries: () => {
    const { successStories } = get()
    return [...new Set(successStories.map((story) => story.country))]
  },

  getUniqueTypes: () => {
    const { successStories } = get()
    return [...new Set(successStories.map((story) => story.type))]
  },

  resetFilters: () => {
    set({
      searchTerm: '',
      filterCountry: 'all',
      filterType: 'all',
    })
  },
}))

export default useStore
