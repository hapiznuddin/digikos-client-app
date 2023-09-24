import { RiMenu3Fill } from "react-icons/ri"
import ButtonPrimary from "../../Elements/Button"

const Navbar = () => {
  return(
    <div className="navbar lg:px-[150px] mt-3">
      <div className="navbar-start">
        <div className=" flex justify-betwee w-full">
          <img src="/digikos.png" className="w-24 aspect-auto lg:w-[120px]" />
        </div>
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px- text-neutral-800 font-medium">
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Beranda</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Fasilitas</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Kamar</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Kontak</a>
          </li>
          {/* <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
      <div className="dropdown navbar-end text-right">
        <div className="justify-end gap-1 w-full hidden md:flex">
          <ButtonPrimary className="w-1/3 lg:w-1/4 bg-primary-50 text-primary-500 shadow-none hover:bg-primary-100 active:bg-primary-100">
            Login
          </ButtonPrimary>
          <ButtonPrimary className="w-1/3 lg:w-1/4 shadow-none">Daftar</ButtonPrimary>
        </div>
        <label tabIndex={0} className="btn btn-ghost md:hidden">
          <RiMenu3Fill size={24} />
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-25 rounded-box w-52"
        >
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Beranda</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Fasilitas</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Kamar</a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">Kontak</a>
          </li>
          <div className="flex justify-between gap-1 w-full mt-4">
            <ButtonPrimary className="w-[90px] text-xs btn-sm bg-primary-50 text-primary-500 shadow-none hover:bg-primary-100 active:bg-primary-100">
              Login
            </ButtonPrimary>
            <ButtonPrimary className="w-[90px] text-xs btn-sm shadow-none">
              Daftar
            </ButtonPrimary>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar