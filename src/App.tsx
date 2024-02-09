import { useContext } from 'react';

import './App.css';
import { UserNameContext } from '.'

const App = () => {

  const userName: React.Context<any> = useContext(UserNameContext);

  const handleLoginClick = (): void => {
    document.location.href = '/login'
  }

  const handleUserClick = (): void => {
    document.location.href = '/user'
  }

   return (
    <div className='app'>
     <h1>Welcome <b>{userName} </b>!</h1>
     <button type='button' onClick={handleLoginClick}>go to Login page</button>
     <button type='button' onClick={handleUserClick}>go to User page</button>
    </div>
  );
}

export default App;
