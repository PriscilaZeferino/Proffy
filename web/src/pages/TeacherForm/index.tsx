import React from 'react';
import { useState } from 'react';


import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import "./styles.css"

function TeacherForm() {

    const [scheduleItems, setScheduleItems] = useState([    
            { week_day: 0, from:'8:00 AM', to: '4:00 PM'},
            { week_day: 2, from:'10:00 AM', to: '6:00 PM'},

    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from:'', to: ''}
        
        ]);
    }
    
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input name="name" label="Nome completo"/>
                    <Input name="avatar" label="avatar"/>
                    <Input name="whatsapp" label="whatsapp"/>
                    <Textarea name="bio" label="Biografia"/>
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select 
                        name="subject"
                        label="Matéria"
                        options={
                            [
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação física', label: 'Educação física'},
                                {value: 'Física', label: 'Física'},
                                {value: 'História', label: 'Matemática'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},
                            ]
                        }
                    />
                    <Input name="cost" label="Custo da sua hora por aula"/>
                </fieldset>
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>    
                    </legend>
                        {scheduleItems.map(scheduleItems => {
                            return (
                                <div key={scheduleItems.week_day} className="schedule-item">
                                <Select 
                                name="week_day"
                                label="Dia da semana"
                                options={
                                    [
                                        {value: '0', label: 'Domingo'},
                                        {value: '1', label: 'Segunda-feira'},
                                        {value: '2', label: 'Terça-feira'},
                                        {value: '3', label: 'Quarta-feira'},
                                        {value: '4', label: 'Quinta-feira'},
                                        {value: '5', label: 'Sexta-feira'},
                                        {value: '6', label: 'Sabádo'},
                                    ]
                                }
                                />

                                
                        <Input name="from" label="Das" type="time"/>
                        <Input name="to" label="Até" type="time"/>
                                </div>
                            )
                        })}
                    
                </fieldset>
                <footer>
                    <p><img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="button">
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>   
    )
}

export default TeacherForm;