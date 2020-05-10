import React from "react";
import { inject, observer } from 'mobx-react';
import { UserOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  PageHeader,
  Descriptions,
  Avatar,
} from 'antd';

import history from 'global/history';
import './style.sass';

interface HeaderProps {
  authState?: any;
  profileState?: any;
}

@inject("authState", "profileState")
@observer
class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { logOut, role, login } = this.props.authState;
    const { clearProfile } = this.props.profileState;
    return (
      <div className={'header'}>
        <div className="left">
          <Avatar size={75} shape="square" icon={<UserOutlined />} />
          <div className="info">
            <div>Логин: {login}</div>
            <div>
              {role == "ROLE_STUDENT"
                ? "Студент"
                : role == "ROLE_TRAINER"
                ? "Тренер"
                : "Администратор"}
            </div>
          </div>
        </div>
        <div className="right">
          {/*  <Avatar size={75} shape="square" icon={<UserOutlined />} /> */}
          <div className="out">
            <Button
              onClick={() => {
                logOut();
                clearProfile();
              }}
              type="primary"
              key="3"
            >
              Выйти из учётной записи
            </Button>
          </div>
        </div>
        {/* <PageHeader
          className="site-page-header"
          title="Профиль"
          //breadcrumb={{ routes }}
          extra={[
            <Button
              onClick={() => {
                logOut();
                clearProfile();
              }}
              type="primary"
              key="3"
            >
              Выйти из профиля
            </Button>
          ]}
          subTitle={
            role == 'ROLE_STUDENT'
              ? 'Студент'
              : role == 'ROLE_TRAINER'
              ? 'Тренер'
              : 'Администратор'
          }
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Логин: ">{login}</Descriptions.Item>
          </Descriptions>
        </PageHeader> */}
      </div>
    );
  }
}

export default Header;
