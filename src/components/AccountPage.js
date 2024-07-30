import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Input, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const AccountPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || 'user@example.com';
    const savedName = localStorage.getItem('name') || 'AK';
    const savedImage = localStorage.getItem('image') || '';
    setEmail(savedEmail);
    setName(savedName);
    setImage(savedImage);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    localStorage.setItem('image', image);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setOpenModal(false); // Close the modal after selecting the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    navigate('/');
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Account Information</h2>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Email address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            required
            variant="outlined"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            required
            variant="outlined"
          />
        </div>
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <label>Profile Picture</label>
          <div style={{ margin: '10px' }}>
            <Avatar
              src={image || '/default-avatar.png'} // Fallback image
              alt="Profile"
              style={{ width: 100, height: 100 }}
            />
          </div>
          {isEditing && (
            <Button variant="outlined" color="secondary" onClick={handleOpenModal}>
              Change Profile Picture
            </Button>
          )}
        </div>
        {isEditing ? (
          <Button type="submit" variant="contained" color="primary">Save</Button>
        ) : (
          <Button type="button" variant="outlined" color="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </form>
      <Button variant="contained" color="error" style={{ marginTop: '16px' }} onClick={handleLogout}>Logout</Button>

      {/* Modal for Image Upload */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountPage;
