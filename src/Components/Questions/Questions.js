  import React, { Component } from 'react';
  import * as Survey from "survey-react";
  import "survey-react/survey.css";
  import style from "./questions.module.css"
  import 'bootstrap/dist/css/bootstrap.css';
  import CorrectAnswer from '../CorrectAnswer/CorrectAnswer';

  export default class Questions extends Component {

    constructor(props) {
      super(props)
      this.json = {
        sendResultOnPageNext: true,
        title: "Тест первой недели курса",
        showTimerPanel: "top",
        maxTimeToFinish: 60,
        firstPageIsStarted: true,
        showTimerPanelMode: "survey",
        startSurveyText: "Начать тест",
        completeText: "Завершить",
        locale: "ru",
        isValueEmpty: false,
        pages: [
          {
            elements: [
              {
                type: "html",
                html: "Тест по химии первой недели нашего курса. <br/>У Вас будет 1 минута на прохождение теста. Тест включает в себя 7 вопросов.<br/>Нажмите<b> 'Начать тест '</b> что бы начать."
              },

            ]
          }, {
            elements: [
              {

                type: "text",
                name: "Bor in periodical system",
                title: "Какой номер имеет элемент Бор в Переодической системе химических элементов? (Ответ цифрой)",
                correctAnswer: 5,
                validators: [
                  {
                    type: "numeric",
                  }
                ]
              },
              {
                type: "checkbox",
                name: "metalls",
                title: "Какие элементы являються металлами?",
                choices: [
                  "Na ", "Br ", "Au ", "H ", "O "
                ],
                correctAnswer: ["Na ", "Au "]
              },
              {
                type: "radiogroup",
                name: "liquid",
                title: "Главный элемент участвующий в образовании неорганических кислот",
                choices: [
                  "K", "Li", "H", "Mg"
                ],
                correctAnswer: "H"
              },
              {
                type: "checkbox",
                name: "groups",
                title: "Выберите несколько элементов находящихся в одной группе",
                choices: [
                  "K", "Li", "Na", "Mg", "Rb", "Cs", "Fe", "Zn"
                ],
                correctAnswer: ["K ", "Li ", "Na ", "Rb ", "Cs "]
              },
              {
                type: "dropdown",
                choices: ["Кадмий", "Селен", "Рутений", "Уран", "Радон", "Гелий"],
                name: "elements",
                title: "Укажите самый летучий элемент.",
                correctAnswer: "Гелий"
              },
              {
                type: "radiogroup",
                name: "wolfram",
                title: "Какой элемент самый тугоплавкий?",
                choices: [
                  "Рутений", "Уран", "Цезий", "Вольфрам"
                ],
                correctAnswer: "Вольфрам"
              },
              {
                type: "text",
                name: "oxygen",
                title: "Укажите степень окисления кислорода (указать знак и цифру)",
                correctAnswer: -2,
                validators: [
                  {
                    type: "numeric",
                  }
                ]
              }
            ],
          }
        ],
        completedHtml: "<h4>Вы дали <b>{correctedAnswers}</b> правильных ответов из <b>{questionCount}</b>.Спасибо!</h4>"
      };
      this.model = new Survey.Model(this.json);
      this.state = {
        allowComplete: false,
        isModal: false,
        isCorrectAnswer: false,
        isButtonClear: true
      };

    }




    modalActionEvent = (action) => { //checks the user's response

      if (action.target.textContent === "Нет") {
        this.setState({
          isModal: false,
        })

      } else if (action.target.textContent === "Да") {
        this.setState({
          isModal: false,
          isCorrectAnswer: true,
          isButtonClear: false
        })
        this.saveResult(this.model.data)
        return this.model.isCompleted = true //is causing the survey to be completed.

      } else {
        return true
      }
    }

    saveResult = (data) => {   //saves the result to the local storage 
      let result = JSON.stringify(data);

      localStorage.setItem("result", result);
    }


    onCompleting = (survey, state) => {   //is called up at the end of the survey

      const booleanValue = this.numberOfResponse(survey.data);

      if (survey.timeSpent >= this.json.maxTimeToFinish) { // if time runs out of test time automatically runs out

        this.setState({
          isModal: false,
          isCorrectAnswer: true,
          isButtonClear: false
        })
        this.saveResult(survey.data)

        return this.model.isCompleted = true //is causing the survey to be completed.

      } else {
        return state.allowComplete = booleanValue

      }

    }

    onClear = () => {

      return this.model.data = {} // clears the entered data object
    }

    numberOfResponse = (data) => {  // Verification of the number of responses entered

      const amountOfDate = data ? Object.keys(data).length : 1;

      if (amountOfDate < 7) {

        this.setState({
          isModal: true
        })

        return false

      } else {
        return true
      }
    }




    render() {

      return (<>
        <Survey.Survey model={this.model} onCompleting={this.onCompleting} />

        {this.state.isModal ? <div className={style.modal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Предупреждение!</h5>

              </div>
              <div className="modal-body">
                Каждый не отвеченный ответ считаеться неправильным, Вы уверены что хотите продолжить?
                    </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.modalActionEvent}>Нет</button>
                <button type="button" className="btn btn-primary" onClick={this.modalActionEvent}>Да</button>
              </div>
            </div>
          </div>
        </div>
          : null}
        {this.state.isButtonClear ? <button type="button" className={`btn btn-secondary ${style.clearButton}`} onClick={this.onClear}>
          Clear
          </button> : null}

        {this.state.isCorrectAnswer ? <CorrectAnswer correctAnswer={this.json.pages[1].elements} /> : null}

      </>
      );

    }
  }

