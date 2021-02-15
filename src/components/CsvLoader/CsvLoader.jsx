import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSVReader } from 'react-papaparse';

import { validateUsers } from '../../helpers/validate';

export const CsvLoader = ({ setUsers, setErrorStatus }) => {
  const buttonRef = useRef();

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      setErrorStatus(false);
      buttonRef.current.open(e);
    }
  };

  const checkForErrors = users => users.some(user => (
    !user.fullName || !user.email.value || !user.phone.value
  ));

  const handleFileLoad = (data, file) => {
    if (file.name.slice(-3) !== 'csv') {
      setErrorStatus(true);

      return;
    }

    const preparedUsers = validateUsers(data);

    const checkStatus = checkForErrors(preparedUsers);

    if (checkStatus) {
      setErrorStatus(true);

      return;
    }

    setUsers(preparedUsers);
  };

  const handleError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  return (
    <div className="csv-uploader">
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleFileLoad}
        onError={handleError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
        config={{
          header: true,
          transform: v => v.trim(),
          dynamicTyping: true,
          delimiter: ',',
          transformHeader: h => (
            h.charAt(0).toLowerCase() + h.slice(1).replace(/\s/g, '')
          ),
        }}
      >
        {({ file }) => (
          <div className="csv-uploader__button-wrap">
            <button
              type="button"
              onClick={handleOpenDialog}
              className="csv-uploader__button"
            >
              Import users
            </button>
          </div>
        )}
      </CSVReader>
    </div>
  );
};

CsvLoader.propTypes = {
  setUsers: PropTypes.func.isRequired,
  setErrorStatus: PropTypes.func.isRequired,
};
