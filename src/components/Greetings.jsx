'use strict';

import React, {Suspense, useEffect, useState} from 'react';

const Table = ({data}) => data.map((element, i) => (
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