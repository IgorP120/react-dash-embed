import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { post } from './helpers/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

interface Props {
}

export const RootComponent: React.FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
      console.log('cookies', document.cookie);

      async function fetchData() {
          const result = await post('test1', { id: 'test1-data' });
          alert('Data fetched successfully!' + JSON.stringify(result));
          console.log('Data fetched successfully!', result);
      }

      fetchData();
  }, []);

  const [gridApi, setGridApi] = useState<any>(null);

  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Age', field: 'age', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'City', field: 'city', sortable: true, filter: 'agTextColumnFilter' },
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    filter: true,
  }), []);


  const onGridReady = useCallback((params: any) => {
    const gridApi = params.api;
    setGridApi(gridApi);
    console.log('ag-grid ready', gridApi);
    // params.api.setServerSideDatasource(dataSource);
  }, []);

  // themes:  ag-theme-balham-dark, ag-theme-quartz-dark, ag-theme-alpine-dark
  return (
    <div className="ag-theme-alpine-dark" style={{ height: 'calc(100vh - 17rem)', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowData={data}
        className='ag-theme-alpine-dark'
      />
    </div>

  );
}

