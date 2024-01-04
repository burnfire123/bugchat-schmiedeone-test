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

    /**
     * Returns a random answer from a list of answers
     * @param {string[]} answerList array of possible answers
     * @returns a random answer
     */
    provideRandomAnswer(answerList) {
        return answerList[Math.floor(Math.random() * answerList.length)];
    }

    dialogueEngine() {
        const answersBasic = ["can you elaborate?", "and why do you believe that is so?", "can you be more specific?", "what would be your guess?", "I need more details for this one"];
        const answersAdvanced = ["have you check the logs?", "have you tried restarting?", "what does the documentation say?", "Maybe its a typo"]
        const answersAdjust = ["you need to be a bit more specific", "come on I am trying to help", "whatever", "that does not sound like a bug"]
        const { lastSentMessage, history } = this.state;
        let answerList = [];

        if (lastSentMessage.length <= 7) {
            answerList = answersAdjust;
        } else if (history.length <= 3) {
            answerList = answersBasic;
        } else {
            answerList = answersAdvanced;
        }
        const response = this.provideRandomAnswer(answerList);
        this.setState({
            history: [...history, response]
        });

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