import React, { Suspense, useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import Token from '@core/models/Token';

const Analytics = () => {
  const [data, updateData] = useState([]);
  const [selectedToBuy, setSelectedToBuy] = useState([]);
  const [selectedToDelete, setSelectedToDelete] = useState([] as number[]);
  const [purchasedToken, updatePurchasedToken] = useState([] as Token[]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../static/db/table.json');
      const json = await response.json();
      updateData(json);
    };

    getData();
  }, []);

  const handleBuyClick = () => {
    updatePurchasedToken((tokens: Token[]) => {
      let newTokens = tokens.map((obj: Token) => obj.id);
      selectedToBuy.forEach((id) => {
        if (newTokens.indexOf(id) === -1) {
          newTokens.push(id);
        }
      });

      return [
        ...data
          .filter((obj: Token) => newTokens.indexOf(obj.id) !== -1)
          .map((obj: Token) => ({ ...obj, buyPrice: null })),
      ];
    });

    setSelectedToBuy([]);
  };

  const handleDeleteClick = () => {
    updatePurchasedToken((tokens: Token[]) => {
      const currentTokens = tokens
        .map((obj: Token) => obj.id)
        .filter((id: number) => selectedToDelete.indexOf(id) === -1);

      return [
        ...data.filter((obj: Token) => currentTokens.indexOf(obj.id) !== -1),
      ];
    });

    setSelectedToDelete([]);
  };

  const editRow = (id: number) => {
    let buyPrice = prompt('Цена покупки');
    while (buyPrice && isNaN(Number(buyPrice))) {
      buyPrice = prompt('Цена покупки - число');
    }
    updatePurchasedToken((tokens) =>
      tokens.map((Token) => {
        if (Token.id === id) {
          return { ...Token, buyPrice };
        }
        return Token;
      }),
    );
    console.log(purchasedToken);
  };

  return (
    <div>
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          {!!data.length && (
            <EnhancedTable
              name="Stock Market"
              useSelection={[selectedToBuy, setSelectedToBuy]}
              handleCustomClick={handleBuyClick}
              data={data}
              customClickPurpose="Buy"
            />
          )}
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          {!!purchasedToken.length && (
            <EnhancedTable
              name="Purchaised Tokens"
              useSelection={[selectedToDelete, setSelectedToDelete]}
              handleCustomClick={handleDeleteClick}
              data={purchasedToken}
              customClickPurpose="Delete"
              editableRow
              // editRow={editRow}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Analytics;
