import ButtonPrimary from "../../../Elements/Button";

const HeroSection = () => {
  return (
    <main className="flex justify-between items-center w-full px-28 gap-28 mt-16">
      <div className="flex flex-col justify-center w-2/3 gap-11">
        <div className="flex flex-col justify-center">
          <h1 className="text-neutral-800 text-5xl font-bold">
            Selamat Datang
          </h1>
          <h1 className="text-neutral-800 text-5xl mt-4 font-bold">
            Hunian Kost Berkualitas dengan Fasilitas Lengkap
          </h1>
          <p className="text-neutral-600 text-3xl mt-8">
            Pesan Kamar Kost Sekarang, Rasakan Sensasi Berbeda Tinggal di Sini!
          </p>
        </div>
        <ButtonPrimary className="btn-lg w-2/5 text-lg">
          Lihat Kost 360°
        </ButtonPrimary>
      </div>
      <div className="flex justify-center items-center w-3/4">
        <img src="/img-cta.png" />
      </div>
    </main>
  );
};

export default HeroSection;
