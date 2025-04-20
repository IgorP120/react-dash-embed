import React, { useCallback, useMemo, useState } from 'react';
import { post } from './helpers/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

interface Props {
  // empty for now
}

export const RootComponent: React.FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);

  const [gridApi, setGridApi] = useState<any>(null);

  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter'},
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

  const loadData = async () => {
    const data = await post('get-people', {});
    setData(data);
  };

  // themes:  ag-theme-balham-dark, ag-theme-quartz-dark, ag-theme-alpine-dark
  return (
    <div>
      <button onClick={loadData} style={{ cursor: 'pointer' }}>Load Data</button>
      <div className="ag-theme-alpine-dark" style={{ height: 'calc(100vh - 17rem)', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowData={data}
          className='ag-theme-alpine-dark'
        />
      </div>
    </div>
  );
}

