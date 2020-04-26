import React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Input, Button, Checkbox } from 'antd';

import history from 'global/history';
import './style.sass';

interface AuthPageProps {
  authState?: any;
}

@inject("authState")
@observer
class AuthPage extends React.PureComponent<AuthPageProps> {
  onSubmit = (values: any) => {
    const { authState } = this.props;
    authState.tryLogin({ ...values });
  };

  render() {
    return (
      <div className={"pageContainer authPage"}>
        <Form
          className={'authFormContainer'}
          name="login"
          initialValues={{ remember: true }}
          onFinish={this.onSubmit}
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Пожалуйста введите логин" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={() => {
            history.push('/register');
          }}
        >
          На страницу регистрации
        </Button>
      </div>
    );
  }
}

export default AuthPage;
