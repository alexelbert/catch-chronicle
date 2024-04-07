import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/utils';
import { Modal, Button } from 'react-bootstrap';
import styles from '../styles/NotificationsComponent.module.css';
import { axiosReq } from '../api/axiosDefaults';
import Asset from './Asset';


const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

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

  const removeNotification = async (id) => {
    try {
      await axiosReq.delete(`/notifications/${id}`);
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete the notification:', error);
    }
  };
  

  const BellIcon = () => (
    <button onClick={() => setModalShow(true)} className={styles.bellIcon}>
      <i className="fa-regular fa-bell"></i>
    </button>
  );

  return (
    <>
      <BellIcon />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            < Asset />
          ) : notifications.length ? (
            notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                {notification.notification_text} - {new Date(notification.created_at).toLocaleDateString()}
                <span onClick={() => removeNotification(notification.id)} className={styles.removeButton}>
                X
                </span>
              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationsComponent;
