import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../Elements/Button";
import { motion } from "framer-motion";

const ErrorSection = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full px-4 gap-10 mt-4 
        md:px-10 md:gap-4 md:mt-8
        lg:px-28 lg:gap-12 lg:mt-20 ">
        <div className="flex flex-col justify-center w-full md:w-1/2 gap-4 md:gap-4 lg:gap-12">
          <div className="flex flex-col justify-center">
            <motion.h1
              className="text-neutral-800 text-3xl md:text-5xl lg:text-8xl font-bold"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              404 :
            </motion.h1>
            <motion.h1
              className="text-neutral-800 text-2xl mt-2 md:text-2xl md:mt-2 lg:text-5xl lg:mt-4 font-bold"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              Oops.. Maaf
            </motion.h1>
            <motion.h1
              className="text-neutral-800 text-2xl mt-2 md:text-2xl md:mt-2 lg:text-5xl lg:mt-4 font-bold"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              Halaman tidak ditemukan
            </motion.h1>
            <motion.p
              className="text-neutral-600 text-lg mt-4 md:text-lg md:mt-2 lg:text-3xl lg:mt-8"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              Silahkan kembali ke halaman utama
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3, ease: "backInOut" }}
          >
            <ButtonPrimary
              className="w-1/3 text-xs lg:btn-lg lg:w-2/5 lg:text-lg"
              onClick={() => navigate("/")}
            >
              Halaman Utama
            </ButtonPrimary>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center items-center w-full md:mx-auto md:w-1/2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
        >
          <img src="/bg-error.webp" className="w-full bg-cover" />
        </motion.div>
      </main>
  )
}

export default ErrorSection