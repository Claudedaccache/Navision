import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUserContext } from "./context/userContext";
import Layout from "./container/Layout";
import LogIn from "./components/Login.tsx";
import Home from "./pages/Home.tsx";
import Activity from "./pages/Activity.tsx";
import Profile from "./pages/Profile.tsx";
import Notes from "./pages/Notes.tsx";
import DaysOff from "./pages/DaysOff.tsx";

type ProtectedRouteProps = {
  token: string | null;
  children: React.ReactNode;
};
const ProtectedRoute = ({ token, children }: ProtectedRouteProps) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const { token } = useUserContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LogIn /> },
        {
          path: "/home",
          element: (
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute token={token}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/activité",
          element: (
            <ProtectedRoute token={token}>
              <Activity />
            </ProtectedRoute>
          ),
        },
        {
          path: "/note-de-frais",
          element: (
            <ProtectedRoute token={token}>
              <Notes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/demandes-des-congés",
          element: (
            <ProtectedRoute token={token}>
              <DaysOff />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
