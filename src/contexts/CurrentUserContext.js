import React from 'react';
import profileAvatar from '../images/profile-avatar.jpg';
export const CurrentUserContext = React.createContext();

export const user = {
  loadUser: {
    name: '................................................',
    about: '................................................',
    avatar: profileAvatar,
  }
};
