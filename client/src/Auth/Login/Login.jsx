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

    // Nếu đã đăng nhập rồi => redirect
    useEffect(() => {
        if (auth?.user) {
            navigate('/');
        } else {
            form.getFieldInstance('email')?.focus();
        }
    }, [auth, navigate, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/v1/auth/login`, values);
            const { success, token, user_success } = res.data;

            if (success && user_success) {
                setAuth({ user: user_success, token });
                localStorage.setItem('auth', JSON.stringify({ user: user_success, token }));

                toast.success('Đăng nhập thành công!');
                navigate(user_success.role === 1 ? '/' : '/'); // Bạn có thể redirect theo quyền ở đây
            } else {
                toast.error('Email hoặc mật khẩu không đúng!');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={{
                maxWidth: '550px',
                margin: '60px auto',
                padding: '20px'
            }}>
                <Card bordered>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                        Đăng Nhập
                    </Title>

                    <Form
                        form={form}
                        name="login"
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
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
                                prefix={<UserOutlined />}
                                placeholder="example@email.com"
                                style={{ height: 45 }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="••••••••"
                                style={{ height: 45 }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                style={{
                                    height: 45,
                                    backgroundColor: '#0256B4',
                                    borderColor: '#0256B4',
                                    borderRadius: 5
                                }}
                            >
                                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: 12 }}>
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Login;
