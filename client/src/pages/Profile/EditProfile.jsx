import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/AuthContext";

const EditProfile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth?.user?.name,
        email: auth?.user?.email,
        phone: auth?.user?.phone,
        gender: auth?.user?.gender,
        address: auth?.user?.address,
        github: auth?.user?.github ,
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuth({ ...auth, user: formData });
        toast.success("Cập nhật thông tin thành công!");
        navigate("/profile-user");
    };

    return (
        <Layout title="Cập nhật thông tin">
            <div className={styles.wrapUpdateProfile}>
                <div className={styles.updateProfile}>
                    <h2>Cập nhật thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Họ và tên:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Số điện thoại:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Giới tính:</label>
                            <input type="gender" name="gender" value={formData.gender} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Địa chỉ:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Link github:</label>
                            <input type="text" name="github" value={formData.github} onChange={handleChange} required />
                        </div>
                        <button type="submit">Lưu thay đổi</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfile;