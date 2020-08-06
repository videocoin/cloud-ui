import React from 'react';
import { Form, useFormikContext } from 'formik';
import cn from 'classnames';
import { eq } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import WorkersStore from 'stores/workers';
import { Typography, Spinner, Switch } from 'ui-kit';
import formatBytes from 'helpers/formatBytes';
import css from './styles.module.scss';
import Input from 'components/UI/FormikInput';
import Textarea from 'components/UI/FormikTextarea';

interface WorkerForm {
  name: string;
  allowThirdpartyDelegates: boolean;
  orgDesc: string;
  orgEmail: string;
  orgName: string;
  delegatePolicy: string;
}
const Worker = () => {
  const { worker, isLoading } = WorkersStore;
  const { values, handleChange } = useFormikContext<WorkerForm>();
  if (!worker || isLoading) return <Spinner />;
  const { id, status, systemInfo } = worker;
  const isNew = eq('NEW', status);

  return (
    <div className={css.root}>
      <div className={cn(css.status, css[status])}>
        <div />
        <Typography type="body">{status.toLowerCase()}</Typography>
      </div>
      <div className={css.spec}>
        <div>
          <Typography>Last Ping</Typography>
          <Typography type="body">Nov. 6th, 2019, 7:43pm</Typography>
        </div>
        <div>
          <Typography>Client ID</Typography>
          <Typography type="body">{id}</Typography>
        </div>
      </div>
      <Form id="workerForm" className={css.form}>
        <div className={css.halfInput}>
          <Input name="name" label="Worker Name" />
        </div>
        <div>
          <Input name="orgName" label="Organization" />
          <Input name="orgEmail" label="Contact Email" />
        </div>
        <div>
          <Textarea
            minRows={2}
            name="orgDesc"
            label="Description"
            placeholder="Add a short description, URL, twitter, telegram group link or anything else your delegator would need to contact you"
          />
        </div>
      </Form>
      <label className={css.thirdpartyCheck}>
        <Typography type="smallBodyThin">
          Allow Third Party Delegates
        </Typography>
        <Switch
          checked={values.allowThirdpartyDelegates}
          onChange={handleChange}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-expect-error
          name="allowThirdpartyDelegates"
        >
          <Typography type="tiny">
            Allows other people to stake VID onto your worker node. You will
            need to setup payments for these people.
          </Typography>
        </Switch>
      </label>
      <div className={css.delegatePolicy}>
        <Textarea
          name="delegatePolicy"
          label="Describe Delegate Payout Policy (eg. percent cash)"
          disabled={!values.allowThirdpartyDelegates}
        />
      </div>
      <div className={css.info}>
        <div className={css.head}>
          <Typography type="subtitleCaps">System information</Typography>
        </div>
        <div className={css.config}>
          <Typography type="body">System Config</Typography>
          {isNew ? (
            <Typography>(Setup Required)</Typography>
          ) : (
            <>
              <div data-testid="freq" className={css.configItem}>
                <Typography type="body">
                  {(systemInfo.cpuFreq / 1000).toFixed(1)} ghz
                </Typography>
              </div>
              <div data-testid="cpu" className={css.configItem}>
                <Typography type="body">{systemInfo.cpuCores} Cores</Typography>
              </div>
              <div data-testid="ram" className={css.configItem}>
                <Typography type="body">
                  {formatBytes(systemInfo.memTotal)}gb RAM
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Worker);
