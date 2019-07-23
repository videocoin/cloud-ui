import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TopBar } from 'ui-kit';
import BackLink from 'components/BackLink';

import { observer } from 'mobx-react-lite';
import PipelinesStore from 'stores/pipelines';
import Pipeline from 'components/Pipeline';
import PipelineHeader from 'components/Pipeline/Header';

const PipelinePage: FC<RouteComponentProps & { pipelineId?: string }> = ({
  pipelineId,
}) => {
  const { isLoading, isPending } = PipelinesStore;

  useEffect(() => {
    const { fetchPipeline, clearPipeline } = PipelinesStore;

    if (!isLoading && !isPending) {
      fetchPipeline(pipelineId);
    }

    return () => {
      clearPipeline();
    };
  }, [isLoading, isPending, pipelineId]);

  return (
    <>
      <div className="topBar">
        <TopBar>
          <BackLink />
          <PipelineHeader />
        </TopBar>
      </div>
      <div className="content">
        <Pipeline />
      </div>
    </>
  );
};

export default observer(PipelinePage);
