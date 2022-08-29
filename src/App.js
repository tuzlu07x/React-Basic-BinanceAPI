import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

function App() {
  const [bitcoins, setBitcoins] = useState([])

  window.onload = function () {
    setInterval(function () {
      axios.get('https://api.binance.com/api/v3/ticker/price')
        .then(response => {
          setBitcoins(response.data)
        })
    }, 1000)
  }

  let active = 1;
  let items = [];
  for (let i = 1; i <= 10; i++) {
    items.push(
      <Pagination.Item key={i} active={i === active}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div className='container py-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card text-center'>
            <div className='card-header text-info'>
              Binance Prices
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th className='text-warning' >Symbol</th>
                  <th >Price</th>
                </tr>
              </thead>
              {bitcoins.map(bitcoin => (
                <tbody>
                  <tr>
                    <th>{bitcoin.symbol.replace('BTC', '')}</th>
                    <th>{bitcoin.price}</th>
                  </tr>
                </tbody>
              ))}
            </table>
            {bitcoins.length != 0 &&
              < div >
                <Pagination>{items}</Pagination>
              </div>
            }
            {bitcoins.length === 0 &&
              <div className='container'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden" >Loading...</span>
                </Spinner>
              </div>
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
