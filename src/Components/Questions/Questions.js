  import React, { Component } from 'react';
  import * as Survey from "survey-react";
  import "survey-react/survey.css";
  import style from "./questions.module.css"
  import CorrectAnswer from '../CorrectAnswer/CorrectAnswer';
  import Modal from './ModalWindow/Modal';
  import json from "../json"

  export default class Questions extends Component {

    constructor(props) {
      super(props)
      this.model = new Survey.Model(json);
      this.state = {
        isCorrectAnswer: false,
        isButtonClear: true,
        isModal:false

      };
      this.options = {
        allowComplete :true
      }

    }

    modalActionEvent = (action) => { //checks the user's response
       if (action.target.textContent === "Да") {
        
        this.saveResult(this.model.data)
        this.completedTest() //is causing the survey to be completed.
      } else {
        this.setState({
          isModal:false
        })
      }
    }

    saveResult = (data) => {   //saves the result to the local storage 
      let result = JSON.stringify(data);
      localStorage.setItem("result", result);

    }

    completedTest = () => {
      this.setState({
        isCorrectAnswer: true,
        isButtonClear: false,
        isModal:false
      })
      return this.model.isCompleted = true
    }


    onCompleting = (survey, options) => {   //is called up at the end of the survey

      if (survey.timeSpent >= json.maxTimeToFinish) { // if time runs out of test time automatically runs out
 
        this.saveResult(survey.data)
        return  this.completedTest()
      } 
      this.numberOfResponse(survey.data)
      return options.allowComplete  = false
    }

    numberOfResponse = (data) => {  // Verification of the number of responses entered

      const amountOfDate = data ? Object.keys(data).length : 8;

      if(amountOfDate < 7) {
          this.setState({
              isModal:true
          })
      } else {
        this.saveResult(this.model.data)
        this.completedTest()
      }
    }

    onClear = () => {

      return this.model.data = {} // clears the entered data object
    }

    render() {
      let modalShow = this.state.isModal

      return (<>
        <Survey.Survey model={this.model} onCompleting={this.onCompleting} />

        <Modal modalActionEvent={this.modalActionEvent} isModal={modalShow}/>

        {this.state.isButtonClear &&
          <button type="button" className={`btn btn-secondary ${style.clearButton}`} onClick={this.onClear}>
          Clear
          </button> }

        {this.state.isCorrectAnswer && 
          <CorrectAnswer correctAnswer={json.pages[1].elements} /> }

      </>
      );

    }
  }

