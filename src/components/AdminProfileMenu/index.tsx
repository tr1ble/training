import React from 'react';
import { inject, observer } from 'mobx-react';

import moment from 'moment';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Tabs,
  List,
  Modal,
  Carousel,
  DatePicker,
  notification,
} from "antd";

import { CaretLeftFilled } from '@ant-design/icons';

import history from "global/history";
import "./style.sass";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface MenuProps {
  authState?: any;
  profileState?: any;
}

@inject('authState', 'profileState')
@observer
class AdminProfileMenu extends React.PureComponent<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedUser: false,
      selectedTrainer: false,
      selectedStudent: false,
      selected: false,
      createTrainerModalVisible: false,
      createCourseMode: false,
      selectedCourse: false,
    };
    this.createTrainer = this.createTrainer.bind(this);
    this.createCourse = this.createCourse.bind(this);
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
                  ? "admin-profile-menu__users__selected"
                  : "admin-profile-menu__users__unselected"
              }
              onClick={() => {
                this.setState({
                  selectedUser: user,
                  select: 'user'
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

  getStudentsList() {
    const { all_students } = this.props.profileState;
    //const { login } = this.state.selectedStudent;
    interface student {
      firstname: string;
      surname: string;
      user: {
        login: string;
      };
      // login: string;
      // role: string;
      // password: string;
    }
    return (
      <List
        size="default"
        bordered
        dataSource={all_students}
        renderItem={(student: student) => {
          return (
            <List.Item
              // className={
              //   login == user.login
              //     ? "admin-profile-menu__users__selected"
              //     : "admin-profile-menu__users__unselected"
              // }
              onClick={() => {
                this.setState({
                  selectedUser: student,
                  select: 'student'
                });
              }}
            >
              <div>
                <p>Логин {student.user.login}</p>
                {/* <p>Имя {student.firstname}</p> */}
                {/* <p>Фамилия {student.surname}</p> */}
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
      busy: boolean;
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
                  ? "admin-profile-menu__users__selected"
                  : "admin-profile-menu__users__unselected"
              }
              onClick={() => {
                this.setState({
                  selectedTrainer: trainer,
                  select: 'trainer'
                });
              }}
            >
              <div>
                {trainer.user.login} /{' '}
                {trainer.busy === false ? "не занят" : "Занят"}
              </div>
            </List.Item>
          );
        }}
      />
    );
  }

  getActions() {
    switch (this.state.select) {
      case "user":
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
                </Button>
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
                    { required: true, message: "Пожалуйста введите имя" }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Фамилия"
                  name="secondname"
                  rules={[
                    { required: true, message: "Пожалуйста введите фамилию" }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Отчество"
                  name="surname"
                  rules={[
                    { required: true, message: "Пожалуйста введите отчество" }
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

      case "trainer":
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

  getShowCoursesPane() {
    const { all_courses } = this.props.profileState;
    return (
      <div>
        <Carousel
          afterChange={currentSlide => {
            this.setState({ selectedCourse: all_courses[currentSlide] });
          }}
          className={"admin-profile-menu__carousel"}
        >
          {all_courses.map(
            (course: {
              id: number;
              title: string;
              startDate: string;
              endDate: string;
              trainer: {
                firstname: string;
                secondname: string;
                surname: string;
                user: {
                  login: string;
                };
              };
            }) => {
              return (
                <div className={"admin-profile-menu__carousel-pane"}>
                  <div className={"admin-profile-menu__carousel-pane"}>
                    <div>{course.title}</div>
                    <div>
                      {course.startDate}-{course.endDate}
                    </div>
                    <div>{course.trainer.user.login}</div>
                    <div>
                      {course.trainer.firstname} / {course.trainer.secondname}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </Carousel>

        <div>
          <Button
            onClick={this.deleteCourse}
            disabled={!this.state.selectedCourse}
          >
            Удалить курс
          </Button>
        </div>
        <Button
          onClick={() => {
            this.setState({ createCourseMode: true });
          }}
        >
          Создать новый курс
        </Button>
      </div>
    );
  }

  getCreateCoursePane() {
    return (
      <div>
        <CaretLeftFilled
          onClick={() => {
            this.setState({ createCourseMode: false });
          }}
          style={{ fontSize: "40px" }}
        />
        <Form name="createCourse" onFinish={this.createCourse}>
          <Form.Item
            label="Название курса"
            name="title"
            rules={[
              { required: true, message: 'Пожалуйста введите название курса' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Дата начала и окончания"
            name="date"
            rules={[{ required: true, message: "Пожалуйста введите даты" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  render() {
    const { logOut, role, login } = this.props.authState;
    const { initAdminPage } = this.props.profileState;

    return (
      <div className={'admin-profile-menu'}>
        <div className="admin-profile-menu__users">
          <Tabs className={"admin-profile-menu__tabs"} defaultActiveKey="users">
            <TabPane
              className={"admin-profile-menu__tab-pane"}
              tab="Users"
              key="users"
            >
              {this.getUsersList()}
            </TabPane>
            <TabPane tab="Students" key="students">
              {this.getStudentsList()}
            </TabPane>
            <TabPane tab="Trainers" key="trainers">
              {this.getTrainersList()}
            </TabPane>
          </Tabs>
          {this.getActions()}
        </div>
        <div className="admin-profile-menu__courses">
          {this.state.createCourseMode
            ? this.getCreateCoursePane()
            : this.getShowCoursesPane()}
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
        showAlert('Пользователь успешно удалён');
      })
      .catch(() => {
        showAlert('Ошибка при удалении пользователя');
      });
  }

  deleteTrainer() {
    const { user } = this.state.selectedTrainer;
    const { deleteTrainer } = this.props.profileState;
    const { showAlert } = this.props.authState;
    deleteTrainer({
      login: user.login,
      password: user.password,
      id: this.state.selectedTrainer.id
    })
      .then(() => {
        showAlert('Тренер успешно удалён');
      })
      .catch(() => {
        showAlert('Ошибка при удалении тренера');
      });
  }

  deleteCourse = () => {
    const { id } = this.state.selectedCourse;
    const { deleteCourse } = this.props.profileState;
    const { showAlert } = this.props.authState;
    deleteCourse({
      id
    })
      .then(() => {
        showAlert('Курс успешно удалён');
      })
      .catch(() => {
        showAlert('Ошибка при удалении тренера');
      });
  };

  async createTrainer(values: any) {
    const { showAlert } = this.props.authState;
    const { selectedUser } = this.state;
    const { createTrainer } = this.props.profileState;
    try {
      await createTrainer({
        ...values,
        user: selectedUser,
      });
      this.setState({ createTrainerModalVisible: false });
      showAlert('Тренер создан');
    } catch (e) {
      this.setState({ createTrainerModalVisible: false });
      showAlert('Тренер не создан');
    }
    console.log(values);
  }

  async createCourse(values: any) {
    const { showAlert } = this.props.authState;
    const { selectedUser, selectedTrainer } = this.state;
    const { createCourse } = this.props.profileState;
    console.log(values);
    const startDate = values.date[0].format('YYYY-MM-DD');
    const endDate = values.date[0].format('YYYY-MM-DD');

    if (selectedTrainer) {
      console.log(selectedTrainer);
      await createCourse({
        title: values.title,
        startDate,
        endDate,
        trainer: selectedTrainer
      });
      showAlert("Курс создан");
    } else {
      notification.open({
        style: {
          backgroundColor: "#e05a5a"
        },
        message: "Ошибка",
        description: "Выберите тренера"
      });
    }
  }
}

export default AdminProfileMenu;
