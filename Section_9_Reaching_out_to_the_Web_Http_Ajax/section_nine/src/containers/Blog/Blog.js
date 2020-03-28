import React, { Component } from 'react';
//import axios from 'axios'
import axios from '../../axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state ={
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount(){
        //state moramo updatovati unutar axios metode, inace ne bi dobili podatke
        axios.get('/posts')
        .then(response => {
            //Dohvatili smo samo 4 posta sa servera
            const posts = response.data.slice(0, 4);
            //objekat koji smo dohvatili sa servera smo spreadali i dodali smo novi property author
            const updatedPost = posts.map(post => {
                return {
                    ...post,
                    author: 'Eldin'
                }
            })
            this.setState({posts: updatedPost})
            console.log(response)
        })
        .catch(error => {
            //console.log(error)
            this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        //Smjestili smo id od posta u selectedPostId state
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <h5 style={{textAlign: 'center'}}>Something Went Wrong</h5>

        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                )
            })
        }

        

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;