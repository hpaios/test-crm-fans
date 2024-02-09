import { useContext } from 'react'
import { UserNameContext } from '..'
import '../App.css'

const App = () => {

  const userName:React.Context<any> = useContext(UserNameContext);

  const handleLogoutClick = ():void => {
    localStorage.removeItem('name')
    document.location.href = '/'
  }

  return (
    <div className='app'>
      <h1>Hello {userName}!</h1>
      <button type='button' onClick={() => document.location.href = '/'}>Go home</button>
      <button type='button' onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default App;
