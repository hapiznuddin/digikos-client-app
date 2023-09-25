import ButtonPrimary from "../../../Elements/Button";
import { motion } from "framer-motion";
import View360 from "./View360";

const HeroSection = () => {
  return (
    <>
      <main className="flex justify-between items-center w-full px-28 gap-28 mt-16">
        <div className="flex flex-col justify-center w-2/3 gap-11">
          <div className="flex flex-col justify-center">
            <motion.h1
              className="text-neutral-800 text-5xl font-bold"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              Selamat Datang
            </motion.h1>
            <motion.h1
              className="text-neutral-800 text-5xl mt-4 font-bold"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              Hunian Kost Berkualitas dengan Fasilitas Lengkap
            </motion.h1>
            <motion.p
              className="text-neutral-600 text-3xl mt-8"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              Pesan Kamar Kost Sekarang, Rasakan Sensasi Berbeda Tinggal di
              Sini!
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3, ease: "backInOut" }}
          >
            <ButtonPrimary
              className="btn-lg w-2/5 text-lg"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Lihat Kost 360°
            </ButtonPrimary>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center items-center w-3/4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
        >
          <img src="/img-cta.png" />
        </motion.div>
      </main>
      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box max-w-6xl h-full">
          <View360/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default HeroSection;
