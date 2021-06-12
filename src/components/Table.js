import React from 'react';
import { AddingModal } from './AddingModal';
import { EditingModal } from './EditingModal';
import $ from 'jquery';

export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            addingModal: false,
            editingModal: false,
            editingData: null
        };
        this.contacts = [];
    }

    runAdding() {
        this.setState({addingModal: true});
        setTimeout(() => window.$('#adding-modal').modal('show'), 0);
    }

    add(newPerson) {
        if(newPerson === 'cancel') {
            this.setState({addingModal: false});
            return;
        }

        newPerson.id = this.contacts.length + 1;
        this.contacts.push(newPerson);
        this.setState({
            persons: this.contacts,
            addingModal: false
        });

        $('#filter').val('');
    }

    runEditing(id) {
        const selectedPerson = this.state.persons.find(el => el.id === id);
        this.setState({
            editingModal: true,
            editingData: {
                id: id,
                surname: selectedPerson.surname,
                name: selectedPerson.name,
                phone: selectedPerson.phone,
                email: selectedPerson.email,
                birthday: this.changeDateFormat(selectedPerson.birthday)
            }
        });
        setTimeout(() => window.$('#editing-modal').modal('show'), 0);
    }

    edit(changedPerson, id) {
        if(changedPerson === 'cancel') {
            this.setState({
                editingModal: false,
                editingData: null
            });
            return;
        }

        changedPerson.id = id;
        this.contacts[id - 1] = changedPerson;          // -1 because id is greater than index
        this.setState({
            persons: this.contacts,
            editingModal: false,
            editingData: null
        });

        $('#filter').val('');
    }

    delete(id) {
        this.contacts.splice(id - 1, 1);
        this.contacts.forEach(el => {
            if(el.id > id)
                el.id--;
        });

        this.setState({
            persons: this.contacts
        });

        $('#filter').val('');
    }

    filter() {
        const value = $('#filter').val().toLowerCase();
        if(!value) {
            this.resetFilter();
            return;
        }
        this.setState({
            persons: this.contacts.filter(el => el.name.toLowerCase().includes(value) || el.surname.toLowerCase().includes(value))
        });
    }

    resetFilter() {
        $('#filter').val('');
        this.setState({
            persons: this.contacts
        });
    }

    changeDateFormat(original) {
        const year = original.slice(6);
        const month = original.slice(3, 5);
        const day = original.slice(0, 2);
        return `${year}-${month}-${day}`;
    }

    itsBirthdayToday(person) {
         
        let dayNow = new Date().getDate().toString();
        let monthNow = (new Date().getMonth() + 1).toString();

        if(dayNow < 10)
            dayNow = '0' + dayNow;
        if(monthNow < 10)
            monthNow = '0' + monthNow;

        const now = dayNow + '.' + monthNow;
        const dob = person.birthday.slice(0, 5);

        return now === dob;
    }

    render() {
        return(
            <div>
                <div className="input-group mb-3">
                    <button className="btn btn-primary" onClick={() => this.runAdding()}>Добавить новый контакт</button>
                    <input type="text" className="form-control" placeholder="Искать по имени или фамилии..." id="filter"/>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => this.filter()}>Искать</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => this.resetFilter()}>Сбросить</button>
                </div>
                {this.state.addingModal ? <AddingModal add={this.add.bind(this)}/> : null}
                {this.state.editingModal ? <EditingModal data={this.state.editingData} edit={this.edit.bind(this)}/> : null}   
                <table className="table table-bordered border-primary">
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>День рождения</th>
                    {this.state.persons.map(el => {
                        const paint = this.itsBirthdayToday(el) ? 'paint-birthday' : null;
                        return(
                            <tr key={el.id}>
                                <td className={paint}>{el.surname} {el.name}</td>
                                <td className={paint}>{el.phone}</td>
                                <td className={paint}>{el.email}</td>
                                <td className={paint}>{el.birthday}</td>
                                <td>
                                    <div className="table-buttons">
                                        <button className="table-button btn btn-success" onClick={() => this.runEditing(el.id)}>Редактировать</button>
                                        <button className="table-button btn btn-danger" onClick={() => this.delete(el.id)}>Удалить</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}
