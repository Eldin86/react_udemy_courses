import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
//import axios from 'axios'
import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

class Blog extends Component {

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* link koristimo umjesto a taga, prima 'to' atribut */}
                            {/* Kad koristimo 'to' to je uvijek apsolutna putanja  */}
                            {/* Apsolutna putanja znaci da je uvijek appended odmah iza domene */}
                            {/* NavLink koristimo da mozemo stilizirati navigaciju, da dodamo active klasu */}
                            {/* i NavLink ima exact atribut, kaze puna putanja treba da bude da bi bilo active klasa */}
                            {/* Link ili NavLink postavi putanju u url browsera */}
                            <li><NavLink
                                to="/posts"
                                exact
                                //activeClassName je da dodamo custom klasu za active (activeClassName="my-active")
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            {/* 'to' moze biti objekat koji mozemo konfiguristi da odredimo gdje zelimo ici kad kliknemo na link */}
                            <li><NavLink to={{
                                //konfigurator moze imati pathname odnosno putanja
                                // ako zelimo da apendamo putanju na kraj trenutne putanje koristimo npr() THIS.PROPS.MATCH.URL + '/new-post'), i to je relativna putanja
                                pathname: '/new-post',
                                //hash, odnosno id da mozemo npr da mozemo da skocimo na neki dio elementa na stranici 
                                //Dodajemo ga nakon URL-a da bismo "skocili" na to mjesto
                                hash: '#submit',
                                //dozvoljava nam da dodamo query params
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* route ocekuje path i render ili component atribute */}
                {/* Takodjer mozemo proslijediti exact da matchira samo tacnoj putanji koju smo odredili */}
                {/* render obicno koristimo za info poruke a ne komponent, za to imamo component atribut */}
                {/* <Route path="/" exact render={() => <h1>Home!</h1>}/>
                <Route path="/new-post" component={Posts}/> */}


                {/* Switch govori router da loadira samo prvu na koju naidje da matchira od ponudjenih route */}
                {/* Redosljd je vazan pogotovo kad koristimo switch */}
                <Switch>
                    {/* Router dohvati putanju iz url browsera */}
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    {/* Route komponenta ima from atribut koji pokazuje od koje rute do na koju */}
                    {/* Ako koristimo Redirect van Switch from ne moze biti odredjeno, mozemo samo to odrediti */}
                    <Redirect from='/' to="/posts"/>
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;