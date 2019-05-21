import React, { useEffect } from 'react';
import { Icon, Typography } from 'ui-kit';
import { map, eq } from 'lodash/fp';
import PipelineItem from 'components/Pipelines/Item';
import PipelinesStore from 'stores/pipelines';
import { Pipeline } from '@types';
import { observer } from 'mobx-react-lite';
import css from './Table.module.scss';

const fields = [
  {
    name: 'status',
    label: 'Status',
    colspan: 2,
  },
  {
    name: 'name',
    label: 'Pipeline Name',
  },
];

const PipelinesTable = () => {
  const { items, changeSort, sort, state, load } = PipelinesStore;

  useEffect(() => {
    if (!items.length) {
      load();
    }
  }, [items.length, load]);

  if (eq('loading', state)) {
    return <Typography>Loading...</Typography>;
  }

  const isActive = eq(sort.field);
  const orderIcon = eq(sort.order, 'asc') ? 'arrowDown' : 'arrowUp';
  const handleSort = (field: string) => () => {
    const order =
      eq(sort.field, field) && eq(sort.order, 'asc') ? 'desc' : 'asc';

    changeSort(field, order);
  };
  const renderHead = () =>
    map(({ name, label, colspan = 1 }) => (
      <th key={name} colSpan={colspan} onClick={handleSort(name)}>
        <Typography
          type="smallBodyAlt"
          theme={isActive(name) ? 'primary' : 'light'}
        >
          {isActive(name) && <Icon name={orderIcon} width={16} height={16} />}
          {label}
        </Typography>
      </th>
    ))(fields);
  const renderTable = () =>
    map(
      (pipeline: Pipeline) => (
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
