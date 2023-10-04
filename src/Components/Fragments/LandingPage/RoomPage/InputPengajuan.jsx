import InputField from "../../../Elements/Input"
import SelectOption from "../../../Elements/Select/SelectOption"

const InputPengajuan = () => {
  return (
    <>
    <div className="hidden lg:sticky lg:top-28 lg:flex lg:flex-col gap-6 w-2/5 h-full bg-neutral-25 shadow-lg rounded-3xl border border-neutral-100 p-4">
      <div className="flex items-end">
        <p className="text-neutral-800 text-3xl font-bold">Rp 1.000.000</p>
        <p className="text-neutral-800 text-xl font-medium">/bulan</p>
      </div>
        <form>
      <div className="flex flex-col w-full gap-4">
          <InputField type="date" label="Mulai Kost" classNameLabel="md:text-base"/>
          <SelectOption label="Jangka Pembayaran" classNameLabel="md:text-base"/>
      </div>
        </form>
    </div>
    <div className="btm-nav h-32 lg:hidden bg-primary-100"></div>
    </>
  )
}

export default InputPengajuan