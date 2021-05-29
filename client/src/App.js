import React from 'react'
import './App.css';
import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div className="App">
        <Routes />
      </div>
      
      <footer class="footer">
        <p class="copyright">&copy; Copyright - 2020/2021 Ori Lalo - All Rights Reserved. </p>
      </footer>
    </>

  );
}

export default App;
