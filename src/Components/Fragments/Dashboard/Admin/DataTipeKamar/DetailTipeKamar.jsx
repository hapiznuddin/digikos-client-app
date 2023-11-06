/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import AdminLayout from "../../../../Layouts/DashboardLayout/DashboardAdmin/Layout";
import Cookies from "js-cookie";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { useGetDetailTipeKamar } from "../../../../../services/dashboard/admin/dataTipeKamar/useGetDetailTipeKamar";
import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../../Elements/Button";
import EditGambarKamar from "./EditGambarKamar";
import { useDeleteTipekamar } from "../../../../../services/dashboard/admin/dataTipeKamar/useDataTipekamar";
import Swal from "sweetalert2";

const DetailTipeKamar = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const id = ref.current;
  const idParams = parseInt(id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { data } = useGetDetailTipeKamar({
    token,
    id,
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const imgRoom1 =
    import.meta.env.VITE_DIGIKOS_URL + data?.data.images[0]?.path;
  const imgRoom2 =
    import.meta.env.VITE_DIGIKOS_URL + data?.data.images[1]?.path;
  const imgRoom3 =
    import.meta.env.VITE_DIGIKOS_URL + data?.data.images[2]?.path;

  const facilities = () => {
    return data?.data.facility.map((facility) => {
      const facilityArray = [];
      if (facility.ac === 1) {
        facilityArray.push("AC");
      }
      if (facility.kasur === 1) {
        facilityArray.push("Kasur");
      }
      if (facility.lemari === 1) {
        facilityArray.push("Lemari");
      }
      if (facility.meja === 1) {
        facilityArray.push("Meja");
      }
      if (facility.wifi === 1) {
        facilityArray.push("Wifi");
      }
      if (facility.km_luar === 1) {
        facilityArray.push("Kamar Mandi Luar");
      }
      if (facility.km_dalam === 1) {
        facilityArray.push("Kamar Mandi Dalam");
      }
      return facilityArray.join(", ");
    });
  };

  const { mutate } = useDeleteTipekamar({
    token,
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Tipe Kamar Berhasil Dihapus",
        icon: "success",
        timer: 1500,
      }).then(() => {
        navigate("/admin/dashboard/dataTipeKamar");
      });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  return (
    <AdminLayout title="Detail Tipe Kamar" routeParams={idParams}>
      <div className="flex flex-col w-full h-full p-8 gap-8 bg-neutral-25 rounded-2xl border border-neutral-100 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-2/5">
            <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
              Data Tipe Kamar
            </h1>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Nama Kamar</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_name}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Fasilitas</p>
                  <p className="w-2/3">: {facilities()}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Ukuran</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_size}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Harga</p>
                  <p className="w-2/3">: {data?.data.classroom?.room_price}</p>
                </>
              )}
            </div>
            <div className="flex w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <Skeleton height="25px" w={"300px"} />
              ) : (
                <>
                  <p className="w-1/3 lg:w-40">Deposit</p>
                  <p className="w-2/3">
                    : {data?.data.classroom?.room_deposite}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full font-medium text-sm md:text-base">
              {isLoading ? (
                <>
                  <Skeleton height="25px" w={"200px"} />
                  <SkeletonText noOfLines={8} w={"400px"} />
                </>
              ) : (
                <>
                  <div className="flex">
                    <p className="w-1/3 lg:w-40">Deskripsi</p>
                    <p>:</p>
                  </div>
                  <p className="text-xs md:text-sm w-full">
                    {data?.data.classroom?.room_description}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-4 my-8">
              <ButtonPrimary className="btn btn-sm md:btn-md w-1/2 h-full font-medium text-xs md:text-sm bg-error-600 hover:bg-error-700 active:bg-error-800"
                onClick={() => mutate({id:idParams})}
              >
                Hapus Data Kamar
              </ButtonPrimary>
              <ButtonPrimary
                className="btn btn-sm md:btn-md w-1/2 h-full font-medium text-xs md:text-sm"
                onClick={() =>
                  navigate(
                    `/admin/dashboard/dataTipeKamar/detail/edit/${idParams}`
                  )
                }
              >
                Edit Data Kamar
              </ButtonPrimary>
            </div>
          </div>

          {/* GAMBAR Tipe Kamar */}
          <div className="flex flex-col gap-4 w-full lg:w-3/5 ">
            <div className="flex flex-col md:flex-row w-full justify-between md:items-center">
              <h1 className="text-neutral-800 mb-2 text-lg md:text-xl font-semibold">
                Gambar Tipe Kamar
              </h1>
              <ButtonPrimary
                className="btn btn-sm md:btn-md w-40 font-medium text-sm"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Edit Gambar
              </ButtonPrimary>
            </div>
            <div className="flex flex-col w-full gap-4 p-4 rounded-2xl border border-neutral-200">
              <div className="w-full h-96 bg-neutral-300 rounded-xl">
                {isLoading ? (
                  <Skeleton
                    className="w-full h-full"
                    style={{ borderRadius: "16px" }}
                  />
                ) : data?.data.images[1]?.path === undefined ? (
                  <div className="flex w-full h-full rounded-xl bg-neutral-300 justify-center items-center">
                    <p>Untuk menambahkan gamabr silahkan klik Edit Gambar</p>
                  </div>
                ) : (
                  <Link
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <img
                      src={imgRoom1}
                      className="w-full h-full rounded-xl object-cover object-center"
                    />
                  </Link>
                )}
              </div>
              <div className="flex w-full gap-4">
                <div className="w-1/2 h-48 bg-neutral-300 rounded-xl">
                  {isLoading ? (
                    <Skeleton
                      className="w-full h-full"
                      style={{ borderRadius: "16px" }}
                    />
                  ) : data?.data.images[1]?.path === undefined ? (
                    <div className="w-full h-full rounded-xl bg-neutral-300" />
                  ) : (
                    <Link
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <img
                        src={imgRoom2}
                        className="w-full h-full rounded-xl object-cover object-center"
                      />
                    </Link>
                  )}
                </div>
                <div className="w-1/2 h-48 bg-neutral-300 rounded-xl relative ">
                  {isLoading ? (
                    <Skeleton
                      className="w-full h-full"
                      style={{ borderRadius: "16px" }}
                    />
                  ) : data?.data.images[2]?.path === undefined ? (
                    <div className="w-full h-full rounded-xl bg-neutral-300">
                      <Link
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        <div className="absolute bottom-4 right-4 bg-neutral-25 py-1 px-1 md:px-3 rounded-full text-xs text-center md:text-base shadow-md font-medium">
                          Lihat Gambar
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <img
                        src={imgRoom3}
                        className="w-full h-full rounded-xl object-cover object-center"
                      />
                      <div className="absolute bottom-4 right-4 bg-neutral-25 py-1 px-1 md:px-3 rounded-full text-xs text-center md:text-base shadow-md font-medium">
                        Lihat Gambar
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //* popup dialog galeri */}
        <dialog id="my_modal_3" className="modal mx-auto">
          <div className="modal-box h-[70%] md:h-full md:max-w-screen-xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <AiOutlineClose size={24} />
              </button>
            </form>
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              }}
              spaceBetween={16}
              navigation={true}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 mt-2 w-full h-[80%] md:h-[640px]"
            >
              {data?.data.images.map((image, index) => {
                const imagePath = `${import.meta.env.VITE_DIGIKOS_URL}${
                  image.path
                }`;
                return (
                  <SwiperSlide className=" md:px-10" key={index}>
                    <img
                      src={imagePath}
                      className="w-full h-full md:h-full aspect-video object-cover object-bottom rounded-xl"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onClick={setThumbsSwiper}
              spaceBetween={16}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-4 w-full h-20 md:h-32 px-10"
            >
              {data?.data.images.map((image, index) => {
                const imagePath = `${import.meta.env.VITE_DIGIKOS_URL}${
                  image.path
                }`;
                return (
                  <SwiperSlide key={index}>
                    <img
                      src={imagePath}
                      className={`w-full h-full aspect-video object-cover object-bottom rounded-xl ${
                        activeSlide === index ? "opacity-100" : "opacity-40"
                      }`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </dialog>

        <dialog id="my_modal_4" className="modal mx-auto">
          <div className="modal-box h-[70%] md:h-full md:max-w-screen-xl py-12 px-8 -z-10">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <AiOutlineClose size={24} />
              </button>
            </form>
            <EditGambarKamar id={id} />
          </div>
        </dialog>
      </div>
    </AdminLayout>
  );
});

export default DetailTipeKamar;
