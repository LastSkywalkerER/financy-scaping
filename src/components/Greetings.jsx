'use strict';

import React, {Suspense, useEffect, useState} from 'react';

const Table = ({data}) => data.map((element, i) => (
      <div key={i} className="row">
        <span>
          {i+1}
        </span>
        <span>
          {element.symbol}
        </span>
        <span>
          {element.sector}
        </span>
        <span>
          {element.price}
        </span>
        <span>
          {element.currency}
        </span>
      </div>
    ))

const Greetings = () => {  

  const [data, updateData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
    }

    getData();
  }, [])

  return (
    <div className="greetings">
      <Suspense fallback={<h1>Loading...</h1>}> 
        {data && <Table data={data}/>}
      </Suspense>
    </div>
    )
}

export default Greetings;