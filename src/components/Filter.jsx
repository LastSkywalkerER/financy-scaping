'use strict';

import React from 'react'
import FilledInput from '@mui/material/FilledInput';

export default function Filter({data, updateDataTable}) {
  let sectors = new Set();
  data.forEach(obj => sectors.add(obj.sector));

  const searchSector = (event) => {
    updateDataTable(data => ([...data.filter(elem => elem.sector.includes(event.target.value))]));
  };

  return (
    <div>
      <FilledInput
            onChange={searchSector}
            inputProps={{
              list: 'options',
              placeholder: 'Search sector'
            }}
          />
      <datalist id='options'>
        {[...sectors].map(sector => (<option key={sector} value={sector}></option>))}
      </datalist>
    </div>
  )
}
