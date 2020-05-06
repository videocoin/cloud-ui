import React from 'react';
import { Typography } from 'ui-kit';
import WorkerStatus from 'components/Workers/WorkerStatus';
import { IWorker } from 'stores/workers';

const TableRow = ({ reward, name, status }: IWorker) => {
  return (
    <tr>
      <td>
        <WorkerStatus status={status} name={status} />
      </td>
      <td>
        <Typography type="body">{name}</Typography>
      </td>
      <td>
        <Typography type="body">${reward}</Typography>
      </td>
    </tr>
  );
};

export default TableRow;
