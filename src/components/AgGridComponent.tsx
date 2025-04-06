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

interface AgGridComponentProps {
  // id: string;
  // onDataRequest?: (params: IServerSideGetRowsParams) => void;
}

const AgGridComponent: React.FC<AgGridComponentProps> = () => {
  const [data, setData] = useState<any[]>(testData);
  const [gridApi, setGridApi] = useState<any>(null);

  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Age', field: 'age', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'City', field: 'city', sortable: true, filter: 'agTextColumnFilter' },
  ], []);

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

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    filter: true,
  }), []);

  // themes:  ag-theme-balham-dark, ag-theme-quartz-dark, ag-theme-alpine-dark

  // const dataSource: IServerSideDatasource = useMemo(() => ({
  //   getRows: (params: IServerSideGetRowsParams) => {
  //     console.log('Requesting rows:', params.request);
  //     const request = {
  //       startRow: params.request.startRow,
  //       endRow: params.request.endRow,
  //       sortModel: params.request.sortModel,
  //       filterModel: params.request.filterModel,
  //     };

  //     (window as any).dash_clientside.my_ag_grid.fetchData(id, request, (response: any) => {
  //       if (response.success) {
  //         params.success({
  //           rowData: response.rowData,
  //           rowCount: response.rowCount,
  //         });
  //       } else {
  //         params.fail();
  //       }
  //     });
  //   },
  // }), []);

  const onGridReady = useCallback((params: any) => {
    const gridApi = params.api;
    setGridApi(gridApi);
    console.log('ag-grid ready', gridApi);
    // params.api.setServerSideDatasource(dataSource);
  }, []);

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

    