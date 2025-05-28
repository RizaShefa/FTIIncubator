"use client";
import React, { use } from 'react';
import { ArrowLeft, Building2, Calendar, MapPin, Users, Award, DollarSign, Clock, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { useSuccessStories } from '../../componets/succesStories';
import { useRouter } from 'next/navigation';

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ params }) => {
  const { stories, isLoading, error } = useSuccessStories();
  const router = useRouter();

  const resolvedParams = use(params);
  
  // Debug logs to see what's happening
  console.log('Resolved params:', resolvedParams);
  console.log('Looking for ID:', resolvedParams.id);
  console.log('Available stories:', stories.map(s => ({ id: s.id, name: s.name })));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Duke ngarkuar projektin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-red-600">Gabim në ngarkim: {error}</p>
          <button
            onClick={() => router.push('/projects')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kthehu te Projektet
          </button>
        </div>
      </div>
    );
  }

  // THE KEY FIX: Convert both to strings for comparison
  const project = stories.find(story => String(story.id) === String(resolvedParams.id));
  
  console.log('Found project:', project ? project.name : 'NOT FOUND');

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Projekti nuk u gjet</h2>
          <p className="text-slate-600 mb-6">
            Projekti që kërkuat (ID: {resolvedParams.id}) nuk ekziston ose është hequr.
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Debug: Available IDs are {stories.map(s => s.id).join(', ')}
          </p>
          <button
            onClick={() => router.push('/projects')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kthehu te Projektet
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push('/projects');
  };

  // Get related projects (same type, different project)
  const relatedProjects = stories
    .filter(story => story.type === project.type && String(story.id) !== String(project.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 py-12">
        <div className="container mx-auto px-6">
          <button
            onClick={handleBack}
            className="flex items-center text-white hover:text-blue-200 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kthehu te Projektet
          </button>

          <div className="flex flex-col md:flex-row md:items-start">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6 mb-4 md:mb-0">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div className="text-white flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-lg opacity-90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {project.country}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Themeluar {project.foundedYear}
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {project.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Rreth Projektit</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Partnerët Kryesorë</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.partners && project.partners.length > 0 ? (
                  project.partners.map((partner: string, index: number) => (
                    <div key={index} className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{partner}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 col-span-2">Nuk ka partnerë të regjistruar</p>
                )}
              </div>
            </div>

            {/* Program Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Karakteristikat e Programit</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Kohëzgjatja</h3>
                  <p className="text-slate-600">{project.programDuration || 'N/A'}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <Globe className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Mbulimi</h3>
                  <p className="text-slate-600">Ndërkombëtar</p>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Projekte të Ngjashme</h2>
                <div className="grid gap-4">
                  {relatedProjects.map((relatedProject) => (
                    <div
                      key={relatedProject.id}
                      onClick={() => router.push(`/projects/${relatedProject.id}`)}
                      className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {relatedProject.name}
                        </h4>
                        <p className="text-sm text-slate-600">{relatedProject.country}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Key Stats */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Statistikat Kryesore</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{project.mentors || 0}</div>
                    <div className="text-sm text-slate-600">Mentorë Aktivë</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{project.supportingOrgs || 0}</div>
                    <div className="text-sm text-slate-600">Organizata Mbështetëse</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{project.sponsors || 0}</div>
                    <div className="text-sm text-slate-600">Sponsorë</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{project.funding || 'N/A'}</div>
                    <div className="text-sm text-slate-600">Financimi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Veprime të Shpejta</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open(`mailto:info@${project.name.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Dërgo Email
                </button>
                <button
                  onClick={() => navigator.share && navigator.share({
                    title: project.name,
                    text: project.description,
                    url: window.location.href
                  })}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Shpërndaj Projektin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;