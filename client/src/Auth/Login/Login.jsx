import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import {
    Form,
    Input,
    Button,
    Card,
    Typography
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API;
const { Title } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        form.getFieldInstance('email')?.focus();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/v1/auth/login`, values);
            const { success, token, user_success } = response.data;

            if (success && user_success) {
                setAuth({ user: user_success, token });
                toast.success('Đăng nhập thành công!');

                // Chuyển hướng dựa vào role
                navigate(user_success.role === 1 ? '/' : '/');
            } else {
                toast.error('Đăng nhập thất bại!');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={{
                maxWidth: '550px',
                margin: '50px auto',
                padding: '20px'
            }}>
                <Card>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
                        Đăng Nhập
                    </Title>

                    <Form
                        form={form}
                        name="login"
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input
                                style={{ height: '45px' }}
                                prefix={<UserOutlined />}
                                placeholder="Nhập email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' }
                            ]}
                        >
                            <Input.Password
                                style={{ height: '45px' }}
                                prefix={<LockOutlined />}
                                placeholder="Nhập mật khẩu"
                                visibilityToggle
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                loading={loading}
                                block
                                style={{
                                    width: '100%',
                                    height: '45px',
                                    backgroundColor: '#0256B4',
                                    color: '#fff',
                                    border: '1px solid #0256B4',
                                    borderRadius: '5px',
                                    marginTop: '10px'
                                }}
                            >
                                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center' }}>
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Login;
