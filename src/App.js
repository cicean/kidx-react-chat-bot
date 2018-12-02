import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import axios from 'axios';
import logo from './logo.svg';
import 'react-chat-widget/lib/styles.css';

class App extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to Kidx test chat bot!");
    }

    handleNewUserMessage = (newMessage) => {
      console.log('New Message incoming! ${newMessage}');
      // Now send the message throught the backend API
	    axios({
		    method: 'post',
		    url: 'http://47.101.173.107:5005/webhooks/rest/webhook',
		    withCredentials: false,
            headers: {
		        'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
		    data: {
			    message: newMessage
		    }
	    }).then(function (response) {
		    if (response) {
			    response.data.forEach(function (item) {
				    console.log("found : ", JSON.stringify(item));
				    console.log('recipient_id : ', item.recipient_id);
				    console.log('text : ', item.text);
				    addResponseMessage(item.text);
			    })
		    }
	    });
    }

    render() {
    return (
      <div className="App">
        <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            profileAvatar={logo}
            title="Kidx test chat bot"
            subtitle="test"
        />
      </div>
    );
  }
}

export default App;
