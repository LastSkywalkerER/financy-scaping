import useHttp from '@core/hooks/http.hook';
import React from 'react';
import { setDataTable, setDataTableIsLoaded } from '@core/store/dataTableSlice';
import {
  setSavedTickers,
  setSavedTickersIsLoaded,
  addSavedTickers,
  deleteSavedTickers,
} from '@core/store/savedTickersSlice';
import { useDispatch, useSelector } from 'react-redux';

import Token from 'src/types/Token';
import { RootState } from '@core/store/store';

export default function tickerManager() {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.dataTable);
  const savedTickers = useSelector((state: RootState) => state.savedTickers);

  const getData = async () => {
    dispatch(setDataTableIsLoaded({ isLoaded: false }));
    const response = await request('/api/table/data', 'GET');
    dispatch(setDataTable({ dataTable: response.stocks }));
    dispatch(setDataTableIsLoaded({ isLoaded: true }));
  };

  const getSavedTickers = async () => {
    dispatch(setSavedTickersIsLoaded({ isLoaded: false }));
    const response = await request('/api/tickers/saved', 'GET');
    dispatch(setSavedTickers({ dataTable: response.tickers }));
    dispatch(setSavedTickersIsLoaded({ isLoaded: true }));
  };

  const saveTickers = async (selectedToBuy: string[] = []) => {
    const alreadySavedSet = new Set(
      savedTickers.list.map((ticker: Token) => ticker.symbol),
    );
    const needToAddSet = new Set();

    selectedToBuy.forEach((symbol) => {
      if (alreadySavedSet.has(symbol)) {
        return;
      }
      needToAddSet.add(symbol);
    });

    const newSavedTickers = [
      ...data.list
        .filter((obj: Token) => needToAddSet.has(obj.symbol))
        .map((obj: Token) => ({ ...obj, expectedPrice: 0 })),
    ];

    dispatch(addSavedTickers({ dataTable: newSavedTickers }));

    const response = await request('/api/tickers/saved', 'POST', {
      tickers: newSavedTickers,
    });
  };

  const deleteTickers = async (selectedToDelete: string[]) => {
    dispatch(
      deleteSavedTickers({
        deleteIds: selectedToDelete,
      }),
    );

    const response = await request('/api/tickers/saved', 'DELETE', {
      tickers: [
        ...savedTickers.list.filter(
          (ticker: Token) => selectedToDelete.indexOf(ticker.symbol) !== -1,
        ),
      ],
    });
  };

  return { getData, getSavedTickers, saveTickers, deleteTickers };
}
