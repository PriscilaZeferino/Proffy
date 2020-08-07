import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem () {
    return (
        <article className="teacher-item">
                <header>
                    <img src="https://avatars3.githubusercontent.com/u/45722071?s=460&v=4" alt="Priscila Yasmin"/>
                    <div>
                        <strong>Priscila Yasmin</strong>
                        <span>Literatura</span>
                    </div>
                </header>
                    <p>Entusiasta da Literatura
                    <br/><br/>
                    Apaixonada por conhecer novos mundos, desnvandar mistérios, entrar com tudo dentro do livros, construir seus próprios mundos, 
                    e quer levar esse amor adiante ensinado o que há de melhor na literatura. Muitas pessoas já passam pela experiência e descobrirão coisas incriveis.
                    Seja você o próximo a experimentar!
                    </p>
                <footer>
                    <p>
                        Preço/Hora
                        <strong>R$30,00</strong>
                    </p>
                    <button type="button">
                        <img src={whatsappIcon} alt="Whatsapp"/>
                        Entrar em contato
                    </button>
                </footer>
            </article>
    );
}

export default TeacherItem;