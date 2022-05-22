import Token from 'src/types/Token';

export type TableFilter = (date: Token[]) => Token[];

export type Data = { id: string; [key: string]: any };

export type TableProps = {
  isLoading?: boolean;
  name: string;
  handleCustomClick: any;
  data: Data[];
  customClickPurpose: any;
  editableRow?: any;
  handleFilter: TableFilter;
  headList: string[] | { [key: string]: string };
  conditionallyRenderedCell?: (
    column: string,
    value: any,
    index: number,
    row: Data,
  ) => React.ReactElement | string | number | null;
};
