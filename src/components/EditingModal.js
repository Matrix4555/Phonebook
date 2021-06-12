import React from 'react';

import {checkInput, checkPhone, checkEmail, checkAndGetInputs} from '../modalFunctions';

export function EditingModal(props) {

    function finish() {

        const result = checkAndGetInputs();
        if(!result)
            return;

        props.edit(result, props.data.id);
        window.$('#editing-modal').modal('hide');
    }

    function cancel() {
        props.edit('cancel');
    }

    return(
        <div className="modal fade" id="editing-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Редактирование</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="col-form-label">Фамилия:</label>
                                <input id="input-surname" type="text" className="form-control" onChange={() => checkInput('surname')} defaultValue={props.data?.surname} />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Имя:</label>
                                <input id="input-name" type="text" className="form-control" onChange={() => checkInput('name')} defaultValue={props.data?.name}/>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Телефон:</label>
                                <input id="input-phone" type="text" className="form-control" onChange={checkPhone} defaultValue={props.data?.phone}/>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Email:</label>
                                <input id="input-email" type="text" className="form-control" onChange={checkEmail} defaultValue={props.data?.email}/>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Дата рождения:</label>
                                <input id="input-birthday" type="date" className="form-control" onChange={() => checkInput('birthday')} defaultValue={props.data?.birthday}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Отмена</button>
                        <button type="button" className="btn btn-success" onClick={finish}>Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
