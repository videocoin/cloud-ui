import React from 'react';
import cn from 'classnames';
import { map } from 'lodash/fp';
import { Row, Col } from 'react-flexbox-grid';
import WorkerImg from 'img/worker.svg';
import { Button, Typography } from 'ui-kit';
import css from './styles.module.scss';
import WorkerSetupCard, { WorkerSetupGuideCard } from './Card';

const cards: WorkerSetupGuideCard[] = [
  {
    icon: 'windows',
    title: 'Window',
    link:
      'https://forum.videocoin.network/t/windows-setup-guide-for-videocoin-worker',
  },
  {
    icon: 'apple',
    title: 'Mac',
    link:
      'https://forum.videocoin.network/t/macos-setup-guide-for-videocoin-worker',
  },
  {
    icon: 'linux',
    title: 'Linux',
    link:
      'https://forum.videocoin.network/t/linux-setup-guide-for-videocoin-worker',
  },
  {
    icon: 'gc',
    title: 'GC',
    link:
      'https://forum.videocoin.network/t/google-cloud-setup-guide-for-videocoin-worker',
  },
  {
    icon: 'aws',
    title: 'AWS',
    link:
      'https://forum.videocoin.network/t/aws-setup-guide-for-videocoin-worker',
  },
];

const renderCard = ({ icon, title, link }: WorkerSetupGuideCard) => (
  <WorkerSetupCard key={title} icon={icon} title={title} link={link} />
);

const WorkerSetupGuide = ({
  guideVisible,
  hideGuide,
}: {
  guideVisible: boolean;
  hideGuide: () => void;
}) => {
  const hasWorkers = true;

  // eslint-disable-next-line no-nested-ternary
  return hasWorkers ? (
    guideVisible ? (
      <>
        <div className={css.head}>
          <Typography type="subtitleCaps">Setup guides</Typography>
          <Button theme="minimal" onClick={hideGuide}>
            Hide
          </Button>
        </div>
        <ul className={cn(css.cards, css.small)}>{map(renderCard)(cards)}</ul>
      </>
    ) : null
  ) : (
    <Row>
      <Col xs={12} lg={3}>
        <div className={css.img}>
          <img src={WorkerImg} width={200} alt="" />
        </div>
      </Col>
      <Col xs={12} lg={9}>
        <Typography type="display3" theme="light" className={css.title}>
          Worker Node Setup
        </Typography>
        <Typography theme="light">
          Turn your unused compute power in VID by setting up and running worker
          nodes that process streams on the VideoCoin Network. Get started by
          choosing a guide to follow below.
        </Typography>
        <ul className={css.cards}>{map(renderCard)(cards)}</ul>
      </Col>
    </Row>
  );
};

export default WorkerSetupGuide;
