import React from 'react';
import { inject, observer } from "mobx-react";

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

import history from "global/history";
import "./style.sass";

interface MenuProps {
  authState?: any;
  profileState?: any;
}

@inject("authState", "profileState")
@observer
class StudentProfileMenu extends React.PureComponent<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCourse: false,
      createStudentModalVisible: false,
    };
  }

  componentDidMount() {
    const { login } = this.props.authState;
    const { initStudentProfile, getLoginedStudent } = this.props.profileState;
    initStudentProfile();
    getLoginedStudent({ username: login });
  }

  getCoursesPane = () => {
    const { all_courses } = this.props.profileState;
    return (
      <div>
        <Carousel
          autoplay={!this.state.createStudentModalVisible}
          afterChange={currentSlide => {
            this.setState({ selectedCourse: all_courses[currentSlide] });
          }}
          className={"student-profile-menu__carousel"}
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
                <div className={"student-profile-menu__carousel-pane"}>
                  <div className={"student-profile-menu__carousel-pane"}>
                    <div>
                      <div>{course.title}</div>
                      <div>
                        {course.startDate}-{course.endDate}
                      </div>
                      <div>{course.trainer.user.login}</div>
                      <div>
                        {course.trainer.firstname} / {course.trainer.secondname}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        this.setState({ createStudentModalVisible: true });
                      }}
                    >
                      Записаться на курс
                    </Button>
                  </div>
                </div>
              );
            }
          )}
        </Carousel>
        <Modal
          title="Запись на курс"
          visible={this.state.createStudentModalVisible}
          footer={[
            <Button
              key="back"
              onClick={() => {
                this.setState({ createStudentModalVisible: false });
              }}
            >
              Отмена
            </Button>,
          ]}
          onCancel={() => {
            this.setState({ createStudentModalVisible: false });
          }}
        >
          <Form name="createTrainer" onFinish={this.registerStudent}>
            <div>Название курса: {this.state.selectedCourse.title}</div>
            <Form.Item
              label="Имя"
              name="firstname"
              rules={[{ required: true, message: "Пожалуйста введите имя" }]}
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
              Записаться
            </Button>
          </Form>
        </Modal>
      </div>
    );
  };

  getMyCoursePane = () => {
    return <div>test</div>;
  };

  render() {
    const { myCourse } = this.props.profileState;
    return (
      <div className={"student-profile-menu"}>
        <div className={"allCourses"}>
          {myCourse ? this.getMyCoursePane() : this.getCoursesPane()}
        </div>
      </div>
    );
  }

  registerStudent = async (values: any) => {
    const { showAlert, login, password, role } = this.props.authState;
    //const { selectedUser } = this.state;
    const { createStudent } = this.props.profileState;
    try {
      await createStudent({
        ...values,
        course: this.state.selectedCourse,
        user: {
          login,
          password,
          role
        }
      });
      this.setState({ createTrainerModalVisible: false });
      showAlert('Запись на курс успешна');
    } catch (e) {
      this.setState({ createTrainerModalVisible: false });
      showAlert('Тренер не создан');
    }
    console.log(values);
  };
}

export default StudentProfileMenu;
