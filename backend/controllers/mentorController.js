const Mentor = require('../models/Mentor');
const Application = require('../models/Application');

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Private
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .populate('assignedStartups', 'companyName founderName status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentors'
    });
  }
};

// @desc    Get single mentor
// @route   GET /api/mentors/:id
// @access  Private
const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id)
      .populate('assignedStartups', 'companyName founderName status');

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentor'
    });
  }
};

// @desc    Create new mentor
// @route   POST /api/mentors
// @access  Private (Coordinator only)
const createMentor = async (req, res) => {
  try {
    const { name, email, expertise, experience, bio, availability } = req.body;

    // Check if mentor already exists
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({
        success: false,
        message: 'Mentor with this email already exists'
      });
    }

    const mentor = await Mentor.create({
      name,
      email,
      expertise,
      experience,
      bio,
      availability: availability || 'available',
      assignedStartups: []
    });

    res.status(201).json({
      success: true,
      data: mentor,
      message: 'Mentor created successfully'
    });
  } catch (error) {
    console.error('Error creating mentor:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating mentor'
    });
  }
};

// @desc    Update mentor
// @route   PUT /api/mentors/:id
// @access  Private (Coordinator only)
const updateMentor = async (req, res) => {
  try {
    const { name, email, expertise, experience, bio, availability } = req.body;

    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== mentor.email) {
      const existingMentor = await Mentor.findOne({ email });
      if (existingMentor) {
        return res.status(400).json({
          success: false,
          message: 'Mentor with this email already exists'
        });
      }
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      {
        name: name || mentor.name,
        email: email || mentor.email,
        expertise: expertise || mentor.expertise,
        experience: experience || mentor.experience,
        bio: bio || mentor.bio,
        availability: availability || mentor.availability
      },
      { new: true, runValidators: true }
    ).populate('assignedStartups', 'companyName founderName status');

    res.status(200).json({
      success: true,
      data: updatedMentor,
      message: 'Mentor updated successfully'
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating mentor'
    });
  }
};

// @desc    Delete mentor
// @route   DELETE /api/mentors/:id
// @access  Private (Coordinator only)
const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    await Mentor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Mentor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting mentor'
    });
  }
};

// @desc    Assign mentor to startup
// @route   PUT /api/mentors/:id/assign/:applicationId
// @access  Private (Coordinator only)
const assignMentor = async (req, res) => {
  try {
    const { id: mentorId, applicationId } = req.params;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Can only assign mentors to approved applications'
      });
    }

    // Check if mentor is available
    if (mentor.availability !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Mentor is not available for assignment'
      });
    }

    // Add application to mentor's assigned startups if not already assigned
    if (!mentor.assignedStartups.includes(applicationId)) {
      mentor.assignedStartups.push(applicationId);
      await mentor.save();
    }

    const updatedMentor = await Mentor.findById(mentorId)
      .populate('assignedStartups', 'companyName founderName status');

    res.status(200).json({
      success: true,
      data: updatedMentor,
      message: 'Mentor assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning mentor'
    });
  }
};

module.exports = {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor,
  assignMentor
};
