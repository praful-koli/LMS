import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Courses from "./pages/student/Courses";
import Mylearning from "./pages/student/Mylearning";
import Profile from "./pages/student/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-learning",
        element: <Mylearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
