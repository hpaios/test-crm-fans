import { ChangeEvent, useState } from 'react'
import '../App.css'

const App = () => {

  const [name, setName] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleBlur = (): void => {
    localStorage.setItem('name', name)
  }

  return (
    <div className='app'>
      <label htmlFor="userName">Enter name:</label>
      <input type="text" id='userName' value={name} onChange={handleChange} onBlur={handleBlur}/>
      <button type='button' onClick={() => document.location.href = '/'}>Go home</button>
    </div>
  );
}

export default App;
