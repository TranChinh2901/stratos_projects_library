import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import styles from './EditProfile.module.css';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API;

const EditProfile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [github, setGithub] = useState(''); 

    useEffect(() => {
        if (auth?.user) {
            setName(auth.user.name || '');
            setEmail(auth.user.email || '');
            setPhone(auth.user.phone || '');
            setAddress(auth.user.address || '');
            setGithub(auth.user.github || '');
        }
    }, [auth?.user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = auth?.user?._id;
            if (!userId) {
                toast.error("User ID not found.");
                return;
            }
            const res = await axios.put(
                `${API_URL}/api/v1/auth/users/${userId}`,
                { name, email, phone, address, github }, 
                {
                    headers: {
                        Authorization: auth?.token ? `Bearer ${auth.token}` : '',
                    },
                }
            );
            if (res.data.success) {
               toast.success('Profile updated successfully!');
                setAuth({ ...auth, user: res.data.user });
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: res.data.user }));
                navigate('/profile');
            } else {
                toast.error(res.data.message || 'Failed to update profile.');
            }
        } catch (err) {
            console.error('Profile update error:', err); 
            toast.error('An error occurred during update.');
        }
    };
    return (
        <Layout title="Stratos - Edit Profile" description="Edit your user profile information.">
            <div className={styles.profileContainer}>
                <div className={styles.rightProfile}>
                    <div className={styles.profileDetails}>
                        <h3>Edit Profile Details</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.flexFormOne}>
                                <div className={styles.formGroup}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.formControl}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.formControl}
                                    required
                                />
                            </div>
                            </div>
                           <div className={styles.flexFormTwo}>
                             <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={styles.formControl}
                                />
                            </div>
                           </div>
                             <div className={styles.formGroup}>
                                <label htmlFor="github">Github:</label>
                                <input
                                    type="text"
                                    id="github"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)} 
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button type="submit" className={styles.updateButton}>
                                Update Profile
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default EditProfile;