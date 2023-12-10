import Cookies from "js-cookie";
import ButtonPrimary from "../../../../Elements/Button";
import TextAreaField from "../../../../Elements/TextArea/TextAreaField";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { axiosInstance } from "../../../../../lib/axios";
import Swal from "sweetalert2";

const RatingRoomSection = ({ id }) => {
  RatingRoomSection.propTypes = {
    id: PropTypes.string,
  }
  const token = Cookies.get("token");

  const {data} = useQuery({
    queryKey: ["getIdRent"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.get(`/rentByUserId?user_id=${id}`, { headers });
      return res;
    }
  })

  const {mutate} = useMutation({
    mutationFn: async (body) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axiosInstance.post(`/testimonial`, body, { headers });
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      formik.handleReset();
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil Memberikan Review",
        icon: "success",
        timer: 1500,
      })
      formik.setValues({
        rating: 1,
        review: "",
      });
    },
    onError: (data) => {
      console.log(data);
      Swal.fire({
        title: "Gagal",
        text: "Gagal Memberikan Review, Silahkan Coba Lagi",
        icon: "error",
        timer: 1500,
      })
    }
  })
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  }

  const formik = useFormik({
    initialValues: {
      rating: 1,
      review: "",
    },
    onSubmit: async () => {
    mutate({
      user_id: id,
      rent_id: data?.data.id,
      rating: formik.values.rating,
      review: formik.values.review,
    })
    },
    onReset: () => {
      formik.setValues({
        rating: 1,
        review: "",
      });
    }
  })


  return (
    <div className="flex flex-col w-full justify-center items-center gap-8 lg:px-8">
      <h1 className="text-neutral-800 text-xl lg:text-2xl font-semibold">
        Rating Kamar
      </h1>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-8">
          <div className="rating rating-lg gap-4 flex justify-center">
            <input
              type="radio"
              name="rating"
              value="1"
              checked={formik.values.rating == 1}
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="2"
              checked={formik.values.rating == 2}
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="3"
              checked={formik.values.rating == 3}
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="4"
              checked={formik.values.rating == 4}
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="5"
              checked={formik.values.rating == 5}
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
          </div>
          <TextAreaField
            label={"Testimoni"}
            name="review"
            classNameLabel="md:text-base"
            placeholder="Masukkan testimoni"
            value={formik.values.review}
            onChange={handleForm}
          />
          <div className="flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row w-full justify-between">
            <ButtonPrimary className="w-full lg:w-[48%] text-lg font-medium bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 active:text-neutral-25 active:bg-primary-300"
            type="reset" onClick={formik.handleReset}
            >
              Batal
            </ButtonPrimary>
            <ButtonPrimary
              className="w-full lg:w-[48%]  text-lg font-medium"
              type='submit'
              // onClick={() => {
              //   formik.handleSubmit();
              // }}
            >
              {/* {profileIsLoading ? (
                <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Simpan"
                )} */}
              Simpan
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RatingRoomSection;
