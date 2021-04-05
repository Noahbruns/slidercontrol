import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom'

import { MenuAppBar } from '../components';

import SliderStateWebSocketController from './SliderStateWebSocketController';

class Project extends Component<RouteComponentProps> {

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="Slider">
        <SliderStateWebSocketController />
      </MenuAppBar>
    )
  }

}

export default Project;
