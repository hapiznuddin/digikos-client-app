import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import DetailRoomPage from "./pages/landingPage/detailRoomPage.jsx";
import RentalApplicationPage from "./pages/landingPage/rentalApplicationPage.jsx";
import ProfilePage from "./pages/landingPage/userPage/profilePage.jsx";
// import ErrorPage from "./pages/errorPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/detailRoom/:id",
    element: <DetailRoomPage />,
  },
  {
    path: "/pengajuanSewa/:id",
    element: <RentalApplicationPage />,
  },
  {
    path: "/user/profil",
    element: <ProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
