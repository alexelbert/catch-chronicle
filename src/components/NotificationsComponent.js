import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/utils';
import Asset from '../components/Asset';
import styles from '../styles/NotificationsComponent.module.css';

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const getAndSetNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await fetchNotifications();
        setNotifications(data.results);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetNotifications();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className={styles.bellIcon}>
        <i className="fa-regular fa-bell"></i>
      </button>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <h2>Notifications</h2>
          {isLoading ? (
            <Asset spinner />
          ) : notifications.length ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <p>{notification.notification_text} - {new Date(notification.created_at).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications to display.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsComponent;
