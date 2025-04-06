import React from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridComponent } from './components/AgGridComponent';

const MyAgGridComponent = (props: any) => {
  return <AgGridComponent {...props} />;
};

(window as any).dash_clientside = (window as any).dash_clientside || {};
(window as any).dash_clientside.my_ag_grid = {
  render: (props: any) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<MyAgGridComponent {...props} />);
    return container;
   },
  fetchData: (id: string, request: any, callback: (response: any) => void) => {
    fetch('/get-rows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
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
      .then(data => callback(data))
      .catch(error => {
        console.error('ag-grid Fetch error:', error.message);
        callback({ success: false, error: error.message });
      });
  },
};
