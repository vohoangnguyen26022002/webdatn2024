import React from 'react';
import { useState } from "react";
import "./PageLock.css";
import { useDispatch, useSelector } from 'react-redux';
import { PostUnlockHistory } from '../../../redux/apiRequest';
const PageLock = () => {
    const [isLocked, setIsLocked] = useState(true);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    
    const handleToggleLock = () => {
      
      console.log('Toggle lock status:', isLocked);

      if (user?.can_open) {
        setIsLocked((prev) => {
            if (prev) {
                const unlockTime = new Date().toISOString();
                PostUnlockHistory(user.accessToken, dispatch, unlockTime, user.email); 
            }
            return !prev;
        });
    } else {
        console.log('User does not have permission to unlock.');
    }
};
  return (
    <div className="lock-container">
      <div className="lock-icon">
        {isLocked ? '🔒' : '🔓'} 
      </div>
      <h2 className="lock-status">{isLocked ? 'Locked' : 'UnLocked'}</h2>
      <button className="unlock-button" onClick={handleToggleLock}>
        {isLocked ? 'Unlock' : 'Lock'}
      </button>
      {!user?.can_open && (
                <p className="permission-message">You do not have permission to unlock.</p>
            )}
    </div>
  );
};

export default PageLock;
