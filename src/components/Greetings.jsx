'use strict';

import React, {Suspense, useEffect, useState} from 'react';
import EnhancedTable from './EnhancedTable';
import FilledInput from '@mui/material/FilledInput';


const Greetings = () => {  

  const [data, updateData] = useState([]);
  const [dataTable, updateDataTable] = useState({header: [], body: []});

  const createTable = (rows) => {
    let columns = [];

    for (let key in rows[0]) {
      columns.push(key);
    }

    updateDataTable({
      header: columns,
      body: rows
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
      createTable(json);
    };

    getData();
  }, []);


  const searchSector = (event) => {
    updateDataTable(dataTable => ({
      header: dataTable.header,
      body: [...data.filter(elem => elem.sector.includes(event.target.value))]
    }));
  }

  return (
    <div className="greetings">
      <FilledInput
            onChange={searchSector}
            inputProps={{
              list: 'options',
              placeholder: 'Search sector'
            }}
          />
      <datalist id='options'>
        <option value="IT"></option>
        <option value="Интернет"></option>
        <option value="Банки"></option>
        <option value="Финансы"></option>
        <option value="Здоровье"></option>
        <option value="Энергетика"></option>
      </datalist>
      
      <Suspense fallback={<h1 style={{color: 'white'}} >Loading...</h1>}> 
        {dataTable.header.length && <EnhancedTable dataTable={dataTable}/>}
      </Suspense>
      
    </div>
    )
}

export default Greetings;