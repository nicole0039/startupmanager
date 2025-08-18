import React, { useState } from 'react';
import { User, Building2, Users, FileText, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, UserPlus, Search, Filter, Menu, X } from 'lucide-react';

const CatalystApp = () => {
  // Mock user data and authentication state
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@catalyst.edu',
    role: 'coordinator' // coordinator, startup
  });

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Application Management State
  const [applications, setApplications] = useState([
    {
      id: 1,
      companyName: 'TechStartup Inc',
      founderName: 'Alice Johnson',
      email: 'alice@techstartup.com',
      description: 'AI-powered customer service platform',
      stage: 'seed',
      status: 'pending',
      submissionDate: '2025-08-15',
      userId: 2
    },
    {
      id: 2,
      companyName: 'EcoSolutions',
      founderName: 'Bob Smith',
      email: 'bob@ecosolutions.com',
      description: 'Sustainable packaging solutions',
      stage: 'prototype',
      status: 'approved',
      submissionDate: '2025-08-10',
      userId: 3
    }
  ]);

  // Mentor Management State
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      email: 'sarah@catalyst.edu',
      expertise: 'Technology & AI',
      experience: '15 years',
      bio: 'Former CTO at multiple tech companies',
      availability: 'available',
      assignedStartups: []
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@catalyst.edu',
      expertise: 'Business Strategy',
      experience: '12 years',
      bio: 'Serial entrepreneur and business consultant',
      availability: 'busy',
      assignedStartups: [1]
    }
  ]);

  // UI State Management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [applicationForm, setApplicationForm] = useState({
    companyName: '',
    founderName: '',
    email: '',
    description: '',
    stage: 'idea'
  });

  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    bio: '',
    availability: 'available'
  });

  // Epic 2: Application Management Functions
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      ...applicationForm,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      userId: user.id
    };
    setApplications([...applications, newApplication]);
    setApplicationForm({
      companyName: '',
      founderName: '',
      email: '',
      description: '',
      stage: 'idea'
    });
    setShowModal(false);
  };

  const handleUpdateApplication = (e) => {
    e.preventDefault();
    setApplications(applications.map(app => 
      app.id === selectedItem.id ? { ...app, ...applicationForm } : app
    ));
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleReviewApplication = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  // Epic 3: Mentor Management Functions
  const handleAddMentor = (e) => {
    e.preventDefault();
    const newMentor = {
      id: Date.now(),
      ...mentorForm,
      assignedStartups: []
    };
    setMentors([...mentors, newMentor]);
    setMentorForm({
      name: '',
      email: '',
      expertise: '',
      experience: '',
      bio: '',
      availability: 'available'
    });
    setShowModal(false);
  };

  const handleUpdateMentor = (e) => {
    e.preventDefault();
    setMentors(mentors.map(mentor => 
      mentor.id === selectedItem.id ? { ...mentor, ...mentorForm } : mentor
    ));
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDeleteMentor = (id) => {
    setMentors(mentors.filter(mentor => mentor.id !== id));
  };

  const handleAssignMentor = (mentorId, applicationId) => {
    setMentors(mentors.map(mentor => 
      mentor.id === mentorId 
        ? { ...mentor, assignedStartups: [...mentor.assignedStartups, applicationId] }
        : mentor
    ));
  };

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
    
    if (type === 'edit-application' && item) {
      setApplicationForm({
        companyName: item.companyName,
        founderName: item.founderName,
        email: item.email,
        description: item.description,
        stage: item.stage
      });
    } else if (type === 'edit-mentor' && item) {
      setMentorForm({
        name: item.name,
        email: item.email,
        expertise: item.expertise,
        experience: item.experience,
        bio: item.bio,
        availability: item.availability
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setApplicationForm({
      companyName: '',
      founderName: '',
      email: '',
      description: '',
      stage: 'idea'
    });
    setMentorForm({
      name: '',
      email: '',
      expertise: '',
      experience: '',
      bio: '',
      availability: 'available'
    });
  };

  // Filter and search functions
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.founderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dashboard Statistics
  const dashboardStats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedApplications: applications.filter(app => app.status === 'approved').length,
    totalMentors: mentors.length,
    availableMentors: mentors.filter(mentor => mentor.availability === 'available').length
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setSearchTerm('');
    setFilterStatus('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">Catalyst</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {/* Desktop user info */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-700 truncate max-w-32 lg:max-w-none">
                Welcome, {user.name}
              </span>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-3">
              <div className="px-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['dashboard', 'applications', 'mentors'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`py-2 px-3 text-sm font-medium rounded-lg capitalize ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Tab Navigation */}
      <div className="bg-white border-b hidden md:block sticky top-14 sm:top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['dashboard', 'applications', 'mentors'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-4 lg:px-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Dashboard Overview</h1>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.totalApplications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.pendingApplications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.approvedApplications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Mentors</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.totalMentors}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow col-span-2 lg:col-span-1">
                <div className="flex items-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Available Mentors</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.availableMentors}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Applications</h2>
              </div>
              <div className="p-4 sm:p-6">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b last:border-b-0 space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{app.companyName}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{app.founderName}</p>
                    </div>
                    <div className="flex justify-between sm:block sm:text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{app.submissionDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Startup Applications</h1>
              {(user.role === 'startup' || user.role === 'coordinator') && (
                <button
                  onClick={() => openModal('add-application')}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm sm:text-base"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Application
                </button>
              )}
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Applications List */}
            <div className="sm:hidden space-y-4">
              {filteredApplications.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{app.companyName}</h3>
                      <p className="text-sm text-gray-600">{app.founderName}</p>
                      <p className="text-sm text-gray-600">{app.email}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{app.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span className="capitalize">{app.stage} stage</span>
                    <span>{app.submissionDate}</span>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => openModal('view-application', app)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {(user.role === 'startup' && app.userId === user.id) && (
                      <>
                        <button
                          onClick={() => openModal('edit-application', app)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {user.role === 'coordinator' && app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReviewApplication(app.id, 'approved')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReviewApplication(app.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Applications Table */}
            <div className="hidden sm:block bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Founder</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{app.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.founderName}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="capitalize text-sm text-gray-900">{app.stage}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.submissionDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal('view-application', app)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {(user.role === 'startup' && app.userId === user.id) && (
                              <>
                                <button
                                  onClick={() => openModal('edit-application', app)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {user.role === 'coordinator' && app.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleReviewApplication(app.id, 'approved')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleReviewApplication(app.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mentor Management</h1>
              {user.role === 'coordinator' && (
                <button
                  onClick={() => openModal('add-mentor')}
                  className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center text-sm sm:text-base"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Mentor
                </button>
              )}
            </div>

            {/* Search */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
              <div className="relative">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors by name or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate max-w-32">{mentor.email}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        mentor.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {mentor.availability}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Expertise:</span>
                        <p className="text-xs sm:text-sm text-gray-600">{mentor.expertise}</p>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Experience:</span>
                        <p className="text-xs sm:text-sm text-gray-600">{mentor.experience}</p>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Bio:</span>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Assigned Startups:</span>
                        <p className="text-xs sm:text-sm text-gray-600">{mentor.assignedStartups.length}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal('view-mentor', mentor)}
                          className="p-1 sm:p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {user.role === 'coordinator' && (
                          <>
                            <button
                              onClick={() => openModal('edit-mentor', mentor)}
                              className="p-1 sm:p-2 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMentor(mentor.id)}
                              className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                      {user.role === 'coordinator' && mentor.availability === 'available' && (
                        <button
                          onClick={() => openModal('assign-mentor', mentor)}
                          className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-purple-700"
                        >
                          Assign
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {modalType === 'add-application' && 'Submit New Application'}
                  {modalType === 'edit-application' && 'Edit Application'}
                  {modalType === 'view-application' && 'Application Details'}
                  {modalType === 'add-mentor' && 'Add New Mentor'}
                  {modalType === 'edit-mentor' && 'Edit Mentor'}
                  {modalType === 'view-mentor' && 'Mentor Details'}
                  {modalType === 'assign-mentor' && 'Assign Mentor'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Application Forms */}
              {(modalType === 'add-application' || modalType === 'edit-application') && (
                <form onSubmit={modalType === 'add-application' ? handleSubmitApplication : handleUpdateApplication}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={applicationForm.companyName}
                        onChange={(e) => setApplicationForm({...applicationForm, companyName: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Founder Name</label>
                      <input
                        type="text"
                        value={applicationForm.founderName}
                        onChange={(e) => setApplicationForm({...applicationForm, founderName: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                      <select
                        value={applicationForm.stage}
                        onChange={(e) => setApplicationForm({...applicationForm, stage: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="idea">Idea</option>
                        <option value="prototype">Prototype</option>
                        <option value="seed">Seed</option>
                        <option value="growth">Growth</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={applicationForm.description}
                      onChange={(e) => setApplicationForm({...applicationForm, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your startup idea, product, or service..."
                      required
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {modalType === 'add-application' ? 'Submit Application' : 'Update Application'}
                    </button>
                  </div>
                </form>
              )}

              {/* View Application */}
              {modalType === 'view-application' && selectedItem && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <p className="text-gray-900">{selectedItem.companyName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Founder</label>
                      <p className="text-gray-900">{selectedItem.founderName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900 break-all">{selectedItem.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stage</label>
                      <p className="text-gray-900 capitalize">{selectedItem.stage}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900 mt-1">{selectedItem.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                        selectedItem.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                      <p className="text-gray-900">{selectedItem.submissionDate}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Mentor Forms */}
              {(modalType === 'add-mentor' || modalType === 'edit-mentor') && (
                <form onSubmit={modalType === 'add-mentor' ? handleAddMentor : handleUpdateMentor}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={mentorForm.name}
                        onChange={(e) => setMentorForm({...mentorForm, name: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={mentorForm.email}
                        onChange={(e) => setMentorForm({...mentorForm, email: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                      <input
                        type="text"
                        value={mentorForm.expertise}
                        onChange={(e) => setMentorForm({...mentorForm, expertise: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Technology & AI, Business Strategy"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                      <input
                        type="text"
                        value={mentorForm.experience}
                        onChange={(e) => setMentorForm({...mentorForm, experience: e.target.value})}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 15 years"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={mentorForm.bio}
                      onChange={(e) => setMentorForm({...mentorForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief background and achievements..."
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      value={mentorForm.availability}
                      onChange={(e) => setMentorForm({...mentorForm, availability: e.target.value})}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {modalType === 'add-mentor' ? 'Add Mentor' : 'Update Mentor'}
                    </button>
                  </div>
                </form>
              )}

              {/* View Mentor */}
              {modalType === 'view-mentor' && selectedItem && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{selectedItem.name}</h3>
                      <p className="text-gray-600 break-all">{selectedItem.email}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedItem.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedItem.availability}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expertise</label>
                      <p className="text-gray-900">{selectedItem.expertise}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience</label>
                      <p className="text-gray-900">{selectedItem.experience}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <p className="text-gray-900 mt-1">{selectedItem.bio}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned Startups</label>
                    <p className="text-gray-900">{selectedItem.assignedStartups.length} startup(s) assigned</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Assign Mentor */}
              {modalType === 'assign-mentor' && selectedItem && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                      Assign {selectedItem.name} to Startup
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      Select a startup to assign this mentor to:
                    </p>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {applications
                      .filter(app => app.status === 'approved')
                      .map((app) => (
                        <div
                          key={app.id}
                          className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            handleAssignMentor(selectedItem.id, app.id);
                            closeModal();
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{app.companyName}</h4>
                              <p className="text-sm text-gray-600">{app.founderName}</p>
                              <p className="text-xs text-gray-500 capitalize">{app.stage} stage</p>
                            </div>
                            <div className="text-right">
                              <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700">
                                Assign
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {applications.filter(app => app.status === 'approved').length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No approved startups available for assignment
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalystApp;