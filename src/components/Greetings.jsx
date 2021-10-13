'use strict';

import React, {Suspense, useEffect, useState} from 'react';
import EnhancedTable from './EnhancedTable';
import { ContextData, ContextSelected } from "./Context";


const Greetings = () => {  

  const [data, updateData] = useState([]);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
    };

    getData();
  }, []);

  console.log(selected);

  return (
    <div className="greetings">
      <ContextData.Provider value={data}>
        <ContextSelected.Provider value={[selected, setSelected]}>
        
          <Suspense fallback={<h1 style={{color: 'white'}} >Loading...</h1>}> 
            {data.length && <EnhancedTable data={data}/>}
          </Suspense>
        </ContextSelected.Provider>
      </ContextData.Provider>
    </div>
    )
}

export default Greetings;