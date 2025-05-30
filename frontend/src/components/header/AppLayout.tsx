import React from "react";
import {
  Layout,
  Menu,
  Typography,
  Button,
  Space,
  Avatar,
  message,
} from "antd";
import {
  FolderOpenOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useGetIdentity, useLogout, useGo } from "@refinedev/core";
import { useLocation } from "react-router";
import {authProvider} from "../../providers/auth_provider"

const { Header, Content, Sider } = Layout;

// type LogoutResponse = {
//   success: boolean;
//   redirectTo?: string;
// };

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { data: user } = useGetIdentity<{ email: string }>();
  const { mutateAsync: logout } = useLogout();
  const go = useGo();
  const location = useLocation();

  const selectedKey = location.pathname.startsWith("/folders") ? "folders" : "home";

//   const handleLogout = async () => {
//     try {
//       const result = await logout();
//       if (result?.success) {
//         go({ to: "/login" });
//       } else {
//         message.error("Logout failed");
//       }
//     } catch (error) {
//       message.error("Logout error");
//       console.error("Logout error:", error);
//     }
//   };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <div style={{ padding: "1rem", fontWeight: "bold" }}>📁 Uploader</div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key === "home") go({ to: "/" });
            else if (key === "folders") go({ to: "/folders" });
          }}
          items={[
            { key: "home", icon: <HomeOutlined />, label: "Home" },
            { key: "folders", icon: <FolderOpenOutlined />, label: "My Folders" },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            File Uploader
          </Typography.Title>

          <Space>
            {user && (
              <>
                <Avatar>{user.email[0].toUpperCase()}</Avatar>
                <Typography.Text>{user.email}</Typography.Text>
              </>
            )}
            <Button
              icon={<LogoutOutlined />}
              onClick={()=>{authProvider.logout; go({to:"/login"})}}
              danger
              type="primary"
            >
              Logout
            </Button>
          </Space>
        </Header>

        <Content style={{ margin: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
