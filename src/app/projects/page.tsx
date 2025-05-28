"use client"
import React, { useState } from 'react';
import { Search, Filter, Building2, Calendar, MapPin, Users, Award, DollarSign, ArrowRight } from 'lucide-react';
import { useSuccessStories } from '../componets/succesStories';
import { SuccessStory } from '../../../store/succesStories';
import { useRouter } from 'next/navigation';

const ProjectsPage: React.FC = () => {
  const { stories, isLoading, error } = useSuccessStories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Duke ngarkuar projektet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Gabim në ngarkim: {error}</p>
        </div>
      </div>
    );
  }

  // Filter logic
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || story.type === selectedType;
    const matchesCountry = selectedCountry === '' || story.country === selectedCountry;
    
    return matchesSearch && matchesType && matchesCountry;
  });

  // Get unique values for filters
  const uniqueTypes = [...new Set(stories.map(story => story.type))];
  const uniqueCountries = [...new Set(stories.map(story => story.country))];

  const handleProjectClick = (story: SuccessStory) => {
    router.push(`/projects/${story.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Projektet e Suksesshme
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Eksploroni inkubatorët më të suksesshëm që kanë transformuar ekonominë dixhitale në Evropë
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Kërko projekte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Të gjitha tipet</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Të gjitha vendet</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedCountry('');
              }}
              className="bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Pastro Filtrat
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Gjetur {filteredStories.length} projekte nga {stories.length} totale
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => handleProjectClick(story)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {story.name}
                      </h3>
                      <div className="flex items-center text-slate-600 mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="mr-4">{story.country}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{story.foundedYear}</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {story.type}
                  </span>
                </div>

                <p className="text-slate-600 mb-6 line-clamp-3">
                  {story.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-slate-800">{story.mentors}</div>
                    <div className="text-xs text-slate-600">Mentorë</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-slate-800">{story.supportingOrgs}</div>
                    <div className="text-xs text-slate-600">Organizata</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-slate-800">{story.sponsors}</div>
                    <div className="text-xs text-slate-600">Sponsorë</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-slate-800">{story.funding}</div>
                    <div className="text-xs text-slate-600">Financim</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Kohëzgjatja: {story.programDuration}
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Nuk u gjetën projekte</h3>
            <p className="text-slate-600">Provo të ndryshosh kriteret e kërkimit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;