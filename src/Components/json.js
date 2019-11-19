  let json = {
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
              "Na ", "Br", "Au ", "H", "O"
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
              "K ", "Li ", "Na ", "Mg ", "Rb ", "Cs ", "Fe ", "Zn "
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
  export default json;