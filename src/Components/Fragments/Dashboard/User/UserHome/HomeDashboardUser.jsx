/* eslint-disable react/display-name */
import { forwardRef } from "react"
import UserLayout from "../../../../Layouts/DashboardLayout/DashboardUser/Layout";
import FormProfileSection from "./FormProfileSection";
import RatingRoomSection from "./RatingRoomSection";
import ChangePasswordSection from "./ChangePasswordSection";

const HomeDashboardUser = forwardRef((props, ref) => {
  const id = ref;
  return (
    <UserLayout title={"Dashboard User"}>
      <div className="flex flex-col lg:flex-row w-full gap-8">
        <div className="flex flex-col items-center w-full h-full lg:w-1/2 gap-4 px-4 md:px-8 py-12 rounded-3xl bg-neutral-25 shadow-lg border border-neutral-100">
          <FormProfileSection />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-8">
          <div className="flex flex-col w-full items-center gap-8 px-4 md:px-8 py-12 rounded-3xl bg-neutral-25 shadow-lg border border-neutral-100">
            <RatingRoomSection/>
          </div>
          <div className="flex flex-col w-full h-full items-center gap-8 px-4 md:px-8 py-12 rounded-3xl bg-neutral-25 shadow-lg border border-neutral-100">
          <ChangePasswordSection/>
          </div>
        </div>
      </div>
    </UserLayout>
  );
})

export default HomeDashboardUser