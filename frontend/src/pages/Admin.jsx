import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  // Helper function to get the correct base URL for images
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Remove /api from VITE_API_URL to get the base server URL
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  // Gallery upload state
  const [galleryData, setGalleryData] = useState({
    media: null,
    category: 'workshops',
    title: '',
    description: '',
    eventDate: ''
  });

  // Resource upload state
  const [resourceData, setResourceData] = useState({
    file: null,
    category: 'career',
    title: '',
    description: ''
  });

  // Events management state
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    description: '',
    type: 'workshop',
    icon: '🎓',
    location: 'Haramaya University',
    registrationRequired: false,
    maxParticipants: '',
    organizer: 'ESCDC Team',
    mediaFiles: [] // For storing selected files before upload
  });

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // Leadership management state
  const [leadershipData, setLeadershipData] = useState({
    name: '',
    position: '',
    category: 'higher-management',
    sector: '',
    bio: '',
    email: '',
    phone: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    },
    order: 0,
    image: null
  });

  const [leadership, setLeadership] = useState([]);
  const [editingLeadership, setEditingLeadership] = useState(null);

  // Members management state
  const [members, setMembers] = useState([]);
  const [memberStats, setMemberStats] = useState({});

  // Messages management state
  const [messages, setMessages] = useState([]);
  const [messageStats, setMessageStats] = useState({});

  // Admins management state
  const [admins, setAdmins] = useState([]);
  const [adminStats, setAdminStats] = useState({});
  const [showCreateAdminForm, setShowCreateAdminForm] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });

  // Gallery management state
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryStats, setGalleryStats] = useState({});

  // Resources management state
  const [resources, setResources] = useState([]);
  const [resourceStats, setResourceStats] = useState({});

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.admin);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      if (!galleryData.media) {
        setMessage('Please select a media file');
        return;
      }

      const formData = new FormData();
      formData.append('media', galleryData.media);
      formData.append('category', galleryData.category);
      formData.append('title', galleryData.title);
      formData.append('description', galleryData.description);
      if (galleryData.eventDate) {
        formData.append('eventDate', galleryData.eventDate);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/gallery/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Media uploaded successfully!');
        setGalleryData({
          media: null,
          category: 'workshops',
          title: '',
          description: '',
          eventDate: ''
        });
        document.getElementById('gallery-file').value = '';
        fetchGalleryImages(); // Refresh gallery list
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleResourceUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      if (!resourceData.file) {
        setMessage('Please select a file');
        return;
      }

      if (!resourceData.title) {
        setMessage('Please enter a title');
        return;
      }

      const formData = new FormData();
      formData.append('file', resourceData.file);
      formData.append('category', resourceData.category);
      formData.append('title', resourceData.title);
      formData.append('description', resourceData.description);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/resources/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Resource uploaded successfully!');
        setResourceData({
          file: null,
          category: 'career',
          title: '',
          description: ''
        });
        document.getElementById('resource-file').value = '';
        fetchResources(); // Refresh resources list
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Event management functions
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      if (!eventData.title || !eventData.description || !eventData.date || !eventData.type) {
        setMessage('Please fill in all required fields');
        setUploading(false);
        return;
      }

      // First, create or update the event
      const url = editingEvent 
        ? `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`
        : `${import.meta.env.VITE_API_URL}/events`;
      
      const method = editingEvent ? 'PUT' : 'POST';

      // Prepare event data without mediaFiles
      const { mediaFiles, ...eventPayload } = eventData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(eventPayload)
      });

      const data = await response.json();

      if (data.success) {
        const eventId = data.event._id;
        let mediaUploadSuccess = true;
        let uploadedCount = 0;

        // Upload media files if any are selected
        if (eventData.mediaFiles && eventData.mediaFiles.length > 0) {
          setMessage(`✅ Event saved! Uploading ${eventData.mediaFiles.length} media files...`);
          
          for (const file of eventData.mediaFiles) {
            try {
              await handleEventMediaUpload(eventId, file, false); // false = don't show individual messages
              uploadedCount++;
            } catch (error) {
              console.error('Failed to upload media:', error);
              mediaUploadSuccess = false;
            }
          }
        }

        // Show final success message
        if (eventData.mediaFiles && eventData.mediaFiles.length > 0) {
          if (mediaUploadSuccess && uploadedCount === eventData.mediaFiles.length) {
            setMessage(`✅ Event ${editingEvent ? 'updated' : 'created'} successfully with ${uploadedCount} media files!`);
          } else {
            setMessage(`✅ Event ${editingEvent ? 'updated' : 'created'} successfully! ${uploadedCount}/${eventData.mediaFiles.length} media files uploaded.`);
          }
        } else {
          setMessage(`✅ Event ${editingEvent ? 'updated' : 'created'} successfully!`);
        }

        // Reset form
        setEventData({
          title: '',
          date: '',
          description: '',
          type: 'workshop',
          icon: '🎓',
          location: 'Haramaya University',
          registrationRequired: false,
          maxParticipants: '',
          organizer: 'ESCDC Team',
          mediaFiles: []
        });
        setEditingEvent(null);
        fetchEvents();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to save event: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEventData({
      title: event.title,
      date: event.date.split('T')[0], // Format date for input
      description: event.description,
      type: event.type,
      icon: event.icon,
      location: event.location,
      registrationRequired: event.registrationRequired,
      maxParticipants: event.maxParticipants || '',
      organizer: event.organizer
    });
    setEditingEvent(event);
    setMessage('');
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Event deleted successfully!');
        fetchEvents();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to delete event: ' + error.message);
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setEventData({
      title: '',
      date: '',
      description: '',
      type: 'workshop',
      icon: '🎓',
      location: 'Haramaya University',
      registrationRequired: false,
      maxParticipants: '',
      organizer: 'ESCDC Team',
      mediaFiles: []
    });
    setMessage('');
  };

  // Event media upload function
  const handleEventMediaUpload = async (eventId, file, showMessage = true) => {
    if (!file) return;

    if (showMessage) {
      setUploading(true);
      setMessage('');
    }

    try {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        if (showMessage) {
          setMessage('❌ Please select an image or video file');
          setUploading(false);
        }
        throw new Error('Invalid file type');
      }

      // Validate file size (50MB for videos, 5MB for images)
      const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        if (showMessage) {
          setMessage(`❌ File too large. Maximum size is ${isVideo ? '50MB' : '5MB'}`);
          setUploading(false);
        }
        throw new Error('File too large');
      }

      const formData = new FormData();
      formData.append('media', file);

      // For file uploads, only include Authorization header, not Content-Type
      const token = localStorage.getItem('adminToken');
      const apiUrl = `${import.meta.env.VITE_API_URL}/events/${eventId}/media`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        if (showMessage) {
          setMessage(`✅ ${isVideo ? 'Video' : 'Image'} uploaded successfully!`);
          fetchEvents(); // Refresh events list to show new media
        }
        return data;
      } else {
        if (showMessage) {
          setMessage('❌ ' + data.message);
        }
        throw new Error(data.message);
      }
    } catch (error) {
      if (showMessage) {
        setMessage('❌ Failed to upload media: ' + error.message);
      }
      throw error;
    } finally {
      if (showMessage) {
        setUploading(false);
      }
    }
  };

  // Event media delete function
  const handleDeleteEventMedia = async (eventId, mediaId) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/media/${mediaId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Media deleted successfully!');
        fetchEvents(); // Refresh events list
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to delete media: ' + error.message);
    }
  };

  // Load events when switching to events tab
  useEffect(() => {
    if (activeTab === 'events' && isAuthenticated) {
      fetchEvents();
    }
  }, [activeTab, isAuthenticated]);

  // Leadership management functions
  const fetchLeadership = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leadership/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setLeadership(data.leadership);
      }
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
    }
  };

  const handleLeadershipSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      if (!leadershipData.name || !leadershipData.position || !leadershipData.category) {
        setMessage('Please fill in all required fields');
        return;
      }

      // Validate sector for executive-sector category
      if (leadershipData.category === 'executive-sector' && !leadershipData.sector) {
        setMessage('Please select a sector for executive sector members');
        return;
      }

      const url = editingLeadership 
        ? `${import.meta.env.VITE_API_URL}/leadership/${editingLeadership._id}`
        : `${import.meta.env.VITE_API_URL}/leadership`;
      
      const method = editingLeadership ? 'PUT' : 'POST';

      // Create leadership member first
      const leadershipPayload = { ...leadershipData };
      delete leadershipPayload.image; // Remove image from main payload
      
      // Clean up sector field - don't send empty string for higher-management
      if (leadershipPayload.category === 'higher-management') {
        delete leadershipPayload.sector; // Remove sector field entirely
      } else if (leadershipPayload.sector === '') {
        // For executive-sector, if sector is empty, it will fail validation anyway
        setMessage('Please select a sector for executive sector members');
        return;
      }

      console.log('Submitting leadership data:', leadershipPayload); // Debug log

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(leadershipPayload)
      });

      const data = await response.json();
      console.log('Leadership response:', data); // Debug log

      if (data.success) {
        let finalMember = data.leadership;

        // If there's an image to upload, upload it separately
        if (leadershipData.image) {
          const formData = new FormData();
          formData.append('image', leadershipData.image);

          const imageResponse = await fetch(`${import.meta.env.VITE_API_URL}/leadership/${finalMember._id}/image`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: formData
          });

          const imageData = await imageResponse.json();
          if (imageData.success) {
            finalMember = imageData.leadership;
          } else {
            console.error('Image upload failed:', imageData);
            setMessage('⚠️ Leadership member saved but image upload failed: ' + imageData.message);
          }
        }

        if (!leadershipData.image || data.success) {
          setMessage(`✅ Leadership member ${editingLeadership ? 'updated' : 'created'} successfully!`);
        }
        
        setLeadershipData({
          name: '',
          position: '',
          category: 'higher-management',
          sector: '',
          bio: '',
          email: '',
          phone: '',
          socialMedia: { linkedin: '', twitter: '', facebook: '' },
          order: 0,
          image: null
        });
        setEditingLeadership(null);
        // Clear file input
        const fileInput = document.getElementById('leadership-image');
        if (fileInput) fileInput.value = '';
        fetchLeadership();
      } else {
        console.error('Leadership submission failed:', data);
        setMessage('❌ ' + (data.message || 'Failed to save leadership member'));
      }
    } catch (error) {
      console.error('Leadership submission error:', error);
      setMessage('❌ Failed to save leadership member: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditLeadership = (member) => {
    console.log('Editing leadership member:', member); // Debug log
    
    setLeadershipData({
      name: member.name || '',
      position: member.position || '',
      category: member.category || 'higher-management',
      sector: member.category === 'executive-sector' ? (member.sector || '') : '', // Only set sector for executive-sector
      bio: member.bio || '',
      email: member.email || '',
      phone: member.phone || '',
      socialMedia: {
        linkedin: member.socialMedia?.linkedin || '',
        twitter: member.socialMedia?.twitter || '',
        facebook: member.socialMedia?.facebook || ''
      },
      order: member.order || 0,
      image: null // Don't pre-fill image for editing
    });
    setEditingLeadership(member);
    setMessage('');
  };

  const handleDeleteLeadership = async (memberId) => {
    if (!confirm('Are you sure you want to delete this leadership member?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leadership/${memberId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Leadership member deleted successfully!');
        fetchLeadership();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to delete leadership member: ' + error.message);
    }
  };

  const cancelLeadershipEdit = () => {
    setEditingLeadership(null);
    setLeadershipData({
      name: '',
      position: '',
      category: 'higher-management',
      sector: '',
      bio: '',
      email: '',
      phone: '',
      socialMedia: { linkedin: '', twitter: '', facebook: '' },
      order: 0,
      image: null
    });
    // Clear file input
    const fileInput = document.getElementById('leadership-image');
    if (fileInput) fileInput.value = '';
    setMessage('');
  };

  // Members management functions
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/membership/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setMembers(data.memberships);
        setMemberStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const updateMemberStatus = async (memberId, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/membership/${memberId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Member status updated to ${status}!`);
        fetchMembers();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to update member status: ' + error.message);
    }
  };

  // Messages management functions
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.contacts);
        setMessageStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${messageId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Message status updated to ${status}!`);
        fetchMessages();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to update message status: ' + error.message);
    }
  };

  // Admins management functions
  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/admins`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setAdmins(data.admins);
        setAdminStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  const updateAdminStatus = async (adminId, isActive) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/admins/${adminId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ isActive })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Admin ${isActive ? 'activated' : 'deactivated'} successfully!`);
        fetchAdmins();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to update admin status: ' + error.message);
    }
  };

  // Create new admin function
  const createNewAdmin = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      if (!newAdminData.username || !newAdminData.email || !newAdminData.password) {
        setMessage('Please fill in all required fields');
        return;
      }

      if (newAdminData.password.length < 6) {
        setMessage('Password must be at least 6 characters');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/admins/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(newAdminData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ New admin created successfully!');
        setNewAdminData({
          username: '',
          email: '',
          password: '',
          role: 'admin'
        });
        setShowCreateAdminForm(false);
        fetchAdmins();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to create admin: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Gallery management functions
  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gallery/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setGalleryImages(data.images);
        setGalleryStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    }
  };

  const handleDeleteGalleryImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gallery/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Image deleted successfully!');
        fetchGalleryImages();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to delete image: ' + error.message);
    }
  };

  // Resources management functions
  const fetchResources = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/resources/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setResources(data.resources);
        setResourceStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/resources/${resourceId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Resource deleted successfully!');
        fetchResources();
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Failed to delete resource: ' + error.message);
    }
  };

  // Load data when switching tabs
  useEffect(() => {
    if (!isAuthenticated) return;

    switch (activeTab) {
      case 'events':
        fetchEvents();
        break;
      case 'leadership':
        fetchLeadership();
        break;
      case 'members':
        fetchMembers();
        break;
      case 'messages':
        fetchMessages();
        break;
      case 'gallery':
        fetchGalleryImages();
        break;
      case 'resources':
        fetchResources();
        break;
      case 'admins':
        fetchAdmins();
        break;
    }
  }, [activeTab, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'gallery', label: '📸 Gallery', icon: '📸' },
    { id: 'resources', label: '📄 Resources', icon: '📄' },
    { id: 'events', label: '📅 Events', icon: '📅' },
    { id: 'leadership', label: '👥 Leadership', icon: '👥' },
    { id: 'members', label: '🎓 Members', icon: '🎓' },
    { id: 'messages', label: '📧 Messages', icon: '📧' },
    { id: 'admins', label: '👤 Admins', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/escdc-logo.jpg" 
                  alt="ESCDC Logo" 
                  className="w-full h-full object-contain bg-white p-1 rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-600">ESCDC Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {adminUser?.username}! Manage your club content</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
            >
              Logout
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">📸 Gallery Management</h3>
                    <p className="text-gray-600 text-sm">Upload and manage event photos</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-600 mb-2">📄 Resource Library</h3>
                    <p className="text-gray-600 text-sm">Upload documents and templates</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-600 mb-2">📅 Events & Media</h3>
                    <p className="text-gray-600 text-sm">Manage events with photo/video uploads</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-yellow-600 mb-2">🚀 Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="text-left p-4 bg-white rounded border hover:shadow-md transition"
                    >
                      <div className="font-medium">Upload Gallery Image</div>
                      <div className="text-sm text-gray-600">Add photos from recent events</div>
                    </button>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className="text-left p-4 bg-white rounded border hover:shadow-md transition"
                    >
                      <div className="font-medium">Upload Resource</div>
                      <div className="text-sm text-gray-600">Add documents for students</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Gallery Management:</strong> Upload new images and manage existing gallery content directly from this dashboard.
                  </p>
                </div>

                {/* Gallery Statistics */}
                {galleryStats && Object.keys(galleryStats).length > 0 && (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{galleryStats.total || 0}</div>
                      <div className="text-sm text-blue-600">Total Media</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{galleryStats.images || 0}</div>
                      <div className="text-sm text-green-600">Images</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{galleryStats.videos || 0}</div>
                      <div className="text-sm text-purple-600">Videos</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">{galleryStats.workshops || 0}</div>
                      <div className="text-sm text-orange-600">Workshops</div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleGalleryUpload} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Upload New Media</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Media File (Image or Video) *</label>
                    <input
                      id="gallery-file"
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => setGalleryData({ ...galleryData, media: e.target.files[0] })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Images: Max 5MB (JPG, PNG, GIF, WebP)<br/>
                      Videos: Max 50MB (MP4, AVI, MOV, WMV, FLV, WebM, MKV)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Category *</label>
                      <select
                        value={galleryData.category}
                        onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="workshops">Workshops & Trainings</option>
                        <option value="lectures">Guest Lectures</option>
                        <option value="competitions">Competitions</option>
                        <option value="networking">Networking Events</option>
                        <option value="team">Team Activities</option>
                        <option value="community">Community Engagement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Event Date</label>
                      <input
                        type="date"
                        value={galleryData.eventDate}
                        onChange={(e) => setGalleryData({ ...galleryData, eventDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={galleryData.title}
                      onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                      placeholder="e.g., Career Development Workshop 2024"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      value={galleryData.description}
                      onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
                      placeholder="Brief description of the event..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    {uploading ? 'Uploading...' : 'Upload Media'}
                  </Button>
                </form>

                {/* Existing Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Existing Images ({galleryImages.length})</h3>
                  {galleryImages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No images uploaded yet. Upload your first image above!
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {galleryImages.map((image) => (
                        <div key={image._id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                          <div className="aspect-video bg-gray-100">
                            <img
                              src={getImageUrl(image.url)}
                              alt={image.title || 'Gallery image'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-sm">{image.title || 'Untitled'}</h4>
                                <p className="text-xs text-gray-600 capitalize">{image.category.replace('-', ' ')}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(image.uploadedAt).toLocaleDateString()}
                              </span>
                            </div>
                            {image.description && (
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteGalleryImage(image._id)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Resource Management</h2>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Resource Management:</strong> Upload new resources and manage existing ones directly from this dashboard. 
                    Resources are automatically categorized and available for download on the Resources page.
                  </p>
                </div>

                {/* Resource Statistics */}
                {resourceStats && Object.keys(resourceStats).length > 0 && (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{resourceStats.total || 0}</div>
                      <div className="text-sm text-blue-600">Total Resources</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{resourceStats.career || 0}</div>
                      <div className="text-sm text-green-600">Career</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{resourceStats.entrepreneurship || 0}</div>
                      <div className="text-sm text-purple-600">Entrepreneurship</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">{resourceStats.leadership || 0}</div>
                      <div className="text-sm text-orange-600">Leadership</div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleResourceUpload} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Upload New Resource</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Resource File *</label>
                    <input
                      id="resource-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                      onChange={(e) => setResourceData({ ...resourceData, file: e.target.files[0] })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Max size: 10MB. Formats: PDF, DOC, PPT, XLS</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Category *</label>
                    <select
                      value={resourceData.category}
                      onChange={(e) => setResourceData({ ...resourceData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="career">Career Development</option>
                      <option value="entrepreneurship">Entrepreneurship</option>
                      <option value="leadership">Leadership & Skills</option>
                      <option value="opportunities">Opportunities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={resourceData.title}
                      onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                      placeholder="e.g., Professional CV Template"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      value={resourceData.description}
                      onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                      placeholder="Brief description of the resource..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    {uploading ? 'Uploading...' : 'Upload Resource'}
                  </Button>
                </form>

                {/* Existing Resources */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Existing Resources ({resources.length})</h3>
                  {resources.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No resources uploaded yet. Upload your first resource above!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {resources.map((resource) => (
                        <div key={resource._id} className="p-4 border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-lg">
                                    {resource.fileType === '.pdf' ? '📄' : 
                                     resource.fileType === '.doc' || resource.fileType === '.docx' ? '📝' :
                                     resource.fileType === '.ppt' || resource.fileType === '.pptx' ? '📊' :
                                     resource.fileType === '.xls' || resource.fileType === '.xlsx' ? '📈' : '📄'}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg">{resource.title}</h4>
                                  <p className="text-sm text-blue-600 capitalize">{resource.category.replace('-', ' ')}</p>
                                </div>
                                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                  {resource.fileType.toUpperCase().replace('.', '')}
                                </span>
                              </div>
                              {resource.description && (
                                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                              )}
                              <div className="text-xs text-gray-500">
                                <span>📁 {(resource.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                                <span className="ml-4">📥 {resource.downloads || 0} downloads</span>
                                <span className="ml-4">📅 {new Date(resource.uploadedAt).toLocaleDateString()}</span>
                                <span className="ml-4">👤 {resource.uploadedBy?.username || 'Admin'}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <a
                                href={`${import.meta.env.VITE_API_URL}/resources/download/${resource._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                              >
                                Download
                              </a>
                              <button
                                onClick={() => handleDeleteResource(resource._id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
                  {editingEvent && (
                    <Button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Event Management:</strong> Create, edit, and delete events directly from this dashboard. 
                    Events are automatically categorized as upcoming or recent based on their date.
                    <br />
                    <strong>📸 Media Upload:</strong> Upload photos and videos for each event to showcase activities and engage visitors.
                  </p>
                </div>

                {/* Event Form */}
                <form onSubmit={handleEventSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Event Title *</label>
                      <input
                        type="text"
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        placeholder="e.g., Career Development Workshop"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Event Date *</label>
                      <input
                        type="date"
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Event Type *</label>
                      <select
                        value={eventData.type}
                        onChange={(e) => setEventData({ ...eventData, type: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="competition">Competition</option>
                        <option value="lecture">Guest Lecture</option>
                        <option value="networking">Networking Event</option>
                        <option value="training">Training Session</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Icon</label>
                      <select
                        value={eventData.icon}
                        onChange={(e) => setEventData({ ...eventData, icon: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="🎓">🎓 Academic</option>
                        <option value="💼">💼 Career</option>
                        <option value="🚀">🚀 Innovation</option>
                        <option value="🏆">🏆 Competition</option>
                        <option value="🤝">🤝 Networking</option>
                        <option value="📊">📊 Business</option>
                        <option value="💡">💡 Ideas</option>
                        <option value="🎤">🎤 Speaking</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={eventData.location}
                        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                        placeholder="Haramaya University"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description *</label>
                    <textarea
                      value={eventData.description}
                      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      placeholder="Detailed description of the event..."
                      rows="4"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Organizer</label>
                      <input
                        type="text"
                        value={eventData.organizer}
                        onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                        placeholder="ESCDC Team"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Max Participants</label>
                      <input
                        type="number"
                        value={eventData.maxParticipants}
                        onChange={(e) => setEventData({ ...eventData, maxParticipants: e.target.value })}
                        placeholder="Leave empty for unlimited"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={eventData.registrationRequired}
                          onChange={(e) => setEventData({ ...eventData, registrationRequired: e.target.checked })}
                          className="mr-2"
                        />
                        Registration Required
                      </label>
                    </div>
                  </div>

                  {/* Event Media Upload Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Event Photos & Videos</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Upload Media Files</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            setEventData({ ...eventData, mediaFiles: files });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Select multiple photos and videos. Max 5MB per image, 50MB per video.
                        </p>
                      </div>

                      {/* Preview Selected Files */}
                      {eventData.mediaFiles && eventData.mediaFiles.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-700">Selected Files ({eventData.mediaFiles.length}):</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {eventData.mediaFiles.map((file, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                                  {file.type.startsWith('image/') ? (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                      <div className="text-center">
                                        <span className="text-2xl">🎥</span>
                                        <p className="text-xs text-gray-600 mt-1">Video</p>
                                      </div>
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFiles = eventData.mediaFiles.filter((_, i) => i !== index);
                                      setEventData({ ...eventData, mediaFiles: newFiles });
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    ×
                                  </button>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    {uploading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                  </Button>
                </form>

                {/* Events List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Existing Events ({events.length})</h3>
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No events created yet. Create your first event above!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {events.map((event) => (
                        <div key={event._id} className="p-6 border rounded-lg hover:shadow-md transition bg-white">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{event.icon}</span>
                                <h4 className="font-medium text-lg">{event.title}</h4>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  new Date(event.date) > new Date() 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                                </span>
                                {event.media && event.media.length > 0 && (
                                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                                    📸 {event.media.length} media
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                              <div className="text-xs text-gray-500">
                                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                                <span className="ml-4">📍 {event.location}</span>
                                <span className="ml-4">👤 {event.organizer}</span>
                                {event.maxParticipants && (
                                  <span className="ml-4">👥 Max: {event.maxParticipants}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditEvent(event)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event._id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {/* Event Media Display */}
                          {event.media && event.media.length > 0 && (
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-800 mb-3">Event Media ({event.media.length})</h5>
                              <div className="grid grid-cols-6 gap-2">
                                {event.media.slice(0, 6).map((media, index) => (
                                  <div key={media._id || index} className="relative group">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                      {media.mediaType === 'video' ? (
                                        <video 
                                          src={getImageUrl(media.url)}
                                          className="w-full h-full object-cover"
                                          controls={false}
                                          muted
                                        />
                                      ) : (
                                        <img 
                                          src={getImageUrl(media.url)}
                                          alt={`Event media ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                          onClick={() => handleDeleteEventMedia(event._id, media._id)}
                                          className="text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                                          title="Delete media"
                                        >
                                          🗑️
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {event.media.length > 6 && (
                                <p className="text-xs text-gray-500 mt-2">
                                  +{event.media.length - 6} more media files
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Leadership Tab */}
            {activeTab === 'leadership' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Leadership Management</h2>
                  {editingLeadership && (
                    <Button
                      onClick={cancelLeadershipEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Leadership Management:</strong> Add, edit, and manage leadership members directly from this dashboard. 
                    Changes appear immediately on the Leadership page.
                  </p>
                </div>

                {/* Leadership Form */}
                <form onSubmit={handleLeadershipSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    {editingLeadership ? `Edit Leadership Member: ${editingLeadership.name}` : 'Add New Leadership Member'}
                  </h3>
                  
                  {/* Debug info when editing */}
                  {editingLeadership && (
                    <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
                      <strong>Editing:</strong> {editingLeadership.name} ({editingLeadership.position})
                      <br />
                      <strong>Category:</strong> {editingLeadership.category}
                      {editingLeadership.sector && <><br /><strong>Sector:</strong> {editingLeadership.sector}</>}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        value={leadershipData.name}
                        onChange={(e) => setLeadershipData({ ...leadershipData, name: e.target.value })}
                        placeholder="e.g., John Doe"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Position *</label>
                      <input
                        type="text"
                        value={leadershipData.position}
                        onChange={(e) => setLeadershipData({ ...leadershipData, position: e.target.value })}
                        placeholder="e.g., President, Vice President"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Profile Photo</label>
                    <input
                      id="leadership-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLeadershipData({ ...leadershipData, image: e.target.files[0] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP, GIF</p>
                    {editingLeadership && editingLeadership.image && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Current photo:</p>
                        <img 
                          src={getImageUrl(editingLeadership.image)} 
                          alt={editingLeadership.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Category *</label>
                      <select
                        value={leadershipData.category}
                        onChange={(e) => setLeadershipData({ ...leadershipData, category: e.target.value, sector: '' })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="higher-management">Higher Management</option>
                        <option value="executive-sector">Executive Sector</option>
                      </select>
                    </div>

                    {leadershipData.category === 'executive-sector' && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Sector *</label>
                        <select
                          value={leadershipData.sector}
                          onChange={(e) => setLeadershipData({ ...leadershipData, sector: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Sector</option>
                          <option value="networking-professional">Networking & Professional Development</option>
                          <option value="innovation-technology">Innovation & Technology</option>
                          <option value="event-planning">Event Planning</option>
                          <option value="student-career">Student Career</option>
                          <option value="public-relations">Public Relations</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Bio</label>
                    <textarea
                      value={leadershipData.bio}
                      onChange={(e) => setLeadershipData({ ...leadershipData, bio: e.target.value })}
                      placeholder="Brief biography and role description..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={leadershipData.email}
                        onChange={(e) => setLeadershipData({ ...leadershipData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={leadershipData.phone}
                        onChange={(e) => setLeadershipData({ ...leadershipData, phone: e.target.value })}
                        placeholder="+251 XXX XXX XXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    {uploading ? 'Saving...' : (editingLeadership ? 'Update Member' : 'Add Member')}
                  </Button>
                </form>

                {/* Leadership List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Leadership ({leadership.length})</h3>
                  {leadership.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No leadership members added yet. Add your first member above!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {leadership.map((member) => (
                        <div key={member._id} className="p-4 border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                  {member.image ? (
                                    <img src={getImageUrl(member.image)} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                  ) : (
                                    <span className="text-lg">👤</span>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg">{member.name}</h4>
                                  <p className="text-sm text-blue-600">{member.position}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  member.category === 'higher-management' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {member.category === 'higher-management' ? 'Higher Management' : 'Executive Sector'}
                                </span>
                              </div>
                              {member.bio && <p className="text-sm text-gray-600 mb-2">{member.bio}</p>}
                              <div className="text-xs text-gray-500">
                                {member.email && <span>📧 {member.email}</span>}
                                {member.phone && <span className="ml-4">📱 {member.phone}</span>}
                                {member.sector && <span className="ml-4">🏢 {member.sector.replace('-', ' ')}</span>}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditLeadership(member)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteLeadership(member._id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Member Management</h2>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Member Management:</strong> View and manage member registrations directly from this dashboard. 
                    Update member status and track registration statistics.
                  </p>
                </div>

                {/* Member Statistics */}
                {memberStats && Object.keys(memberStats).length > 0 && (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{memberStats.total || 0}</div>
                      <div className="text-sm text-blue-600">Total Members</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">{memberStats.pending || 0}</div>
                      <div className="text-sm text-yellow-600">Pending</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{memberStats.approved || 0}</div>
                      <div className="text-sm text-green-600">Approved</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">{memberStats.rejected || 0}</div>
                      <div className="text-sm text-red-600">Rejected</div>
                    </div>
                  </div>
                )}

                {/* Members List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Member Registrations ({members.length})</h3>
                  {members.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No member registrations yet. Members can register via the /membership page.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {members.map((member) => (
                        <div key={member._id} className="p-4 border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{member.fullName.charAt(0)}</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg">{member.fullName}</h4>
                                  <p className="text-sm text-gray-600">{member.studentId} • {member.department}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  member.status === 'approved' 
                                    ? 'bg-green-100 text-green-700' 
                                    : member.status === 'rejected'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {member.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <p><strong>Email:</strong> {member.email}</p>
                                <p><strong>Phone:</strong> {member.phone}</p>
                                <p><strong>Year:</strong> {member.year}</p>
                                {member.interests && <p><strong>Interests:</strong> {member.interests}</p>}
                              </div>
                              <div className="text-xs text-gray-500">
                                Registered: {new Date(member.submittedAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              {member.status !== 'approved' && (
                                <button
                                  onClick={() => updateMemberStatus(member._id, 'approved')}
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                                >
                                  Approve
                                </button>
                              )}
                              {member.status !== 'rejected' && (
                                <button
                                  onClick={() => updateMemberStatus(member._id, 'rejected')}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                                >
                                  Reject
                                </button>
                              )}
                              {member.status !== 'pending' && (
                                <button
                                  onClick={() => updateMemberStatus(member._id, 'pending')}
                                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                                >
                                  Pending
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Message Management:</strong> View and manage contact form submissions directly from this dashboard. 
                    Update message status and track communication statistics.
                  </p>
                </div>

                {/* Message Statistics */}
                {messageStats && Object.keys(messageStats).length > 0 && (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{messageStats.total || 0}</div>
                      <div className="text-sm text-blue-600">Total Messages</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">{messageStats.new || 0}</div>
                      <div className="text-sm text-yellow-600">New</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{messageStats.read || 0}</div>
                      <div className="text-sm text-green-600">Read</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{messageStats.replied || 0}</div>
                      <div className="text-sm text-purple-600">Replied</div>
                    </div>
                  </div>
                )}

                {/* Messages List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Messages ({messages.length})</h3>
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No contact messages yet. Messages can be sent via the /contact page.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message._id} className="p-4 border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{message.name.charAt(0)}</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg">{message.name}</h4>
                                  <p className="text-sm text-gray-600">{message.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  message.status === 'replied' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : message.status === 'read'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {message.status}
                                </span>
                              </div>
                              <div className="mb-2">
                                <p className="font-medium text-gray-800">{message.subject}</p>
                                <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                              </div>
                              <div className="text-xs text-gray-500">
                                Received: {new Date(message.submittedAt).toLocaleDateString()} at {new Date(message.submittedAt).toLocaleTimeString()}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              {message.status !== 'read' && (
                                <button
                                  onClick={() => updateMessageStatus(message._id, 'read')}
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                                >
                                  Mark Read
                                </button>
                              )}
                              {message.status !== 'replied' && (
                                <button
                                  onClick={() => updateMessageStatus(message._id, 'replied')}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
                                >
                                  Mark Replied
                                </button>
                              )}
                              {message.status !== 'new' && (
                                <button
                                  onClick={() => updateMessageStatus(message._id, 'new')}
                                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                                >
                                  Mark New
                                </button>
                              )}
                              <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                              >
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admins Tab */}
            {activeTab === 'admins' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    <strong>✅ Dynamic Admin Management:</strong> View and manage admin accounts directly from this dashboard. 
                    Activate or deactivate admin accounts and track admin statistics.
                  </p>
                </div>

                {/* Admin Statistics */}
                {adminStats && Object.keys(adminStats).length > 0 && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{adminStats.total || 0}</div>
                      <div className="text-sm text-blue-600">Total Admins</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{adminStats.active || 0}</div>
                      <div className="text-sm text-green-600">Active</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">{adminStats.inactive || 0}</div>
                      <div className="text-sm text-red-600">Inactive</div>
                    </div>
                  </div>
                )}

                {/* Admins List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Admin Accounts ({admins.length})</h3>
                    <Button
                      onClick={() => setShowCreateAdminForm(!showCreateAdminForm)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                    >
                      {showCreateAdminForm ? 'Cancel' : 'Create New Admin'}
                    </Button>
                  </div>

                  {/* Create Admin Form */}
                  {showCreateAdminForm && (
                    <form onSubmit={createNewAdmin} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold">Create New Admin</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Username *</label>
                          <input
                            type="text"
                            value={newAdminData.username}
                            onChange={(e) => setNewAdminData({ ...newAdminData, username: e.target.value })}
                            placeholder="e.g., john_doe"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            value={newAdminData.email}
                            onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                            placeholder="e.g., john@example.com"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Password *</label>
                          <input
                            type="password"
                            value={newAdminData.password}
                            onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                            placeholder="Minimum 6 characters"
                            required
                            minLength="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Role</label>
                          <select
                            value={newAdminData.role}
                            onChange={(e) => setNewAdminData({ ...newAdminData, role: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                          </select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                      >
                        {uploading ? 'Creating...' : 'Create Admin'}
                      </Button>
                    </form>
                  )}

                  {admins.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No admin accounts found. Create your first additional admin above!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {admins.map((admin) => (
                        <div key={admin._id} className="p-4 border rounded-lg hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{admin.username.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg">{admin.username}</h4>
                                  <p className="text-sm text-gray-600">{admin.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  admin.isActive 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {admin.isActive ? 'Active' : 'Inactive'}
                                </span>
                                {admin._id === adminUser?._id && (
                                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                                    Current User
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                <span>Created: {new Date(admin.createdAt).toLocaleDateString()}</span>
                                {admin.lastLogin && (
                                  <span className="ml-4">Last Login: {new Date(admin.lastLogin).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              {admin._id !== adminUser?._id && (
                                <>
                                  {admin.isActive ? (
                                    <button
                                      onClick={() => updateAdminStatus(admin._id, false)}
                                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => updateAdminStatus(admin._id, true)}
                                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                                    >
                                      Activate
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Admin Creation Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Admin Management</h4>
                  <p className="text-blue-700 text-sm">
                    You can now create multiple admin accounts directly from this dashboard. 
                    Each admin can have different roles (Admin or Moderator) and can be activated/deactivated as needed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
