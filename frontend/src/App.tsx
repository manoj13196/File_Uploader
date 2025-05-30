import { notificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import routerBindings from "@refinedev/react-router";
import { Outlet, Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { FoldersPage } from "./pages/folders";
import { FilesPage } from "./pages/files";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./components/header/AppLayout";

function App() {
  return (
    <Refine 
    routerProvider={routerBindings}
    notificationProvider={notificationProvider}
    // resources={[]}
    >

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/login'  element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route
        path="/"
        element={
          <Authenticated v3LegacyAuthProviderCompatible={true} key="auth">
          <AppLayout>
              <Outlet/>
           </AppLayout>
          </Authenticated>
        }
        >

<Route path="/folders" element={<FoldersPage />} />
<Route path="/folders/:id/files" element={<FilesPage />} />


        </Route>

        <Route path="*" element={<ErrorComponent/>}/>
      </Routes>

    </Refine>
  )
}

export default App;
