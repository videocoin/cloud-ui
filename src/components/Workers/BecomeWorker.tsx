import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Typography } from 'ui-kit';
import WorkerImg from 'img/worker.svg';

const BecomeWorker = () => {
  return (
    <div>
      <Row>
        <Col xs={8} xsOffset={2}>
          <div className="g-tac">
            <img
              className="mb45"
              width={322}
              height={284}
              src={WorkerImg}
              alt=""
            />

            <Typography type="display3" className="mb10">
              Become a Worker
            </Typography>
            <Typography className="mb25">
              Workers on the VideoCoin Network transcoding video streams for the
              network and in return earn $ for the processing work they do. At
              the moment we are only partnering with select people to become
              workers to ensure network reliability.
            </Typography>
            <Typography>
              Contact us if you would like to learn more -{' '}
              <b>
                <a href="mailto:support@videocoin.network">
                  support@videocoin.network
                </a>
              </b>
            </Typography>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BecomeWorker;
