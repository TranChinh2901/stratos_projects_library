import { LuPenLine } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/AuthContext';
import styles from './Profile.module.css'; 
const Profile = () => {
    const [auth] = useAuth();
const navigate = useNavigate();
  return (
    <Layout title="Stratos - User Profile" description="View and manage your user profile information.">
      <div className={styles.profileContainer}>
        <div className={styles.leftProfile}>
            <div className={styles.profileCard}>
                <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name)}&background=random&color=fff&size=200`}
                alt={auth?.user?.name}
                className={styles.profileImage}
                />
                <h2 className={styles.profileName}>{auth?.user?.name}</h2>
                <p className={styles.profileEmail}>{auth?.user?.github.substring(0,32)}...</p>
                <p className={styles.profileRole}>
                Role: {auth?.user?.role === 1 ? 'Admin' : 'Member'}
                </p>
            </div>
            </div>
        <div className={styles.rightProfile}>
            <div className={styles.profileDetails}>
                <div className={styles.profileFlex}>
                    <h3>Profile Details</h3>
                     <div style={{ fontSize: '22px', cursor: 'pointer' }} onClick={() => navigate("/profile/edit")}>
                                <LuPenLine />
                            </div>
                </div>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Phone:</strong> {auth?.user?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {auth?.user?.address || 'N/A'}</p>
        </div>
      </div>
       </div>
    </Layout>
  )
}

export default Profile
