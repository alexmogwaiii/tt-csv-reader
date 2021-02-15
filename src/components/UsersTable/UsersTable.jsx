import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { TITLES } from '../../helpers/titles';

export const UsersTable = ({ users }) => {
  const findDuplicates = (currentUser) => {
    const duplicate = users.find((user) => {
      if ((user.email.value === currentUser.email.value
        || user.phone.value === currentUser.phone.value)
        && user !== currentUser) {
        return true;
      }

      return false;
    });

    if (!duplicate) {
      return false;
    }

    return duplicate.id;
  };

  return (
    <div className="wrapper">
      <table className="table">
        <thead>
          <tr className="table__header-row">
            {TITLES.map(title => (
              <th key={title} className="table__header-column">
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="table__row">
              <td className="table__column">
                {user.id}
              </td>
              <td className="table__column">
                {user.fullName}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.phone.status,
                })}
              >
                {user.phone.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.email.status,
                })}
              >
                {user.email.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.age.status,
                })}
              >
                {user.age.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.experience.status,
                })}
              >
                {user.experience.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.yearlyIncome.status,
                })}
              >
                {user.yearlyIncome.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.hasChildren.status,
                })}
              >
                {user.hasChildren.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.licenseStates.status,
                })}
              >
                {user.licenseStates.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.expirationDate.status,
                })}
              >
                {user.expirationDate.value}
              </td>
              <td
                className={classnames({
                  table__column: true,
                  'table__column--invalid': !user.licenseNumber.status,
                })}
              >
                {user.licenseNumber.value}
              </td>
              <td className="table__column">
                {findDuplicates(user)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    phone: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
    email: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
    age: PropTypes.shape({
      value: PropTypes.number,
      status: PropTypes.bool,
    }).isRequired,
    experience: PropTypes.shape({
      value: PropTypes.number,
      status: PropTypes.bool,
    }).isRequired,
    yearlyIncome: PropTypes.shape({
      value: PropTypes.number,
      status: PropTypes.bool,
    }).isRequired,
    hasChildren: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
    licenseStates: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
    expirationDate: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
    licenseNumber: PropTypes.shape({
      value: PropTypes.string,
      status: PropTypes.bool,
    }).isRequired,
  })).isRequired,
};
