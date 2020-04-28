import React from "react";
import { inject, observer } from 'mobx-react';

import { Form, Input, Button, Checkbox, Radio } from 'antd';

import history from 'global/history';
import {
  Header,
  StudentProfileMenu,
  AdminProfileMenu,
  TrainerProfileMenu,
} from "components";
import './style.sass';

interface ProfilePageProps {
  authState?: any;
}

@inject("authState")
@observer
class ProfilePage extends React.PureComponent<ProfilePageProps> {
  getUserMenu() {
    const { role } = this.props.authState;
    switch (role) {
      case "ROLE_STUDENT":
        return <StudentProfileMenu />;
      case "ROLE_TRAINER":
        return <TrainerProfileMenu />;
      case "ROLE_ADMINISTRATOR":
        return <AdminProfileMenu />;

      default:
        return <div>0</div>;
    }
  }
  render() {
    const { logOut, role, login } = this.props.authState;

    return (
      <div className={'pageContainer profilePage'}>
        <Header />
        <div className="profilePage__main">{this.getUserMenu()}</div>
      </div>
    );
  }
}

export default ProfilePage;
