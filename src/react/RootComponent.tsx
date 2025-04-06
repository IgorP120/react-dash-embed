import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { post } from './helpers/api';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { ColDef } from 'ag-grid-community';
// import { ServerSideRowModelModule, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';

const testData = [
  { name: 'John Doe', age: 10, city: 'Toronto'},
  { name: 'James Cameron', age: 11, city: 'New York'},
  { name: 'Fannie Mae', age: 20, city: 'San Francisco'},
];

interface Props {
  // id: string;
  // onDataRequest?: (params: IServerSideGetRowsParams) => void;
}

export const RootComponent: React.FC<Props> = () => {
  const [data, setData] = useState<any[]>(testData);

  useEffect(() => {
      console.log('cookies', document.cookie);

      async function fetchData() {
          const result = await post('test1', { id: 'test1-data' });
          alert('Data fetched successfully!' + JSON.stringify(result));
          console.log('Data fetched successfully!', result);
      }

      fetchData();
  }, []);

  return (
    <div>
      <h1>My React App</h1>
    </div>
  );
}
