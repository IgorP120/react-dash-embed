import React from 'react';
import { createRoot } from 'react-dom/client';
import { RootComponent } from './RootComponent';

const win = window as any;
win.dash_clientside = win.dash_clientside || {};
win.dash_clientside.react_app = {
  render: (props: any) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<RootComponent {...props} />);
    return container;
   },
};
