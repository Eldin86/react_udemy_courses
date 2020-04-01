import React, { Component } from 'react'
import axios from '../../../axios'
//import { Link } from 'react-router-dom'
import {Route} from 'react-router-dom'

import Post from '../../../components/Post/Post'
import './Posts.css'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        //Routing props se ne prosljedjuju niz komponent tree odnosno na child komponente
        console.log('[Posts.js -> this.props]', this.props)
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Eldin'
                    }
                })
                this.setState({ posts: updatedPost })
                //console.log(response)
            })
            .catch(error => {
                //console.log('[Posts.js error]', error)
                //this.setState({error: true})
            })
    }
    postSelectedHandler = (id) => {
        //Push nam dozvoljava da pushamo novi page na stack pageova
        //Navigiramo na post sa id koji dobijemo
        //Ovo je alternativa NavLink-u ili Link-u, takodjer smjesta link u url
        //Rade oba slucaja
        //this.props.history.push({pathname: '/posts/' + id})
        this.props.history.push('/posts/' + id)
    }

    render() {
        let posts = <h5 style={{ textAlign: 'center' }}>Something Went Wrong</h5>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // Omotamo svaki post sa Link komponentom
                    //Link ili NavLink postavi putanju u url browsera
                    //klikom na post posaljemo broj posta u url, da bismo ga u blog komponenti ucitali
                    //<Link key={post.id} to={'/posts/' + post.id}>
                    <Post
                        //Proslijedimo ...this.props u Post komponent, u kojem su i router props, jedan nacin
                        //{...this.props}
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    //</Link>
                )
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* Kad god imamo /nesto odnosi se na route /:id */}
                {/* Kad je putanja 1, 2, 3 i td, da odgovara id-u ucitaj komponentu FullPost */}
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>

        )
    }
}

export default Posts