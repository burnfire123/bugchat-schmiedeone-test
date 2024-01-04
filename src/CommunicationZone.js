import React, { Component } from 'react';
import './App.css';
import InputZone from './InputZone';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import { promptService } from './PromptService';


class CommunicationZone extends Component {
    constructor(props) {
        super(props);
        this.promptService = promptService;
        this.state = {
            currentMessage: '',
            lastSentMessage: '',
            history: ["How can I help?"],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleChange(event) {

        this.setState({
            currentMessage: event.target.value
        });
    }

    handleSendMessage(message) {
        const { history } = this.state;
        this.setState({
            currentMessage: '',
            lastSentMessage: message,
            history: this.getLimitedHistory([...history, message])
        });

        setTimeout(function () {
            this.dialogueEngine();
        }.bind(this), 3000);
    }

    /**
     * Returns a random answer from a list of answers
     * @param {string[]} answerList array of possible answers
     * @returns a random answer
     */
    provideRandomAnswer(answerList) {
        return answerList[Math.floor(Math.random() * answerList.length)];
    }

    async provideSmartAnswer(prompt) {
        return this.promptService.getAnswer(prompt);
    }

    async dialogueEngine() {
        const answersAdjust = ["you need to be a bit more specific", "come on I am trying to help", "whatever", "that does not sound like a bug"]
        const { lastSentMessage, history } = this.state;
        let response = "";

        if (lastSentMessage.length <= 4) {
            response = this.provideRandomAnswer(answersAdjust);
        } else {
            try {
                response = await this.provideSmartAnswer(lastSentMessage);
            } catch (err) {
                response = `Oh no! There was an error. ${err.response.data.error}`
            }
        }
        this.setState({
            history: this.getLimitedHistory([...history, response])
        });
    }

    /**
     * Limits chat history to {size} number of elements by eliminating first {offset} elements
     * @param {string[]} history 
     * @param {number} size
     * @param {number} offset
     * @returns 
     */
    getLimitedHistory(history, size = 13, offset = 2) {
        if (history.length > size)
            return history.slice(offset);
        return history;
    }

    render() {
        const { currentMessage, history } = this.state;
        return (
            <div className="chatHost innerShadow">
                <ContactWindow />
                <ChatZone chatHistory={history} />
                <InputZone handleChange={this.handleChange} handleSendMessage={this.handleSendMessage} value={currentMessage} />

            </div>

        );
    }

}

export default CommunicationZone;