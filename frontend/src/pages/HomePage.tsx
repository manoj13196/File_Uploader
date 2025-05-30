// src/pages/home.tsx

import { Button, Card, Typography } from "antd";
import { useGo, useGetIdentity } from "@refinedev/core";

export const HomePage: React.FC = () => {
  const go = useGo();
  const { data: user } = useGetIdentity();

  if (user) {
    go({ to: "/folders", type: "replace" });
    return null;
  }

  return (
    <Card
      style={{
        maxWidth: 500,
        margin: "100px auto",
        padding: 24,
        textAlign: "center",
      }}
    >
      <Typography.Title>Welcome to File Uploader</Typography.Title>
      <Typography.Paragraph>
        A simple file storage app with folders and uploads.
      </Typography.Paragraph>

      <Button
        type="primary"
        block
        style={{ marginTop: 16 }}
        onClick={() => go({ to: "/login" })}
      >
        Login
      </Button>
      <Button
        block
        style={{ marginTop: 8 }}
        onClick={() => go({ to: "/signup" })}
      >
        Sign Up
      </Button>
    </Card>
  );
};
