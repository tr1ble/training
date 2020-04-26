import React from "react";
import { inject, observer } from 'mobx-react';

import { Form, Input, Button, Checkbox, Radio } from 'antd';

import history from 'global/history';
import './style.sass';


interface ProfilePageProps {
  authState?: any;
}

@inject("authState")
@observer
class ProfilePage extends React.PureComponent<ProfilePageProps> {
  render(){
    const {logOut} = this.props.authState

    return <div className={"pageContainer"}>
      <div> 
        <Button onClick={logOut}>Log out</Button>
      </div>
       Profile
       </div>;
  }
}

export default ProfilePage;
