import React from "react";
import { inject, observer } from "mobx-react";

import { Form, Input, Button, Checkbox } from "antd";

import history from "global/history";
import "./style.sass";

interface AuthPageProps {
  authState?: any;
}

@inject('authState')
@observer
class AuthPage extends React.PureComponent<AuthPageProps> {
  onSubmit = (values: any) => {
    const { authState } = this.props;
    authState.tryLogin({ ...values });
  };

  componentDidMount() {
    this.props.authState.autoLogin();
  }

  render() {
    return (
      <div className={'pageContainer authPage'}>
        <div className={"authFormContainer"}>
          <div className="left">Даунский текст про курсы</div>
          <Form
            className={"right"}
            name="login"
            initialValues={{ remember: true }}
            onFinish={this.onSubmit}
          >
            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Логин"
              name="login"
              rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Пожалуйста введите пароль" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ fontWeight: "bold" }}
                type="primary"
                htmlType="submit"
              >
                Вход
              </Button>
            </Form.Item>

            <Button
              className="register_link"
              type="link"
              onClick={() => {
                history.push("/register");
              }}
            >
              На страницу регистрации
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AuthPage;
