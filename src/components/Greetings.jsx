'use strict';

import React, {Suspense, useEffect, useState} from 'react';



const Greetings = () => {  

  const [data, updateData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
    };

    getData();
  }, []);

  const sortColumn = (event) => {
    const clickedText = event.nativeEvent.target.textContent;

    const compareFunction = (a, b) => {
      if (!isNaN(parseInt(a[clickedText])) && (parseInt(a[clickedText]) < parseInt(b[clickedText]))) {
        return -1;
      }
      if (!isNaN(parseInt(b[clickedText])) && (parseInt(a[clickedText]) > parseInt(b[clickedText]))) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    };

    updateData(data => [...data.sort(compareFunction)]);
  };

  const Table = () => {
  
    return (
      <>
      <div className="row">
        <span>
          №
        </span>
      {Object.keys(data[0]).map(key => (
        <span style={{cursor: 'pointer', backgroundColor: 'gray'}} onClick={sortColumn} key={key}>
          {key}
        </span>
      ))}
      </div>
    
      {data.map((element, i) => (
        <div key={i} className="row">
          <span>
            {i+1}
          </span>
          {
            (() => {
              let row = [];
  
              for (let key in element) {
  
                row.push(<span key={key}>
                  {element[key]}
                </span>);
  
                
              }
  
              return row;
            })()
          }
        </div>
      ))}
      </>
      )}

  return (
    <div className="greetings">
      <input type="text" list='options'/>
      <datalist id='options'>
        <option value="IT"></option>
        <option value="Интернет"></option>
        <option value="Банки"></option>
        <option value="Финансы"></option>
        <option value="Здоровье"></option>
        <option value="Энергетика"></option>
      </datalist>
      <Suspense fallback={<h1 style={{color: 'white'}} >Loading...</h1>}> 
        {data.length && <Table/>}
      </Suspense>
    </div>
    )
}

export default Greetings;