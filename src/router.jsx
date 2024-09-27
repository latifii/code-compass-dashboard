import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/IdentityLayout";
import Login, { loginAction } from "./features/Identity/components/login/Login";
import Register, {
  actionRegister,
} from "./features/Identity/components/register/Register";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Courses, { coursesLoader } from "./pages/Courses";
import CategoryCourse, { categoryLoader } from "./pages/CategoryCourse";
import CoursesDetail, {
  coursesDetailLoader,
} from "./features/courses/CoursesDetail";
import { CategoryProvider } from "./contexts/app/CategoriesContext";
import NotFound from "./pages/NotFound";
import UnhandledException from "./pages/UnhandledException";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        element: (
          <CategoryProvider>
            <CategoryCourse />
          </CategoryProvider>
        ),
        path: "course-category",
        loader: categoryLoader,
      },
      {
        element: <CoursesDetail />,
        path: "courses/:id",
        loader: coursesDetailLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: actionRegister,
        errorElement: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
