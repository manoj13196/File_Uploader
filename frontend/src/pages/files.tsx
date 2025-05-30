// src/pages/files.tsx

import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Upload,
  Button,
  message,
  Popconfirm,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

type FileItem = {
  id: number;
  filename: string;
  cloudinaryUrl: string;
};

export const FilesPage: React.FC = () => {
  const { id } = useParams(); // folder ID from URL
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/folders/${id}/files`, {
        withCredentials: true,
      });
      setFiles(res.data);

    } catch {
      message.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [id]);

  // Delete file
  const onDelete = async (fileId: number) => {
    try {
      await axios.delete(`http://localhost:3000/folders/${id}/files/${fileId}`, {
        withCredentials: true,
      });
      message.success("File deleted");
      fetchFiles();
    } catch {
      message.error("Failed to delete file");
    }
  };

  // Upload file
  const props = {
    name: "file",
    action: `http://localhost:3000/folders/${id}/files/upload`,
    withCredentials: true,
    onChange(info: any) {
      if (info.file.status === "done") {
        message.success("File uploaded");
        fetchFiles();
      } else if (info.file.status === "error") {
        message.error("Upload failed");
      }
    },
  };

  return (
    <Card
      title={`Files in Folder ${id}`}
      extra={
        <Upload {...props} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      }
    >
      <List
        loading={loading}
        dataSource={files}
        renderItem={(file) => (
          <List.Item
            actions={[
              <a href={file.cloudinaryUrl} target="_blank" rel="noreferrer">
                View
              </a>,
              <Popconfirm
                title="Delete this file?"
                onConfirm={() => onDelete(file.id)}
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <Typography.Text>{file.filename}</Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  );
};
