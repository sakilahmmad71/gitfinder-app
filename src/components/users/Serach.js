import React, { useState, useContext } from 'react'
import { GithubContext } from '../../context/github'
import { AlertContext } from '../../context/alert'


 const Serach = () => {

    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(text === '') {
            alertContext.setAlert('Plaese enter something', 'light')
        } else {
            githubContext.searchUsers(text)
            setText('')
        }
    }

        return (
            <div>
                <form className="form" onSubmit={onSubmit} >
                    <input type="text" placeholder="Search users" name="text" value={text} onChange={onChange} autoComplete="off" />
                    <input type="submit" className="btn btn-dark btn-block" value="Search" />
                </form>
                { githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers }>Clear</button> }
            </div>
        )
}


export default Serach
