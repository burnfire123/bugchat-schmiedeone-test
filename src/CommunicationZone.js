import React, { Component } from 'react';
import './App.css';
import InputZone from './InputZone';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';


class CommunicationZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMessage: '',
            lastSentMessage: '',
            history: ["How can I help?"],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({
            currentMessage: event.target.value
        });
    }

    handleSubmit(event) {
        const { history } = this.state;
        const message = event.target.value;
        if (event.key === 'Enter') {
            this.setState({
                currentMessage: '',
                lastSentMessage: message,
                history: [...history, message]
            });

            setTimeout(function () {
                this.dialogueEngine();
            }.bind(this), 3000);

        }
        this.cleanHistory()
    }

    dialogueEngine() {
        const answersBasic = ["can you elaborate?", "and why do you believe that is so?", "can you be more specific?", "what would be your guess?", "I need more details for this one"];
        const answersAdvanced = ["have you check the logs?", "have you tried restarting?", "what does the documentation say?", "Maybe its a typo"]
        const answersAdjust = ["you need to be a bit more specific", "come on I am trying to help", "whatever", "that does not sound like a bug"]
        const { lastSentMessage, history } = this.state;

        if (lastSentMessage.length <= 7) {
            let response = answersAdjust[Math.floor(Math.random() * answersAdjust.length)];
            this.setState({
                history: [...history, response]
            });
        } else if (history.length <= 3 && lastSentMessage.length > 6) {
            let response = answersBasic[Math.floor(Math.random() * answersBasic.length)];
            this.setState({
                history: [...history, response]
            });
        } else if (history.length >= 4) {
            let response = answersAdvanced[Math.floor(Math.random() * answersAdvanced.length)];
            this.setState({
                history: [...history, response]
            });


        }

    }

    cleanHistory() {
        const { history } = this.state;
        if (history.length > 12) {
            this.setState({
                history: history.slice(2),
            });
        }
    }

    render() {
        const { currentMessage, history } = this.state;
        return (
            <div className="chatHost innerShadow">
                <ContactWindow />
                <ChatZone chatItem={history} />
                <InputZone handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={currentMessage} />

            </div>

        );
    }

}

export default CommunicationZone;