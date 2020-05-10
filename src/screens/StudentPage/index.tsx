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
  Modal,
  Carousel,
  DatePicker,
  notification,
  Timeline,
  Card,
  Descriptions,
  Popconfirm,
  Collapse,
  Progress,
  Spin
} from 'antd';

import history from "global/history";
import {
  Header,
  StudentProfileMenu,
  AdminProfileMenu,
  TrainerProfileMenu
} from 'components';
import "./style.sass";

interface StudentPageProps {
  authState?: any;
  trainerState?: any;
  profileState?: any;
}

@inject('authState', 'trainerState', 'profileState')
@observer
class StudentPage extends React.PureComponent<StudentPageProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTask: false,
      editTaskMode: false
      //selectedCourse: false,
      //createStudentModalVisible: false,
    };
  }

  componentDidMount = () => {
    const { init } = this.props.trainerState;
    init();
  };

  searchTaskInCompleted = (task: {
    title: string;
    description: string;
  }): any => {
    const { completedTasks } = this.props.trainerState;
    console.log(300);
    console.log(completedTasks);
    console.log(task);
    for (let i = 0; i < completedTasks.length; i += 1) {
      if (completedTasks[i].title == task.title) {
        return completedTasks[i];
      }
    }
    return false;
  };
  getCourseTasks = () => {
    const { courseTasks } = this.props.trainerState;

    return courseTasks.map(
      (task: {
        id: number;
        mark: number;
        title: string;
        description: string;
      }) => {
        return (
          <div
            onClick={() => {
              let isCompleted = this.searchTaskInCompleted(task);
              //console.log(isCompleted);
              if (isCompleted) {
                isCompleted = Object.assign({}, isCompleted);
                isCompleted.updateId = isCompleted.id;
                isCompleted.id = task.id;
                isCompleted.completed = true;
                this.setState({
                  editTaskMode: false,
                  selectedTask: isCompleted,
                });
              } else {
                this.setState({ editTaskMode: false, selectedTask: task });
              }
            }}
            className={
              this.state.selectedTask
                ? this.state.selectedTask.id == task.id
                  ? "taskItem taskItem_active"
                  : 'taskItem'
                : "taskItem"
            }
          >
            <Descriptions title={task.title}>
              <Descriptions.Item
                style={{ fontWeight: 'bold' }}
                span={2}
                label="Описание"
              >
                {task.description}
              </Descriptions.Item>

              <Descriptions.Item
                style={{ display: "flex", justifyContent: "flex-end" }}
                span={1}
              >
                {this.searchTaskInCompleted(task) ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleTwoTone
                      style={{ fontSize: '40px' }}
                      twoToneColor="#52c41a"
                    />
                  </div>
                ) : (
                  <div />
                )}
              </Descriptions.Item>
            </Descriptions>
            {/* <div className="taskItem__title">
              {task.title}
              <div>{this.searchTaskInCompleted(task) ? "completed" : ''}</div>
            </div>
            <div className="taskItem__description">{task.description}</div> */}
          </div>
        );
      }
    );
  };
  getProgress = () => {
    const { courseTasks } = this.props.trainerState;
    const { completedTasks } = this.props.trainerState;
    console.log(courseTasks.length);
    console.log(completedTasks.length);
    console.log(completedTasks.length / courseTasks.length);
    let percent = Math.round(
      (completedTasks.length / courseTasks.length) * 100
    );
    console.log(percent);
    return <Progress percent={percent} size="small" />;
  };
  getTaskInfo = () => {
    const { selectedTask, editTaskMode } = this.state;
    if (this.state.selectedTask) {
      if (selectedTask.completed != undefined) {
        if (editTaskMode) {
          return (
            <div className="edit">
              <div className="title">Редактирование оценки</div>
              <div>
                <Form
                  name="updateCompletedTask"
                  onFinish={values => {
                    this.props.trainerState.updateCompletedTask({
                      ...values,
                      id: selectedTask.updateId,
                      title: selectedTask.title,
                      description: selectedTask.description,
                    });
                    this.setState({ editTaskMode: false });
                  }}
                >
                  <Form.Item
                    label="Оценка"
                    name="mark"
                    rules={[
                      {
                        min: 0,
                        max: 10,
                        //type: 'number',
                        required: true,
                        message: 'Укажите оценку',
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    label="Комментарий"
                    name="feedback"
                    rules={[
                      {
                        required: true,
                        message: 'Укажите отзыв',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                </Form>
              </div>
              <Button
                onClick={() => {
                  this.setState({ editTaskMode: false });
                }}
              >
                Отмена
              </Button>
            </div>
          );
        }
        return (
          <div className="show">
            <div className="text">Оценка выставлена</div>
            <div className="container">
              <div className="title">{selectedTask.title}</div>
              <div className="description">{selectedTask.description}</div>
              <div className="mark">Оценка: {selectedTask.mark}</div>
            </div>
            <Button
              onClick={() => {
                this.setState({ editTaskMode: true });
              }}
            >
              Изменить оценку
            </Button>
          </div>
        );
      }
      return (
        <div className="create">
          <div className="title">Оценка не выставлена</div>
          <div>
            <Form
              name="createCompletedTask"
              onFinish={values => {
                this.props.trainerState.createCompletedTask({
                  ...values,
                  id: selectedTask.id,
                  title: selectedTask.title,
                  description: selectedTask.description
                });
              }}
            >
              <Form.Item
                label="Оценка"
                name="mark"
                rules={[
                  {
                    min: 0,
                    max: 10,
                    //type: 'number',
                    required: true,
                    message: 'Укажите оценку',
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Комментарий"
                name="feedback"
                rules={[
                  {
                    required: true,
                    message: 'Укажите отзыв',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Поставить
              </Button>
            </Form>
          </div>
        </div>
      );
    }

    return <div className="empty">Выберите задание</div>;
  };

  render() {
    const { selectedStudent, loading } = this.props.trainerState;
    const { myCourse } = this.props.profileState;

    if (loading) {
      return (
        <div className="pageContainer loadingContainer">
          <Header />
          <div className="spin">
            <Spin size="large" />
          </div>
        </div>
      );
    } else {
      return (
        <div className={"pageContainer studentPage"}>
          <Header />
          <div className="studentPage__top">
            <div className="card">
              <Card className="card_inner" title="Студент">
                <div>
                  {selectedStudent.firstname + " " + selectedStudent.surname}
                </div>
                <p> </p>
                <p>Курс: {myCourse.title}</p>
                <p> </p>
              </Card>
            </div>
            <div className="progress">
              Прогресс по курсу
              {this.getProgress()}
            </div>
          </div>
          <div className="studentPage__main">
            <div className="tasklist">{this.getCourseTasks()}</div>
            <div className="selectedTask">{this.getTaskInfo()}</div>
          </div>
        </div>
      );
    }
  }
}

export default StudentPage;
