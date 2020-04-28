import React from 'react';
import { inject, observer } from "mobx-react";

import { Form, Input, Button, Checkbox, Radio } from "antd";

import history from "global/history";
import "./style.sass";

interface HeaderProps {
  authState?: any;
}

@inject('authState')
@observer
class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { logOut, role, login } = this.props.authState;
    return (
      <div className={"header"}>
        <div className={"header__info"}>
          <div> {login}</div>
          <div>{role}</div>
        </div>
        <div>
          <Button onClick={logOut}>Log out</Button>
        </div>
      </div>
    );
  }
}

export default Header;
