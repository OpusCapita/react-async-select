import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import * as Examples from '../components/';
import GithubLogo from '../images/logo-github.svg';

export default () => (
  <Grid>
    <Row>
      <Col xs={11} md={8} lg={6}>
        <Row>
          <Col xs={10}>
            <h3>React component template</h3>
          </Col>
          <Col xs={2}>
            <a
              href="https://github.com/OpusCapita/react-component-template"
              style={{ marginTop: '20px', display: 'block' }}
            >
              <GithubLogo />
            </a>
          </Col>
        </Row>
        <Panel>
          <div style={{ padding: '20px' }}>
            {
              Object.values(Examples).map((Example, i) => (
                <Example key={`example-${i}`}/>
              ))
            }
          </div>
        </Panel>
      </Col>
    </Row>
  </Grid>
);
