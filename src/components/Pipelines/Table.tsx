import React from 'react';
import { Typography } from 'ui-kit';
import { map } from 'lodash/fp';
import PipelineItem from 'components/Pipelines/Item';
import PipelinesStore from 'stores/pipelines';
import { TPipelineItem } from 'stores/types';
import { observer } from 'mobx-react-lite';
import css from './Table.module.scss';

const fields = [
  {
    name: 'name',
    label: 'Pipeline Name',
    colspan: 2,
  },
];

const PipelinesTable = () => {
  const { items, isPending, isLoading } = PipelinesStore;

  if (isLoading || isPending) {
    return <Typography>Loading...</Typography>;
  }

  const renderHead = () =>
    map(({ name, label, colspan = 1 }) => (
      <th key={name} colSpan={colspan}>
        <Typography type="smallBodyAlt">{label}</Typography>
      </th>
    ))(fields);
  const renderTable = () =>
    map(
      (pipeline: TPipelineItem) => (
        <PipelineItem key={pipeline.id} pipeline={pipeline} />
      ),
      items,
    );

  return (
    <>
      <table className={css.root}>
        <thead>
          <tr>{renderHead()}</tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </>
  );
};

export default observer(PipelinesTable);
