'use strict';

import React, {Suspense, useEffect, useState} from 'react';
import EnhancedTable from './EnhancedTable';
import FilledInput from '@mui/material/FilledInput';


const Greetings = () => {  

  const [data, updateData] = useState([]);
  const [dataTable, updateDataTable] = useState({header: [], body: [], sectors: []});

  const createTable = (rows) => {
    let columns = [],
        sectors = [];

    for (let key in rows[0]) {
      columns.push(key);
    }

    rows.forEach(({sector}) => {
      if (!Boolean(sectors.indexOf(sector)+1)) {
        sectors.push(sector);
      }
    });
    updateDataTable({
      header: columns,
      body: rows,
      sectors
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
      body: [...data.filter(elem => elem.sector.includes(event.target.value))],
      sectors: dataTable.sectors
    }));
  };

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
        {dataTable.sectors.map(sector => (<option key={sector} value={sector}></option>))}
      </datalist>
      
      <Suspense fallback={<h1 style={{color: 'white'}} >Loading...</h1>}> 
        {dataTable.header.length && <EnhancedTable dataTable={dataTable}/>}
      </Suspense>
      
    </div>
    )
}

export default Greetings;