import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom'

import { MenuAppBar } from '../components';

import LightStateWebSocketController from './LightStateWebSocketController';

class Project extends Component<RouteComponentProps> {

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="Slider">
        <LightStateWebSocketController />
      </MenuAppBar>
    )
  }

}

export default Project;
