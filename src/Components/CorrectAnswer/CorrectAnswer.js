  import React from "react";
  import style from "./correctAnswer.module.css"


  export default class CorrectAnswer extends React.Component {

    state = {
      isModal: false
    }

    render() {
      return <>
        <button type="button" className={`btn btn-primary ${style.btn}`} data-toggle="modal"
          data-target="#exampleModalLong"
          onClick={() => this.setState({ isModal: true })}>   {/* shows the modal window*/}
          Показать ответы на вопрос
        </button>

        {this.state.isModal ?
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ответы</h5>

              </div>
              <div className="modal-body">
                {this.props.correctAnswer.map((el, key) => {
                  return (
                    <div key={key}>
                      <div>Вопрос №{key + 1}</div>
                      <div>{el.correctAnswer} </div>   {/* outputs the right answers*/}
                    </div>
                  )
                })}


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary"
                  onClick={() => { this.setState({ isModal: false }) }}>   {/* hides a modal window*/}
                  OK
                </button>
              </div>
            </div>
          </div>
          : null}
      </>


    }
  }