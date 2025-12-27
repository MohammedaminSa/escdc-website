const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic request handler
const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Contact form submission
export const submitContactForm = async (formData) => {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Membership registration
export const submitMembershipForm = async (formData) => {
  return request('/membership/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Gallery APIs
export const getGalleryImages = async () => {
  return request('/gallery');
};

export const uploadGalleryImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return fetch(`${API_BASE_URL}/gallery/upload`, {
    method: 'POST',
    body: formData,
  }).then(res => res.json());
};

// Resources APIs
export const getResources = async () => {
  return request('/resources');
};

export const uploadResource = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(`${API_BASE_URL}/resources/upload`, {
    method: 'POST',
    body: formData,
  }).then(res => res.json());
};

export const downloadResource = (filename) => {
  window.open(`${API_BASE_URL}/resources/download/${filename}`, '_blank');
};

export default {
  submitContactForm,
  submitMembershipForm,
  getGalleryImages,
  uploadGalleryImage,
  getResources,
  uploadResource,
  downloadResource,
};