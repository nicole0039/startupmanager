const Application = require('../models/Application');

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userId', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching application'
    });
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res) => {
  try {
    const { companyName, founderName, email, description, stage } = req.body;

    const application = await Application.create({
      companyName,
      founderName,
      email,
      description,
      stage,
      userId: req.user.id,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0]
    });

    const populatedApplication = await Application.findById(application._id)
      .populate('userId', 'name email');

    res.status(201).json({
      success: true,
      data: populatedApplication,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating application:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating application'
    });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
const updateApplication = async (req, res) => {
  try {
    const { companyName, founderName, email, description, stage } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user owns the application or is coordinator
    if (application.userId.toString() !== req.user.id && req.user.role !== 'coordinator') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    // Check if application can be edited (only pending applications)
    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit application that has already been reviewed'
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      {
        companyName: companyName || application.companyName,
        founderName: founderName || application.founderName,
        email: email || application.email,
        description: description || application.description,
        stage: stage || application.stage
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: updatedApplication,
      message: 'Application updated successfully'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating application'
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user owns the application or is coordinator
    if (application.userId.toString() !== req.user.id && req.user.role !== 'coordinator') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this application'
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting application'
    });
  }
};

// @desc    Review application (approve/reject)
// @route   PUT /api/applications/:id/review
// @access  Private (Coordinator only)
const reviewApplication = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either approved or rejected'
      });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Application has already been reviewed'
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: updatedApplication,
      message: `Application ${status} successfully`
    });
  } catch (error) {
    console.error('Error reviewing application:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while reviewing application'
    });
  }
};

// @desc    Get applications by user
// @route   GET /api/applications/user/:userId
// @access  Private
const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user applications'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/applications/dashboard/stats
// @access  Private (Coordinator only)
const getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const approvedApplications = await Application.countDocuments({ status: 'approved' });
    const rejectedApplications = await Application.countDocuments({ status: 'rejected' });

    const stats = {
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
};

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  reviewApplication,
  getApplicationsByUser,
  getDashboardStats
};