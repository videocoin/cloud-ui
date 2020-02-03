import React, { useEffect } from 'react';
import withAuth from 'HOCs/withAuth';
import { Formik } from 'formik';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import NewStream from 'components/NewStream';
import StreamsStore from 'stores/streams';
import UserStore from 'stores/user';
import { history } from 'index';
import { SelectOption } from '@types';
import css from './index.module.scss';
import validationSchema from './validate';

interface FormValues {
  name: string;
  inputType: string;
  outputType: string;
  profile: SelectOption | null;
}

const initialValues: FormValues = {
  name: '',
  inputType: '',
  outputType: '',
  profile: null,
};

const NewStreamPage = () => {
  const { balance } = UserStore;
  const { fetchProfiles } = StreamsStore;

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    if (!balance) {
      history.navigate('./');
    }
  }, [balance]);

  if (!balance) {
    return null;
  }

  const onSubmit = async ({
    name,
    profile,
    inputType,
    outputType,
  }: FormValues) => {
    const { createStream } = StreamsStore;
    const data = {
      name,
      profileId: profile.value,
      inputType,
      outputType,
    };
    const res = await createStream(data);

    history.navigate(`/dashboard/streams/${res.data.id}`);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({ isValid, isSubmitting }) => (
        <>
          <div className="topBar">
            <TopBar>
              <BackLink />
              <div>
                <Typography type="caption">VideoCoin Network</Typography>
                <Typography type="smallTitle">New Stream</Typography>
              </div>
              <div className={css.btns}>
                {!isValid && (
                  <Typography type="caption">
                    Finish selections to continue
                  </Typography>
                )}
                <Button
                  type="submit"
                  form="streamForm"
                  loading={isSubmitting}
                  disabled={!isValid}
                >
                  Create stream
                </Button>
              </div>
            </TopBar>
          </div>
          <div className="content">
            <NewStream />
          </div>
        </>
      )}
    </Formik>
  );
};

export default withAuth()(NewStreamPage);
