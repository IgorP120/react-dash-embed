import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
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
    // (window as any).dash_clientside.my_ag_grid.fetchData('1', {}, (response: any) => {
    //   if (response.success) {
    //     console.log('ag-grid fetch success');
    //     setData(response.rowData);
    //     // params.success({
    //     //   rowData: response.rowData,
    //     //   rowCount: response.rowCount,
    //     // });
    //   } else {
    //     console.log('ag-grid fetch failed');
    //   }

      console.log('cookies', document.cookie);

      fetch('get-rows', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({}),
        credentials: 'include', // Include cookies for Dash Enterprise session
      })
        .then(response => {
          console.log('ag-grid fetchData response', response);
          if (!response.ok) {
            if (response.status === 401) throw new Error('Unauthorized');
            if (response.status === 403) throw new Error('Forbidden');
            throw new Error('Server error');
          }
          return response.json();
        })
        .then(data => {
          console.log('ag-grid data ok', data);
          setData(data);
        })
        .catch(error => {
          console.error('ag-grid Fetch error:', error.message);
        });
  }, []);

  return (
    <div>
      <h1>My React App</h1>
    </div>
  );
}
