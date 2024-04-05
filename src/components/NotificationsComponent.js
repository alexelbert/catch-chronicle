import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/utils';

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getAndSetNotifications = async () => {
      try {
        const data = await fetchNotifications();
        
        setNotifications(data.results);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    getAndSetNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p><strong>Type:</strong> {notification.notification_type}</p>
              <p>{notification.notification_text}</p>
              <p><strong>Read:</strong> {notification.is_read ? 'Yes' : 'No'}</p>
              <p><strong>Date:</strong> {notification.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications to display.</p>
      )}
    </div>
  );
};

export default NotificationsComponent;