import React, { useState } from 'react';
import { CsvLoader } from './components/CsvLoader';
import { UsersTable } from './components/UsersTable';
import './App.scss';

function App() {
  const [notCorrectFormat, setErrorStatus] = useState(false);
  const [users, setUsers] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Radency</h1>

        <CsvLoader
          setUsers={setUsers}
          setErrorStatus={setErrorStatus}
        />

        {users && <UsersTable users={users} />}

        {notCorrectFormat
          && (
            <div className="invalid-format">
              File format is not correct
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
