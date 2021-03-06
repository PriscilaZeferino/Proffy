import React, { FormEvent } from 'react';
import {useHistory} from 'react-router-dom'
import { useState } from 'react';


import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import "./styles.css"
import api from '../../services/api';

function TeacherForm() {

     const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([    
            { week_day: 0, from:'', to: ''},

    ]);

    function addNewScheduleItem(){
        setScheduleItems([...scheduleItems, {
            week_day: 1,
            from: '',
            to:''
        }])

    }

    function setScheduleItemsValue(position:number, field: string, value: string)
    {
        const updateScheduleItems = scheduleItems.map((scheduleItems, index) => {
            if(index === position)
            {
                return {...scheduleItems, [field]: value};
            }
            return scheduleItems;
        })
        setScheduleItems(updateScheduleItems);
    }
    function handleCreateClass(event: FormEvent)
    {
        api.post('classes',
        {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=> {
            alert('Cadastro realizado com sucesso');
            history.push('/')
        }).catch((err) =>
        {
            alert('Erro no cadastro');
        })
        event.preventDefault();
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });

    }    
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input 
                        name="name" 
                        label="Nome completo" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <Input 
                        name="avatar" 
                        label="avatar"
                        value={avatar} 
                        onChange={(e) => {setAvatar(e.target.value)}}
                    />
                    
                    <Input 
                        name="whatsapp" 
                        label="whatsapp"
                        value={whatsapp} 
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                    />

                    <Textarea 
                        name="bio" 
                        label="Biografia"
                        value={bio} 
                        onChange={(e) => {setBio(e.target.value)}}
                    />
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select 
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}

                        options={
                            [
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação física', label: 'Educação física'},
                                {value: 'Física', label: 'Física'},
                                {value: 'História', label: 'História'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},
                            ]
                        }
                    />
                    <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost} 
                        onChange={(e) => {setCost(e.target.value)}}
                    />
                </fieldset>
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>    
                    </legend>
                        {scheduleItems.map((scheduleItems, index) => {
                            return (
                                <div key={scheduleItems.week_day} className="schedule-item">
                                <Select 
                                name="week_day"
                                label="Dia da semana"
                                value={scheduleItems.week_day}
                                onChange={event => setScheduleItemsValue(index, 'week_day', event.target.value)}
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

                                
                                <Input 
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={scheduleItems.from}
                                    onChange={event => setScheduleItemsValue(index, 'from', event.target.value)}

                                />
                        
                                <Input
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItems.to}

                                    onChange={event => setScheduleItemsValue(index, 'to', event.target.value)}

                                />

                                
                                </div>
                            )
                        })}
                    
                </fieldset>
                <footer>
                    <p><img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>
                </form>
            </main>
        </div>   
    )
}

export default TeacherForm;