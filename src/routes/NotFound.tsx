import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Navigation from 'components/Navigation';
import withAuth from 'HOCs/withAuth';
import { TopBar, Typography } from 'ui-kit';
import { ReactComponent as Logo } from '../img/studio.svg';
import css from './notFound.module.scss';

const NotFound: FC<RouteComponentProps & { '*'?: any }> = () => {
  return (
    <div className={css.root}>
      <div className={css.nav}>
        <Navigation />
      </div>
      <div className={css.body}>
        <div>
          <div>
            <div className="topBar">
              <TopBar>
                <div>
                  <Typography type="caption">VideoCoin Network</Typography>
                  <Typography type="smallTitle">Oops, Nothing Here</Typography>
                </div>
              </TopBar>
            </div>
            <div className="content">
              <div className={css.inner}>
                <div className="g-tac">
                  <Logo />
                </div>
                <Typography
                  align="center"
                  type="display4"
                  className={css.title}
                >
                  This page doesn’t exist anymore
                </Typography>
                <Typography align="center" type="subtitleThin">
                  Double check your link or use the sidebar to go to a different
                  page
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth()(NotFound);
