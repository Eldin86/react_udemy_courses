import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {

    state ={
        loadedPost: null
    }

    //na ovaj nacin imamo beskonacnu petlju, jer se state updatuje, zatim se komponenta reloadira, zatim componentDidUpdate pokrene i sve tako
    //BESKONACNA PETLJA
    /*componentDidUpdate(){
        if(this.props.id){
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                this.setState({loadedPost: response.data})
            })
        }
    }*/

    componentDidUpdate(){
        //Ako imamo id od posta
        if(this.props.id){
            //Ako imamo loaded post, ili, ako loadedPost.id je razlicit od onoga sto smo dobili iz Blog
            //komponente onda poalji zahtjev
            if(!this.state.loadedPost || (this.state.loadedPost.id !== this.props.id)){
                console.log(Boolean(!this.state.loadedPost))
                axios.get('/posts/' + this.props.id)
            .then(response => {
                this.setState({loadedPost: response.data})
            })
            }
        }
       
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        // defaultno imamo da izabere post
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // onda ako imamo id od posta pojavi se loading
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading....</p>
        }
        // nakon sto smo dohvtili podatke sa servera ispisujemo post a uklanjamo loading
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
       
        return post;
    }
}

export default FullPost;