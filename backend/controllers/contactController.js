import Contact from '../models/ContactModel.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    res.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: contact._id
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (admin only - add auth later)
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = status ? { status } : {};
    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

// @desc    Get admin contacts (all for admin management)
// @route   GET /api/contact/admin/all
// @access  Private (admin only)
export const getAdminContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ submittedAt: -1 });

    const stats = {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      read: contacts.filter(c => c.status === 'read').length,
      replied: contacts.filter(c => c.status === 'replied').length
    };

    res.json({
      success: true,
      count: contacts.length,
      contacts,
      stats
    });
  } catch (error) {
    console.error('Get admin contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin contacts'
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id/status
// @access  Private (admin only - add auth later)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
};
