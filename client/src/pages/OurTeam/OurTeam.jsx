import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OurTeam.module.css';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";

const API_URL = import.meta.env.VITE_API;

const OurTeam = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/v1/auth/users`);
                setUsers(data.users);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách user:', error);
            }
        };
        fetchUsers();
    }, []);

    // Hàm lấy avatar random từ tên
    const getRandomAvatar = (userName) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&size=200`;
    };

    // Hàm kiểm tra role (nếu muốn dùng)
    const checkRole = (role) => {
        return role === 0 ? 'User' : 'Admin';
    };

    return (
        <div className={styles.ourTeamContainer}>
            <div data-aos="fade-right" className={styles.headerSection}>
                <h2>Our Team</h2>
                <p>Meet the amazing people behind The Algorithms</p>
            </div>

            <div className={styles.gridContainer} data-aos="flip-down">
                {users.map((user) => (
                    <div key={user._id} className={styles.card}>
                        <img
                            src={getRandomAvatar(user.name)}
                            alt={user.name}
                            className={styles.avatar}
                        />
                        <h3 className={styles.userName}>{user.name}</h3>

                        {user.github && (
                            <a
                                className={styles.linkGithub}
                                href={user.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${user.name} GitHub`}
                            >
                                <FaGithub className={styles.iconGithub} />
                            </a>
                        )}

                        {/* Nếu muốn hiện email hoặc role thì bỏ comment */}
                        {/* <p>{user.email}</p> */}
                        {/* <p className={styles.checkrole}>{checkRole(user.role)}</p> */}
                    </div>
                ))}
            </div>

            <Link to="/view-members" className={styles.nextToView}>
                View All Team Members <GrLinkNext />
            </Link>
        </div>
    );
};

export default OurTeam;
