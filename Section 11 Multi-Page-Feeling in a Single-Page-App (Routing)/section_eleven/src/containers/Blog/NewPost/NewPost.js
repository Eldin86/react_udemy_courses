import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submited: false
    }

    componentDidMount(){
        console.log('[NewPost.js -> this.props]', this.props)
        //Alternativa guardu je da koristimo replace
        //this.props.history.replace('/posts')
    }


    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content, 
            author: this.state.author
        }
        axios.post('/posts', data)
            .then(response => {
                console.log(response)
                //Push stavi na vrh stacka page, tako da mozemo koristiti back button u browseru da se vratimo na prethodni page
                this.props.history.push('/posts')
                //Redirect zamjeni trenutnu stranicu, tako da back button ne radi da se vratimo na prethodni page
                //this.setState({submited: true})
            })
    }

    render () {
        let redirect = null;
        if(this.state.submited){
            redirect = <Redirect to="/posts"/>
        }
        return (
            <div className="NewPost">
                {/* Mozemo samo koristiti 'to' atribut jer koristimo van switch komponente */}
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;