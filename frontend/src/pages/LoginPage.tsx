// src/pages/login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values, {
        withCredentials: true,
      });

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });

      if (response.data) {
        message.success("Logged in successfully");
        navigate("/folders");
      }
    } catch (error) {
      message.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <Form
        layout="vertical"
        name="login"
        onFinish={onFinish}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
