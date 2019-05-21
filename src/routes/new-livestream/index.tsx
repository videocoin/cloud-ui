import React from 'react';
import { SelectOption } from '@types';
import { RouteComponentProps, navigate } from '@reach/router';
import withAuth from 'HOCs/withAuth';
import { withFormik } from 'formik';
import { Button, TopBar, Typography } from 'ui-kit';
import BackLink from 'components/BackLink';
import NewLivestream from 'components/NewLivestream';
import BalanceBadge from 'components/BalanceBadge';
import PipelinesStore from 'stores/pipelines';
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

  return (
    <>
      <TopBar>
        <BackLink />
        <div>
          <Typography type="caption">VideoCoin Network</Typography>
          <Typography type="smallTitle">New Livestream</Typography>
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
      <NewLivestream {...props} />
      <BalanceBadge />
    </>
  );
});

export default withAuth()(NewLivestreamPage);
