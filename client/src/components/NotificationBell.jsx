// src/components/NotificationBell.jsx
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { fetchNotifications, markNotificationAsRead } from '../services/notificationService';

const NotificationBell = ({ userRole }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    loadNotifications();
  };

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      console.log('✅ Notifications fetched (raw):', data);
      setNotifications(data);
    } catch (error) {
      console.error('❌ Failed to load notifications:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: '300px',
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>No notifications</MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
              style={{
                backgroundColor: notification.is_read ? '#fff' : '#f0f4ff',
                whiteSpace: 'normal',
              }}
            >
              <div>
                <Typography variant="subtitle2">{notification.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {notification.message}
                </Typography>
              </div>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
