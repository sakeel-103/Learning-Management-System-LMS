// services/notificationService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/notification/';
const token = localStorage.getItem('ACCESS_TOKEN');

const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchNotifications = async () => {
  try {
    const response = await axios.get(API_URL, { headers });
    console.log("Notifications fetched (raw):", response.data.notifications);
    return response.data.notifications || [];
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return [];
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    await axios.patch(`${API_URL}${id}/`, { is_read: true }, { headers });
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
  }
};
