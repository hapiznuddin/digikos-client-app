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
import RentHistoryPage from "./pages/landingPage/userPage/rentHistoryPage.jsx";
import DashboardUserPage from "./pages/dashboard/user/dashboardUserPage.jsx";
import HomeDashboardPage from "./pages/dashboard/admin/homeDashboardPage.jsx";
import PengajuanSewaPage from "./pages/dashboard/admin/pengajuanSewa/pengajuanSewaPage.jsx";
import DetailPengajuanSewaPage from "./pages/dashboard/admin/pengajuanSewa/detailPengajuanSewaPage.jsx";
import DataPenghuniPage from "./pages/dashboard/admin/dataPenghuni/dataPenghuniPage.jsx";
import DetailPenghuniPage from "./pages/dashboard/admin/dataPenghuni/detailPenghuniPage.jsx";
import DataTipeKamarPage from "./pages/dashboard/admin/dataTipeKamar/dataTipeKamarPage.jsx";
import DetailTipeKamarPage from "./pages/dashboard/admin/dataTipeKamar/detailTipeKamarPage.jsx";
import TambahTipeKamarPage from "./pages/dashboard/admin/dataTipeKamar/tambahTipeKamarPage.jsx";
import EditTipeKamarPage from "./pages/dashboard/admin/dataTipeKamar/editTipeKamarPage.jsx";
import DataKamarPage from "./pages/dashboard/admin/dataKamar/dataKamarPage.jsx";
import DetailKamarPage from "./pages/dashboard/admin/dataKamar/detailKamarPage.jsx";
import PengeluaranPage from "./pages/dashboard/admin/pengeluaran/pengeluaranPage.jsx";
import LaporanPage from "./pages/dashboard/admin/laporan/laporanPage.jsx";
import LaporanPDFPage from "./pages/dashboard/admin/laporan/laporanPDFPage.jsx";
import ManageAkunPage from "./pages/dashboard/admin/manageAkun/manageAkunPage.jsx";
import PesanMasukPage from "./pages/dashboard/admin/pesanMasuk/pesanMasukPage.jsx";
import PenghuniPage from "./pages/dashboard/user/dataPenghuni/penghuniPage.jsx";
import KirimPesanPage from "./pages/dashboard/user/kirimPesan/kirimPesanPage.jsx";
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

  // * Route Landing Page
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
  {
    path: "/user/riwayatPengajuanSewa",
    element: <RentHistoryPage />,
  },


  // * Route Dashboard Admin
  {
    path: "/admin/dashboard",
    element: <HomeDashboardPage />,
  },
  {
    path: "/admin/dashboard/pengajuansewa",
    element: <PengajuanSewaPage />,
  },
  {
    path: "/admin/dashboard/pengajuansewa/detail/:id",
    element: <DetailPengajuanSewaPage />,
  },
  {
    path: "/admin/dashboard/dataPenghuni",
    element: <DataPenghuniPage />,
  },
  {
    path: "/admin/dashboard/dataPenghuni/detail/:id",
    element: <DetailPenghuniPage />,
  },
  {
    path: "/admin/dashboard/dataTipeKamar",
    element: <DataTipeKamarPage />,
  },
  {
    path: "/admin/dashboard/dataTipeKamar/tambahKamar",
    element: <TambahTipeKamarPage />,
  },
  {
    path: "/admin/dashboard/dataTipeKamar/detail/:id",
    element: <DetailTipeKamarPage />,
  },
  {
    path: "/admin/dashboard/dataTipeKamar/detail/edit/:id",
    element: <EditTipeKamarPage />,
  },
  {
    path: "/admin/dashboard/dataKamar",
    element: <DataKamarPage />,
  },
  {
    path: "/admin/dashboard/dataKamar/detail/:id",
    element: <DetailKamarPage />,
  },
  {
    path: "/admin/dashboard/pengeluaran",
    element: <PengeluaranPage/>,
  },
  {
    path: "/admin/dashboard/laporan",
    element: <LaporanPage/>,
  },
  {
    path: "/admin/dashboard/laporan/print/:id",
    element: <LaporanPDFPage/>,
  },
  {
    path: "/admin/dashboard/manageAkun",
    element: <ManageAkunPage/>,
  },
  {
    path: "/admin/dashboard/pesan",
    element: <PesanMasukPage/>,
  },


  // * Route Dashboard User
  {
    path: "/user/dashboard/:id",
    element: <DashboardUserPage />,
  },
  {
    path: "/user/dashboard/penghuni/:id",
    element: <PenghuniPage />,
  },
  {
    path: "/user/dashboard/pesan/:id",
    element: <KirimPesanPage />,
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
