import React from 'react';
import './presentation.style.css';
import logo from '../../app/logo.png';
import SlideView from './shared/slide/slide.view';

export function PresentationView(props: any) {
    const presentationName: string = props.presentation.settings.title; 

    return(
        <><header>
            <div className="main_nav">
                <div className="brand">
                    <img src={logo} alt="logo" />
                </div>
                <div className="presentation_name">
                    {presentationName}
                </div>
            </div>
            <div className="toolbar">
                <a href="URL" className="tool"> 1</a>
                <a href="URL" className="tool"> </a>
                <a href="URL" className="tool"> </a>
                <a href="URL" className="tool"> </a>
                <a href="URL" className="tool"> </a>
                <a href="URL" className="tool"> </a>
            </div>
        </header>
            <div className="working_field">
                <div className="filmstrip">
                    <div className="slides_container">
                        <div className="slide">
                            <div className="slide_id">1</div>
                            <div className="slide_body"></div>
                        </div>
                        <div className="slide">
                            <div className="slide_id">2</div>
                            <div className="slide_body"></div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}