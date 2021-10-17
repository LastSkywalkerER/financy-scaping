'use strict';

import React, {Suspense, useEffect, useState} from 'react';
import EnhancedTable from '../../EnhancedTable';
import style from './style.module.sass';


const Analytics = () => {  

  const [data, updateData] = useState([]);
  const [selectedToBuy, setSelectedToBuy] = useState([]);
  const [selectedToDelete , setSelectedToDelete] = useState([]);
  const [purchasedToken, updatePurchasedToken] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
    };

    getData();
  }, []);

  const handleBuyClick = () => {
    updatePurchasedToken(tokens => {
      let newTokens = tokens.map(obj => obj.id);
      selectedToBuy.forEach(id => {
        if (newTokens.indexOf(id) === -1) {
          newTokens.push(id);
        }
      });

      return [...data.filter(obj => newTokens.indexOf(obj.id) !== -1).map(obj => ({...obj, buyPrice: null}))];
    });

    setSelectedToBuy([]);
  };

  const handleDeleteClick = () => {
    updatePurchasedToken(tokens => {
      const currentTokens = tokens.map(obj => obj.id).filter(id => selectedToDelete.indexOf(id) === -1);

      return [...data.filter(obj => currentTokens.indexOf(obj.id) !== -1)];
    });

    setSelectedToDelete([]);
  };

  const editRow = (id) => {
    let buyPrice = prompt('Цена покупки');
    while (isNaN(buyPrice)) {
      buyPrice = prompt('Цена покупки - число');
    }
    updatePurchasedToken(tokens => tokens.map(token => {
      if (token.id === id) {
        return {...token, buyPrice};
      }
      return token;
    }));
    console.log(purchasedToken);
  }

  return (
    <div className={style.wrapper}>

          <div className={style.table}>
            <Suspense fallback={<h1>Loading...</h1>}> 
              {!!data.length && <EnhancedTable 
                                  name='Stock Market'
                                  useSelection={[selectedToBuy, setSelectedToBuy]}
                                  handleCustomClick={handleBuyClick} 
                                  data={data}
                                  customClickPurpose='Buy'/>}
            </Suspense>
          </div>
          <div className={style.table}>
            <Suspense fallback={<h1>Loading...</h1>}> 
              {!!purchasedToken.length && <EnhancedTable 
                                      name='Purchaised Tokens'
                                      useSelection={[selectedToDelete , setSelectedToDelete]}
                                      handleCustomClick={handleDeleteClick}
                                      data={purchasedToken}
                                      customClickPurpose='Delete'
                                      editableRow
                                      editRow={editRow}/>}
            </Suspense>
          </div>

    </div>
    )
}

export default Analytics;