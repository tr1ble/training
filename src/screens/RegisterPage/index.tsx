import React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Input, Button, Checkbox, Radio } from 'antd';

import history from 'global/history';
import './style.sass';

interface RegisterPageProps {
  authState?: any;
}

@inject("authState")
@observer
class RegisterPage extends React.PureComponent<RegisterPageProps> {
  onSubmit = (values: any) => {
    const { authState } = this.props;
    console.log(values);
    authState.tryRegister({ ...values });
  };

  render() {
    return (
      <div className={"pageContainer registerPage"}>
        <Form
          className="registerFormContainer"
          name="register"
          initialValues={{ remember: true }}
          onFinish={this.onSubmit}
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
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

          {/* <Form.Item  label="Роль" required = {true} name="role">
            <Radio.Group >
              <Radio.Button value="ROLE_STUDENT">Студент</Radio.Button>
              <Radio.Button value="ROLE_TRAINER">Тренер</Radio.Button>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
          <Button
            type="link"
            onClick={() => {
              history.goBack();
            }}
          >
            На страницу логина
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegisterPage;
