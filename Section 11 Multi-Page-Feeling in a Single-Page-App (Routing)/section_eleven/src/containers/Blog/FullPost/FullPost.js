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

    //Ucita podatke prvi put kad se rendera komponenta
    componentDidMount(){
        console.log('[FullPost.js -> this.props]', this.props)
        this.loadData()
    }

    //moramo da handlamo promjene u componentDidUpdate ako se komponenta vec loadira kroz Router, jer Router nece unmountati staru i mountati je ponovo
    //Ucita podatke kad god se updatuje komponenta, zato moramo da imamo componentDidMounun i componentDidUpdate
    //componentDidUpdate se ponovo rendera kad se props promjene
    componentDidUpdate(){
        console.log('[FullPost.js -> this.props]', this.props)
        this.loadData()
    }

    loadData(){
        
        //Ako je match.params.id true
        //Ako matchira u url-u this.props.match.params
        if(this.props.match.params.id){
            //Ako loadedPost nije null, i ono sto dobijemo iz url-a je string, moramo ga u num pretvoriti
            if(!this.state.loadedPost || (this.state.loadedPost.id !== +this.props.match.params.id)){
                console.log('[FullPost.js -> !this.state.loadedPost]',Boolean(!this.state.loadedPost))
                console.log('[FullPost.js -> this.state.loadedPost]', this.state.loadedPost)
                //Dohvatimo post sa odgovarajucim id
                axios.get('/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({loadedPost: response.data})
            })
            }
        }
       
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            post = <p style={{textAlign: 'center'}}>Loading....</p>
        }
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