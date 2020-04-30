import React from "react";
import { inject, observer } from "mobx-react";

import { Form, Input, Button, Checkbox, Radio } from 'antd';

import history from 'global/history';
import './style.sass';

interface MenuProps {
  authState?: any;
  profileState?: any;
}

@inject("authState", "profileState")
@observer
class TrainerProfileMenu extends React.PureComponent<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      //selectedCourse: false,
      //createStudentModalVisible: false,
    };
  }
  render() {
    //const { logOut, role, login } = this.props.authState;
    return <div className={"trainer-profile-menu"}>menu</div>;
  }
}

export default TrainerProfileMenu;
