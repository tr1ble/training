import React from 'react';
//import { inject, observer } from "mobx-react";

import { Form, Input, Button, Checkbox, Radio } from "antd";

import history from "global/history";
import "./style.sass";

interface MenuProps {
  //authState?: any;
}

// @inject('authState')
// @observer
class TrainerProfileMenu extends React.PureComponent<MenuProps> {
  render() {
    //const { logOut, role, login } = this.props.authState;
    return <div className={'trainer-profile-menu'}>menu</div>;
  }
}

export default TrainerProfileMenu;
