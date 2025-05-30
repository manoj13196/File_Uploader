// src/pages/folders.tsx

import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Button,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
  Typography,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ⬅️ NEW

type Folder = {
  id: number;
  name: string;
};

export const FoldersPage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate(); // ⬅️ NEW

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}folders`, {
        withCredentials: true,
      });
      setFolders(res.data);
    } catch (err) {
      message.error("Failed to load folders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const onCreate = async (values: { name: string }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}folders`, values, {
        withCredentials: true,
      });
      message.success("Folder created");
      setIsModalOpen(false);
      fetchFolders();
    } catch (err) {
      message.error("Failed to create folder");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/folders/${id}`, {
        withCredentials: true,
      });
      message.success("Folder deleted");
      fetchFolders();
    } catch (err) {
      message.error("Failed to delete folder");
    }
  };

  return (
    <Card
      title="Your Folders"
      extra={
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + New Folder
        </Button>
      }
    >
      <List
        loading={loading}
        dataSource={folders}
        renderItem={(folder) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => onDelete(folder.id)}
              >
                <Button danger type="link">
                  Delete
                </Button>
              </Popconfirm>,
            ]}
            onClick={() => navigate(`/folders/${folder.id}/files`)} // ⬅️ NEW
            style={{ cursor: "pointer" }} // ⬅️ Optional: show pointer
          >
            <Typography.Text strong>{folder.name}</Typography.Text>
          </List.Item>
        )}
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Create Folder"
      >
        <Form onFinish={onCreate} layout="vertical">
          <Form.Item
            label="Folder Name"
            name="name"
            rules={[{ required: true, message: "Folder name required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
