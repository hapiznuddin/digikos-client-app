import ButtonPrimary from "../../../../Elements/Button";
import TextAreaField from "../../../../Elements/TextArea/TextAreaField";
import { useFormik } from "formik";

const RatingRoomSection = () => {
  const handleForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  }

  const formik = useFormik({
    initialValues: {
      rating: 0,
      testimoni: "",
    },
    onSubmit: async () => {
    
    },
    onReset: () => {
      formik.setValues({
        rating: 0,
        testimoni: "",
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
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="2"
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="3"
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="4"
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
            <input
              type="radio"
              name="rating"
              value="5"
              className="mask mask-star-2 bg-secondary-500"
              onChange={handleForm}
            />
          </div>
          <TextAreaField
            label={"Testimoni"}
            name="testimoni"
            classNameLabel="md:text-base"
            placeholder="Masukkan testimoni"
            value={formik.values.testimoni}
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
