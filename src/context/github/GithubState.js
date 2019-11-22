import React, { useReducer } from 'react'
import axios from 'axios'
import { GithubContext, GithubReducer } from '.'

import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USER,
    GET_REPOS,
    SET_LOADING
} from '../types'

let githubClientId
let githubClientSecret

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_GITHUB_CLIENT_SECRET
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = (props) => {
    const initialState = {
        users : [],
        user : {},
        repos : [],
        loading : false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

  // search github users
  const searchUsers = async (text) => {
    setLoading()

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
        type : SEARCH_USERS,
        payload : res.data.items
    })
  }

  // Get a single user
  const getUser = async (username) => {
    setLoading()

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
        type : GET_USER,
        payload : res.data
    })
  }

    // get user repos
    const getUserRepos = async (username) => {
        setLoading()
    
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    
        dispatch({
            type : GET_REPOS,
            payload : res.data
        })
      }

    // clear users
    const clearUsers = () => dispatch({ type : CLEAR_USER })

    // set loading
    const setLoading = () => dispatch({ type : SET_LOADING })


    // ======== provider return ========== //
    return <GithubContext.Provider
        value={{
            users : state.users,
            user : state.user,
            repos : state.repos,
            loading : state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
            {props.children}
    </GithubContext.Provider>
}

export default GithubState