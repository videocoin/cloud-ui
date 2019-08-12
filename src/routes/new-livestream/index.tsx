import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { withFormik } from 'formik';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import NewLivestream from 'components/NewLivestream';
import PipelinesStore from 'stores/pipelines';
import UserStore from 'stores/user';
import { SelectOption } from '@types';
import css from './index.module.scss';
import validationSchema from './validate';

interface FormValues {
  name: string;
  input: string;
  output: string;
  profile: SelectOption | null;
}

const NewLivestreamPage = withFormik<RouteComponentProps, FormValues>({
  mapPropsToValues: () => ({
    name: '',
    input: '',
    output: '',
    profile: null,
  }),
  validationSchema,
  handleSubmit: async ({ name, profile }, { setSubmitting }) => {
    const { createPipeline } = PipelinesStore;

    try {
      await createPipeline({ name, profileId: profile.value });
      navigate('./');
    } catch (e) {
      setSubmitting(false);
      throw e;
    }
  },
})(props => {
  const { isValid, isSubmitting } = props;
  const { balance } = UserStore;

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
            <Typography type="smallTitle">New Pipeline</Typography>
          </div>
          <div className={css.btns}>
            {!isValid && (
              <Typography type="caption">
                Finish selections to continue
              </Typography>
            )}
            <Button
              type="submit"
              form="pipelineForm"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Create pipeline
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
