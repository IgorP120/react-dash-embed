import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { post } from './helpers/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

interface Props {
}

const testData = [
  {"id": 1, "name": "Emma Johnson", "age": 42, "city": "Toronto"},
  {"id": 2, "name": "Liam Smith", "age": 19, "city": "Seattle"},
  {"id": 3, "name": "Olivia Brown", "age": 67, "city": "Vancouver"},
  {"id": 4, "name": "Noah Davis", "age": 31, "city": "Chicago"},
  {"id": 5, "name": "Ava Wilson", "age": 28, "city": "Montreal"},
  {"id": 6, "name": "William Taylor", "age": 53, "city": "New York"},
  {"id": 7, "name": "Sophia Martinez", "age": 76, "city": "Calgary"},
  {"id": 8, "name": "James Anderson", "age": 22, "city": "Los Angeles"},
  {"id": 9, "name": "Isabella Thomas", "age": 45, "city": "Ottawa"},
  {"id": 10, "name": "Benjamin Lee", "age": 34, "city": "Boston"},
  {"id": 11, "name": "Mia White", "age": 88, "city": "Edmonton"},
  {"id": 12, "name": "Lucas Harris", "age": 17, "city": "San Francisco"},
  {"id": 13, "name": "Charlotte Clark", "age": 61, "city": "Winnipeg"},
  {"id": 14, "name": "Henry Lewis", "age": 29, "city": "Miami"},
  {"id": 15, "name": "Amelia Walker", "age": 50, "city": "Quebec City"},
  {"id": 16, "name": "Alexander Hall", "age": 72, "city": "Denver"},
  {"id": 17, "name": "Harper Allen", "age": 25, "city": "Halifax"},
  {"id": 18, "name": "Michael Young", "age": 39, "city": "Austin"},
  {"id": 19, "name": "Evelyn King", "age": 83, "city": "Victoria"},
  {"id": 20, "name": "Daniel Scott", "age": 47, "city": "Phoenix"},
  {"id": 21, "name": "Abigail Green", "age": 14, "city": "Regina"},
  {"id": 22, "name": "Matthew Adams", "age": 65, "city": "Portland"},
  {"id": 23, "name": "Emily Baker", "age": 33, "city": "Saskatoon"},
  {"id": 24, "name": "Joseph Gonzalez", "age": 90, "city": "Atlanta"},
  {"id": 25, "name": "Sofia Nelson", "age": 26, "city": "London"},
  {"id": 26, "name": "David Carter", "age": 58, "city": "Dallas"},
  {"id": 27, "name": "Madison Mitchell", "age": 41, "city": "St. John's"},
  {"id": 28, "name": "Jackson Perez", "age": 20, "city": "Houston"},
  {"id": 29, "name": "Aria Roberts", "age": 74, "city": "Fredericton"},
  {"id": 30, "name": "Logan Turner", "age": 36, "city": "Philadelphia"},
  {"id": 31, "name": "Scarlett Phillips", "age": 63, "city": "Charlottetown"},
  {"id": 32, "name": "Jacob Campbell", "age": 27, "city": "San Diego"},
  {"id": 33, "name": "Chloe Parker", "age": 85, "city": "Whitehorse"},
  {"id": 34, "name": "Luke Evans", "age": 48, "city": "Minneapolis"},
  {"id": 35, "name": "Penelope Edwards", "age": 15, "city": "Yellowknife"},
  {"id": 36, "name": "Mason Collins", "age": 69, "city": "Detroit"},
  {"id": 37, "name": "Layla Stewart", "age": 32, "city": "Iqaluit"},
  {"id": 38, "name": "Ethan Sanchez", "age": 51, "city": "Nashville"},
  {"id": 39, "name": "Zoey Morris", "age": 23, "city": "Kelowna"},
  {"id": 40, "name": "Samuel Rogers", "age": 77, "city": "Las Vegas"},
  {"id": 41, "name": "Lily Reed", "age": 44, "city": "Guelph"},
  {"id": 42, "name": "Gabriel Cook", "age": 18, "city": "Cleveland"},
  {"id": 43, "name": "Aubrey Morgan", "age": 66, "city": "Moncton"},
  {"id": 44, "name": "Caleb Cooper", "age": 35, "city": "Charlotte"},
  {"id": 45, "name": "Hannah Bailey", "age": 80, "city": "Red Deer"},
  {"id": 46, "name": "Isaac Barnes", "age": 29, "city": "Kansas City"},
  {"id": 47, "name": "Grace Henderson", "age": 57, "city": "Lethbridge"},
  {"id": 48, "name": "Owen Coleman", "age": 21, "city": "Indianapolis"},
  {"id": 49, "name": "Violet Jenkins", "age": 92, "city": "Kamloops"},
  {"id": 50, "name": "Nathan Rivera", "age": 40, "city": "Columbus"},
  {"id": 51, "name": "Ellie Ward", "age": 73, "city": "Barrie"},
  {"id": 52, "name": "Jack Fisher", "age": 30, "city": "Milwaukee"},
  {"id": 53, "name": "Lillian Gray", "age": 55, "city": "Sudbury"},
  {"id": 54, "name": "Dylan Ortiz", "age": 24, "city": "Oklahoma City"},
  {"id": 55, "name": "Audrey Hunt", "age": 87, "city": "Kingston"},
  {"id": 56, "name": "Julian Wells", "age": 46, "city": "Tampa"},
  {"id": 57, "name": "Savannah Stone", "age": 16, "city": "Sherbrooke"},
  {"id": 58, "name": "Connor Black", "age": 64, "city": "Albuquerque"},
  {"id": 59, "name": "Addison Ellis", "age": 38, "city": "Trois-Rivières"},
  {"id": 60, "name": "Levi Fox", "age": 81, "city": "Tucson"},
  {"id": 61, "name": "Brooklyn Berry", "age": 27, "city": "Sault Ste. Marie"},
  {"id": 62, "name": "Elijah Long", "age": 59, "city": "Fresno"},
  {"id": 63, "name": "Peyton Myers", "age": 43, "city": "Thunder Bay"},
  {"id": 64, "name": "Christian Rice", "age": 22, "city": "Sacramento"},
  {"id": 65, "name": "Nora Hudson", "age": 75, "city": "Nanaimo"},
  {"id": 66, "name": "Gavin Palmer", "age": 31, "city": "Memphis"},
  {"id": 67, "name": "Hazel Dixon", "age": 89, "city": "Prince George"},
  {"id": 68, "name": "Aaron West", "age": 50, "city": "Raleigh"},
  {"id": 69, "name": "Clara Ford", "age": 19, "city": "Chilliwack"},
  {"id": 70, "name": "Hunter Gordon", "age": 68, "city": "Omaha"},
  {"id": 71, "name": "Skylar Dean", "age": 34, "city": "Drummondville"},
  {"id": 72, "name": "Eli Marshall", "age": 62, "city": "Louisville"},
  {"id": 73, "name": "Ruby Andrews", "age": 25, "city": "Vernon"},
  {"id": 74, "name": "Carter Brooks", "age": 91, "city": "Richmond"},
  {"id": 75, "name": "Sadie Bryant", "age": 47, "city": "Granby"},
  {"id": 76, "name": "Ryan Foster", "age": 20, "city": "Birmingham"},
  {"id": 77, "name": "Lila Pearson", "age": 78, "city": "Medicine Hat"},
  {"id": 78, "name": "Jaxon Wagner", "age": 36, "city": "Rochester"},
  {"id": 79, "name": "Ivy Sullivan", "age": 54, "city": "Rimouski"},
  {"id": 80, "name": "Kayden Butler", "age": 23, "city": "Salt Lake City"},
  {"id": 81, "name": "Esme Holmes", "age": 86, "city": "Belleville"},
  {"id": 82, "name": "Micah Duncan", "age": 41, "city": "Hartford"},
  {"id": 83, "name": "Delilah Fowler", "age": 17, "city": "Moose Jaw"},
  {"id": 84, "name": "Asher Knight", "age": 70, "city": "Des Moines"},
  {"id": 85, "name": "Autumn Lawrence", "age": 32, "city": "Brandon"},
  {"id": 86, "name": "Ezra Murray", "age": 60, "city": "Honolulu"},
  {"id": 87, "name": "Piper Porter", "age": 28, "city": "North Bay"},
  {"id": 88, "name": "Declan Rose", "age": 84, "city": "Anchorage"},
  {"id": 89, "name": "Freya Tucker", "age": 45, "city": "Cornwall"},
  {"id": 90, "name": "Theo Weaver", "age": 21, "city": "Boise"},
  {"id": 91, "name": "Willow Armstrong", "age": 79, "city": "Sarnia"},
  {"id": 92, "name": "Finn Barrett", "age": 37, "city": "Spokane"},
  {"id": 93, "name": "Cora Carroll", "age": 66, "city": "Prince Albert"},
  {"id": 94, "name": "Miles Dunn", "age": 24, "city": "Baton Rouge"},
  {"id": 95, "name": "Iris Harper", "age": 88, "city": "Orillia"},
  {"id": 96, "name": "Jude Lynch", "age": 49, "city": "Little Rock"},
  {"id": 97, "name": "Ember McDonald", "age": 18, "city": "Penticton"},
  {"id": 98, "name": "Silas Nichols", "age": 71, "city": "Burlington"},
  {"id": 99, "name": "Opal Owens", "age": 35, "city": "Grande Prairie"},
  {"id": 100, "name": "Rhett Payne", "age": 52, "city": "Jackson"}
];

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

  const loadData = () => {
    setData(testData);
  };

  // themes:  ag-theme-balham-dark, ag-theme-quartz-dark, ag-theme-alpine-dark
  return (
    <div>
      <button onClick={loadData}>Load Data</button>
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

