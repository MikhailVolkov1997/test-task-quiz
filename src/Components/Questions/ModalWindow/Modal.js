import React from "react" 
import 'bootstrap/dist/css/bootstrap.css';
import style from "./modal.module.css"



export default class Modal extends React.Component {
     

    hideModal = (action) => {
        
        this.props.modalActionEvent(action)
    }

 
    render () {
        return (
            <div>
            {
                this.props.isModal && <div className={style.modal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Предупреждение!</h5>

                            </div>
                            <div className="modal-body">
                                Каждый не отвеченный ответ считаеться неправильным, Вы уверены что хотите продолжить?
                    </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                 onClick={this.hideModal}>Нет</button>
                                <button type="button" className="btn btn-primary" onClick={this.hideModal}>Да</button>
                            </div>
                        </div>
                    </div>
                </div>
                    
            }
            </div>
        )
    }
}