import React, { ChangeEventHandler } from 'react';
import FilledInput from '@mui/material/FilledInput';
import Token from '@core/models/Token';

type Props = {
  data: any;
  updateDataTable: Function;
};

export default function Filter({ data, updateDataTable }: Props) {
  let sectors = new Set();
  data.forEach((obj: Token) => sectors.add(obj.sector));

  const searchSector: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateDataTable((data: Token[]) => [
      ...data.filter((elem) => elem.sector.includes(event.target.value)),
    ]);
  };

  return (
    <div>
      <FilledInput
        onChange={searchSector}
        inputProps={{
          list: 'options',
          placeholder: 'Search sector',
        }}
      />
      <datalist id="options">
        {[...sectors].map((sector: any) => (
          <option key={sector} value={sector}></option>
        ))}
      </datalist>
    </div>
  );
}
