import React, {useContext, useEffect, Fragment} from 'react';
import {GithubContext} from "../context/github/githubContext";
import {Link} from "react-router-dom";
import {Repos} from "../components/Repos";

export const Profile = ({match}) => {
    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name;

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <p className="text-center">Загрузка...</p>
    }

    const {
        name, company, avatar_url, location,
        bio, blog, login, html_url, following,
        followers, public_repos, public_gists
    } = user

    return (
        <Fragment>
           <Link to="/git-search" className="btn btn-link">На главную</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img
                                style={{width:` 150px`}}
                                src={avatar_url}
                                alt={name}

                            />
                            <h4>{name}</h4>
                            {location && <p>Местоположение: {location}</p>}
                        </div>
                        <div className="col">
                            {
                                bio && <Fragment>
                                    <h6>BIO</h6>
                                    <p>{bio}</p>
                                </Fragment>
                            }
                            <a
                                href={html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-toolbar btn-info mb-1"
                            >Открыть профиль</a>
                            <ul>
                                {login && <li>
                                    <strong>User Name: </strong>{login}
                                </li>}
                                {company && <li>
                                    <strong>Компания: </strong>{company}
                                </li>}
                                {blog && <li>
                                    <strong>Website: </strong>{blog}
                                </li>}
                            </ul>

                            <div className="badge badge-primary mr-1">Подпищики: {followers}</div>
                            <div className="badge badge-success mr-1">Подписанн: {following} </div>
                            <div className="badge badge-info mr-1">Репозитории: {public_repos}</div>
                            <div className="badge badge-dark mr-1">Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    )
}
