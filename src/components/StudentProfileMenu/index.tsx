import React from 'react';
import { inject, observer } from "mobx-react";
import { CloseCircleFilled, CheckCircleTwoTone } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Tabs,
  List,
  Result,
  Modal,
  Carousel,
  DatePicker,
  notification,
  Descriptions,
  Timeline,
  Card,
  Popconfirm,
  Collapse,
  Spin
} from "antd";

import moment from 'moment';
import history from "global/history";
import "./style.sass";
import { toJS } from 'mobx';

const { Panel } = Collapse;

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

  componentWillUnmount = () => {
    this.props.profileState.clearStudentProfile();
  };

  getCoursesPane = () => {
    const { all_courses } = this.props.profileState;
    return (
      <>
        <div className="info">Выберите курс из представленных ниже</div>
        <div className={"allCourses"}>
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
                    <div className={'student-profile-menu__carousel-pane'}>
                      <div>
                        <div className="title">
                          Наименование курса: <div> {course.title}</div>
                        </div>
                        <div className="date">
                          <div>Даты проведения курсов</div>
                          <div>
                            {moment(course.startDate).format("YY-MM-DD")} --{' '}
                            {moment(course.endDate).format("YY-MM-DD")}
                          </div>
                        </div>
                        <div className="trainer">
                          <div>
                            Тренер:{" "}
                            {course.trainer.firstname +
                              " " +
                              course.trainer.secondname}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          if (this.state.selectedCourse) {
                            this.setState({ createStudentModalVisible: true });
                          }
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
              <div style={{ fontWeight: 800, marginBottom: '15px' }}>
                <div style={{ fontWeight: 400, marginBottom: '0px' }}>
                  Название курса:{' '}
                </div>
                {this.state.selectedCourse
                  ? this.state.selectedCourse.title
                  : null}
              </div>
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
      </>
    );
  };

  getCurrentTasks = () => {
    const { all_tasks_by_course } = this.props.profileState;
    return (
      <div>
        {all_tasks_by_course.map(
          (task: { description: string; title: string }) => {
            return (
              <div className="task">
                <Descriptions title={task.title}>
                  <Descriptions.Item label="Описание">
                    {task.description}
                  </Descriptions.Item>
                </Descriptions>
                {/* <div className="title">{task.title}</div>
                <div className="desctiption">{task.description}</div> */}
              </div>
            );
          }
        )}
      </div>
    );
  };

  getMarkedTasks = () => {
    const { completedTasks } = this.props.profileState;
    return (
      <div>
        {completedTasks.map(
          (task: {
            mark: number;
            description: string;
            feedback: string;
            title: string;
          }) => {
            return (
              <div className="task">
                <Descriptions title={task.title}>
                  <Descriptions.Item
                    style={{ fontWeight: 'bold' }}
                    span={2}
                    label="Описание"
                  >
                    {task.description}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label="Оценка">
                    {task.mark}
                  </Descriptions.Item>
                  <Descriptions.Item span={3}>
                    {task.mark >= 4 ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleTwoTone
                          style={{ fontSize: '30px' }}
                          twoToneColor="#52c41a"
                        />{' '}
                        Задание выполнено на положительную оценку
                      </div>
                    ) : (
                      <div>
                        <CloseCircleFilled style={{ fontSize: '30px' }} />{' '}
                        Задание не выполнено, свяжитесь с преподавателем
                      </div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Отзыв">
                    {task.feedback}
                  </Descriptions.Item>
                </Descriptions>
                {/* <div className="title">{task.title}</div>
                <div className="desctiption">{task.description}</div> */}
              </div>
            );
          }
        )}
      </div>
    );
  };

  getMyCoursePane = () => {
    const { myCourse, loginedStudent } = this.props.profileState;
    console.log(toJS(myCourse));
    return (
      <div className={"myCourses"}>
        <div className="course">
          <Card
            extra={
              <Popconfirm
                okText="Да"
                onConfirm={() => {
                  this.leaveCourse();
                }}
                cancelText="Нет"
                title="Вы уверены что хотите отказаться от курса?"
              >
                <a>Отказаться от курса</a>
              </Popconfirm>
            }
            title={'Курс:  ' + myCourse.title}
          >
            <div>
              <Card className="trainer" title="Тренер">
                <p>Имя: {myCourse.trainer.firstname}</p>
                <p>Фамилия: {myCourse.trainer.surname}</p>
                <a>Профиль</a>
              </Card>
              <Timeline>
                <Timeline.Item color="green">
                  Начало курса:
                  {' ' + moment(myCourse.startDate).format('YYYY-MM-DD')}
                </Timeline.Item>
                <Timeline.Item color="red">
                  <p>
                    Окончание курса:{' '}
                    {' ' + moment(myCourse.endDate).format('YYYY-MM-DD')}
                  </p>
                  <p>Выдача сертификатов</p>
                </Timeline.Item>
              </Timeline>
            </div>
          </Card>
        </div>
        <div className="tasks">
          <div className="student">
            <Card title="Студент">
              <div>
                {loginedStudent.firstname +
                  " " +
                  loginedStudent.surname +
                  " " +
                  loginedStudent.secondname}
              </div>
              <div />
            </Card>
          </div>
          <div className="tasks">
            <Collapse className="collapse">
              <Panel header="Текущие задания" key="1">
                {this.getCurrentTasks()}
              </Panel>
            </Collapse>
            <Collapse className="collapse">
              <Panel header="Проверенные задания" key="1">
                {this.getMarkedTasks()}
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { myCourse, loading } = this.props.profileState;
    return (
      <div className={"student-profile-menu"}>
        {loading ? (
          <div className="spin">
            <Spin size="large" />
          </div>
        ) : myCourse ? (
          this.getMyCoursePane()
        ) : (
          this.getCoursesPane()
        )}
      </div>
    );
  }

  registerStudent = async (values: any) => {
    const { showAlert, login, password, role } = this.props.authState;
    //const { selectedUser } = this.state;
    const { createStudent, getLoginedStudent } = this.props.profileState;
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

      await getLoginedStudent({ username: login });
      this.setState({ createTrainerModalVisible: false });
      showAlert('Вы успешно записаны на курс');
    } catch (e) {
      this.setState({ createTrainerModalVisible: false });
      showAlert('Тренер не создан');
    }
    console.log(values);
  };

  leaveCourse = async () => {
    const { login } = this.props.authState;
    const {
      initStudentProfile,
      getLoginedStudent,
      leaveCourse
    } = this.props.profileState;
    await leaveCourse();
    initStudentProfile();
    getLoginedStudent({ username: login });
  };
}

export default StudentProfileMenu;
