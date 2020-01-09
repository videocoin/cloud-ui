import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { withFormik } from 'formik';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import NewLivestream from 'components/NewLivestream';
import StreamsStore from 'stores/streams';
import UserStore from 'stores/user';
import { SelectOption } from '@types';
import css from './index.module.scss';
import validationSchema from './validate';

interface FormValues {
  name: string;
  inputType: string;
  outputType: string;
  profile: SelectOption | null;
}

const NewLivestreamPage = withFormik<RouteComponentProps, FormValues>({
  mapPropsToValues: () => ({
    name: '',
    inputType: '',
    outputType: '',
    profile: null,
  }),
  validationSchema,
  handleSubmit: async (
    { name, profile, inputType, outputType },
    { setSubmitting },
  ) => {
    const { createStream } = StreamsStore;

    try {
      const res = await createStream({
        name,
        profileId: profile.value,
        inputType,
        outputType,
      });

      navigate(`/dashboard/streams/${res.data.id}`);
    } catch (e) {
      setSubmitting(false);
      throw e;
    }
  },
})(props => {
  const { isValid, isSubmitting } = props;
  const { balance } = UserStore;
  const { fetchProfiles } = StreamsStore;

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    if (!balance) {
      navigate('./');
    }
  }, [balance]);

  if (!balance) {
    return null;
  }

  return (
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
        <NewLivestream {...props} />
      </div>
    </>
  );
});

export default withAuth()(NewLivestreamPage);
