import React from 'react';
import { inject, observer } from 'mobx-react';

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
  Timeline,
  Card,
  Popconfirm,
  Collapse,
  Spin,
} from "antd";

import history from "global/history";
import "./style.sass";

const { Panel } = Collapse;

interface MenuProps {
  authState?: any;
  trainerState?: any;
  profileState?: any;
}

@inject('authState', 'profileState', 'trainerState')
@observer
class TrainerProfileMenu extends React.PureComponent<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      createTaskModalVisible: false,
      //selectedCourse: false,
      //createStudentModalVisible: false,
    };
  }

  componentDidMount = () => {
    const { login } = this.props.authState;
    const {
      initTrainerProfile,
      getLoginedTrainer,
      myCourse,
    } = this.props.profileState;
    initTrainerProfile();
    getLoginedTrainer({ username: login });
  };

  getMyStudents = () => {
    const {
      all_students_by_course,
      all_tasks_by_course,
      myCourse
    } = this.props.profileState;
    return all_students_by_course.map(
      (student: {
        id: number;
        firstname: string;
        surname: string;
        secondname: string;
      }) => {
        return (
          <div
            onClick={() => {
              this.props.trainerState.selectedStudent = student;
              console.log(500);
              console.log(myCourse);
              this.props.trainerState.course = { ...myCourse };
              this.props.trainerState.courseTasks = all_tasks_by_course;
              history.push("student");
            }}
            className="items"
          >
            {student.firstname + student.surname}
          </div>
        );
      }
    );
  };

  getMyTasks = () => {
    const { all_tasks_by_course } = this.props.profileState;
    return all_tasks_by_course.map(
      (task: { title: string; mark: number; description: string }) => {
        return (
          <div className="taskItem">
            <div className="taskItem__title">{task.title}</div>
            <div className="taskItem__description">{task.description}</div>
          </div>
        );
      }
    );
  };

  getNoCoursePane = () => {
    return (
      <>
        <div className="trainer">
          <div>
            <Card title="Тренер">Вы не ведёте курсов</Card>
          </div>
        </div>
        <div className="tasks">
          <div>
            <Card title="Тренер">Вы не ведёте курсов</Card>
          </div>
        </div>
      </>
    );
  };

  createTask = async (values: any) => {
    const { showAlert, login, password, role } = this.props.authState;
    const { createTask, getLoginedTrainer } = this.props.profileState;
    try {
      await createTask({
        ...values,
      });
      await getLoginedTrainer({ username: login });
      this.setState({ createTaskModalVisible: false });
    } catch (e) {
      this.setState({ createTaskModalVisible: false });
      showAlert('Тренер не создан');
    }
    console.log(values);
  };

  addTaskModal = () => {
    return (
      <Modal
        title="Создание задания"
        visible={this.state.createTaskModalVisible}
        footer={[
          <Button
            key="back"
            onClick={() => {
              this.setState({ createTaskModalVisible: false });
            }}
          >
            Отмена
          </Button>
        ]}
        onCancel={() => {
          this.setState({ createTaskModalVisible: false });
        }}
      >
        <Form name="createTask" onFinish={this.createTask}>
          <Form.Item
            label="Название задания"
            name="title"
            rules={[
              { required: true, message: 'Пожалуйста укажите название задания' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="description"
            rules={[{ required: true, message: 'Пожалуйста укажите описание' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form>
      </Modal>
    );
  };

  getCoursePane = () => {
    const { myCourse, loginedTrainer } = this.props.profileState;
    return (
      <>
        <div className="trainer">
          {this.addTaskModal()}
          <div>
            <Card title="Тренер">
              <div>
                {loginedTrainer.firstname + " " + loginedTrainer.surname}
              </div>
              <p> </p>
              <p>Курс: {myCourse.title}</p>
              <p> </p>
            </Card>
          </div>
          <div>
            <Card title="Мои студенты">
              <Collapse>
                <Panel header="Список" key="0">
                  {this.getMyStudents()}
                </Panel>
              </Collapse>
            </Card>
          </div>
        </div>
        <div className="tasks">
          <div>
            <Card
              extra={
                <Button
                  onClick={() => {
                    this.setState({ createTaskModalVisible: true });
                  }}
                >
                  Добавить задание
                </Button>
              }
              title="Задания курса"
            >
              <div className="tasklist">{this.getMyTasks()}</div>
            </Card>
          </div>
          {/* <div>
            <Collapse>
              <Panel header="Прошлые задания" key={0}>
                <Card>
                  <div className="tasklist">{this.getMyTasks()}</div>
                </Card>
              </Panel>
            </Collapse>
          </div> */}
        </div>
      </>
    );
  };

  render() {
    const { myCourse, loading } = this.props.profileState;
    //const { logOut, role, login } = this.props.authState;
    return (
      <div className={'trainer-profile-menu'}>
        {loading ? (
          <div className="spin">
            <Spin size="large" />
          </div>
        ) : myCourse ? (
          this.getCoursePane()
        ) : (
          this.getNoCoursePane()
        )}
      </div>
    );
  }
}

export default TrainerProfileMenu;
