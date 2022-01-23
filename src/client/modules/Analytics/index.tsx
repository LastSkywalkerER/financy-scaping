import React, { Suspense, useEffect, useState } from 'react';
import EnhancedTable from '@components/EnhancedTable';
import Token from 'src/types/Token';
import useHttp from '@core/hooks/http.hook';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

const Analytics = () => {
  const [data, updateData] = useState([]);
  const [selectedToBuy, setSelectedToBuy] = useState([]);
  const [selectedToDelete, setSelectedToDelete] = useState([] as number[]);
  const [purchasedToken, updatePurchasedToken] = useState([] as Token[]);

  const { request } = useHttp();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../../assets/db/table.json');
      const json = await response.json();
      updateData(json);
    };

    getData();
  }, []);

  useEffect(() => {
    const getSavedTickers = async () => {
      const response = await request('/api/tickers/saved', 'GET');
      console.log(response);
      updatePurchasedToken(response.tickers);
    };
    getSavedTickers();
  }, []);

  const handleBuyClick = async () => {
    let savedTokens: Token[] = [];
    updatePurchasedToken((tokens: Token[]) => {
      let newTokens = tokens.map((obj: Token) => obj.id);
      selectedToBuy.forEach((id) => {
        if (newTokens.indexOf(id) === -1) {
          newTokens.push(id);
        }
      });

      savedTokens = [
        ...data
          .filter((obj: Token) => newTokens.indexOf(obj.id) !== -1)
          .map((obj: Token) => ({ ...obj, buyPrice: null })),
      ];

      return savedTokens;
    });

    const response = await request('/api/tickers/saved', 'POST', {
      tickers: savedTokens,
    });
    console.log(response);

    setSelectedToBuy([]);
  };

  const handleDeleteClick = async () => {
    updatePurchasedToken((tokens: Token[]) => {
      const currentTokens = tokens
        .map((obj: Token) => obj.id)
        .filter((id: number) => selectedToDelete.indexOf(id) === -1);

      savedTokens = [
        ...data.filter((obj: Token) => currentTokens.indexOf(obj.id) !== -1),
      ];

      return savedTokens;
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

  const handleUpdateTable = async () => {
    const data = await request('/api/table/update', 'GET');
    console.log(data);
  };

  return (
    <Box>
      <Button onClick={handleUpdateTable} variant="contained">
        Update table
      </Button>
      <Box>
        {!!data.length ? (
          <EnhancedTable
            name="Stock Market"
            useSelection={[selectedToBuy, setSelectedToBuy]}
            handleCustomClick={handleBuyClick}
            data={data}
            customClickPurpose="Buy"
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
      <Box>
        {!!purchasedToken.length ? (
          <EnhancedTable
            name="Purchaised Tokens"
            useSelection={[selectedToDelete, setSelectedToDelete]}
            handleCustomClick={handleDeleteClick}
            data={purchasedToken}
            customClickPurpose="Delete"
            editableRow
            editRow={editRow}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
    </Box>
  );
};

export default Analytics;
