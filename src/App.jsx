import ButtonPrimary from "./Components/Elements/Button"
import Input from "./Components/Elements/Input/Input"


function App() {

  return (
    <div className='w-full p-2 text-center flex flex-col gap-3'>
      <h1 className='text-3xl font bold text-primary-600'>Vite + React</h1>
      <Input/>
      <ButtonPrimary className='w-full text- font-semibold'>Submit</ButtonPrimary>
    </div>
  )
}

export default App
