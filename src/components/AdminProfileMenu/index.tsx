import React from "react";
import { inject, observer } from "mobx-react";

import { Form, Input, Button, Checkbox, Radio, Tabs, List, Modal } from 'antd';

import history from 'global/history';
import './style.sass';

const { TabPane } = Tabs;

interface MenuProps {
  authState?: any;
  profileState?: any;
}

@inject("authState", "profileState")
@observer
class AdminProfileMenu extends React.PureComponent<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedUser: false,
      selectedTrainer: false,
      selected: false,
      createTrainerModalVisible: false,
    };
    this.createTrainer = this.createTrainer.bind(this);
  }

  componentDidMount() {
    const { initAdminPage } = this.props.profileState;
    initAdminPage();
  }

  getUsersList() {
    const { all_users } = this.props.profileState;
    const { login } = this.state.selectedUser;
    interface user {
      login: string;
      role: string;
      password: string;
    }
    return (
      <List
        size="default"
        bordered
        dataSource={all_users}
        renderItem={(user: user) => {
          return (
            <List.Item
              className={
                login == user.login
                  ? 'admin-profile-menu__users__selected'
                  : 'admin-profile-menu__users__unselected'
              }
              onClick={() => {
                this.setState({
                  selectedUser: user,
                  select: "user",
                });
              }}
            >
              <div>
                {user.login} {user.role}
              </div>
            </List.Item>
          );
        }}
      />
    );
  }

  getTrainersList() {
    const { all_trainers } = this.props.profileState;
    const { user } = this.state.selectedTrainer;
    interface trainer {
      id: number;
      firstname: string;
      surname: string;
      secondname: string;
      user: {
        login: string;
        role: string;
        password: string;
      };
    }

    const login = user ? (user.login ? user.login : undefined) : undefined;
    console.log(all_trainers);
    return (
      <List
        size="default"
        bordered
        dataSource={all_trainers}
        renderItem={(trainer: trainer) => {
          return (
            <List.Item
              className={
                login == trainer.user.login
                  ? 'admin-profile-menu__users__selected'
                  : 'admin-profile-menu__users__unselected'
              }
              onClick={() => {
                this.setState({
                  selectedTrainer: trainer,
                  select: "trainer",
                });
              }}
            >
              <div>{trainer.user.login}</div>
            </List.Item>
          );
        }}
      />
    );
  }

  getActions() {
    switch (this.state.select) {
      case 'user':
        return (
          <div className="admin-profile-menu__actions">
            <Button
              onClick={() => {
                this.deleteUser();
              }}
            >
              Удалить пользователя
            </Button>
            <Button
              onClick={() => {
                this.setState({ createTrainerModalVisible: true });
              }}
            >
              Создать тренера
            </Button>
            <Modal
              title="Добавить тренера"
              visible={this.state.createTrainerModalVisible}
              footer={[
                <Button
                  key="back"
                  onClick={() => {
                    this.setState({ createTrainerModalVisible: false });
                  }}
                >
                  Отмена
                </Button>,
              ]}
              onCancel={() => {
                this.setState({ createTrainerModalVisible: false });
              }}
            >
              <Form name="createTrainer" onFinish={this.createTrainer}>
                <Form.Item
                  label="Имя"
                  name="firstname"
                  rules={[
                    { required: true, message: 'Пожалуйста введите имя' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Фамилия"
                  name="secondname"
                  rules={[
                    { required: true, message: 'Пожалуйста введите фамилию' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Отчество"
                  name="surname"
                  rules={[
                    { required: true, message: 'Пожалуйста введите отчество' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </Form>
            </Modal>
          </div>
        );

      case 'trainer':
        return (
          <div className="admin-profile-menu__actions">
            <Button
              onClick={() => {
                this.deleteTrainer();
              }}
            >
              Забрать роль тренера
            </Button>
          </div>
        );
      default:
        return (
          <div className="admin-profile-menu__actions">
            <div>Выберите пользователя</div>
          </div>
        );
    }
  }

  render() {
    const { logOut, role, login } = this.props.authState;
    const { initAdminPage } = this.props.profileState;

    return (
      <div className={"admin-profile-menu"}>
        <div className="admin-profile-menu__users">
          <Tabs className={'admin-profile-menu__tabs'} defaultActiveKey="users">
            <TabPane
              className={'admin-profile-menu__tab-pane'}
              tab="Users"
              key="users"
            >
              {this.getUsersList()}
            </TabPane>
            <TabPane tab="Students" key="students">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Trainers" key="trainers">
              {this.getTrainersList()}
            </TabPane>
          </Tabs>
          {this.getActions()}
        </div>
        <div className="admin-profile-menu__courses">
          <div>
            {/* //Courses <Button onClick={initAdminPage}>init</Button> */}
          </div>
        </div>
      </div>
    );
  }

  deleteUser() {
    const { login } = this.state.selectedUser;
    const { deleteUser } = this.props.profileState;
    const { showAlert } = this.props.authState;
    deleteUser({ login })
      .then(() => {
        showAlert("Пользователь успешно удалён");
      })
      .catch(() => {
        showAlert("Ошибка при удалении пользователя");
      });
  }

  deleteTrainer() {
    const { user } = this.state.selectedTrainer;
    const { deleteTrainer } = this.props.profileState;
    const { showAlert } = this.props.authState;
    //console.log(this.state.selectedTrainer);
    deleteTrainer({
      login: user.login,
      password: user.password,
      id: this.state.selectedTrainer.id,
    })
      .then(() => {
        showAlert("Тренер успешно удалён");
      })
      .catch(() => {
        showAlert("Ошибка при удалении тренера");
      });
  }

  async createTrainer(values: any) {
    const { showAlert } = this.props.authState;
    const { selectedUser } = this.state;
    const { createTrainer } = this.props.profileState;
    try {
      await createTrainer({
        ...values,
        user: selectedUser
      });
      this.setState({ createTrainerModalVisible: false });
      showAlert("Тренер создан");
    } catch (e) {
      this.setState({ createTrainerModalVisible: false });
      showAlert("Тренер не создан");
    }
    console.log(values);
  }
}

export default AdminProfileMenu;
