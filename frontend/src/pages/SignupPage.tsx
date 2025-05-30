import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from "axios";
import { Button, Card, Form, Input, message } from 'antd';
const SignupPage:React.FC = () => {

  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const onFinish= async (values:{email:string; password:string})=>{
    setLoading(true);

    try{

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values,{withCredentials:true,});

     const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });

       if (response.data) {
        message.success("Signup successful! You're now logged in.");
        navigate("/folders");
       }
       

    }
   catch (err: any) {
  if (axios.isAxiosError(err)) {
    const errorMessage = err.response?.data?.message;

    if (errorMessage === "Email already registered") {
      message.error("An account with this email already exists.");
    } else {
      message.error(errorMessage || "Signup failed. Try again.");
    }
  } else {
    message.error("Something went wrong. Please try again.");
  }
}

  }

  return (
    <div>
      <Card title="Sign Up" style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <Form
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Choose a strong password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  )
}

export default SignupPage
