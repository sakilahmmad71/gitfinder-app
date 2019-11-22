import React, { useContext } from 'react'
import { UserItem } from './'
import { Spinner } from '../layouts/'
import { GithubContext } from '../../context/github'


const Users = () => {

    const githubContext = useContext(GithubContext)

    const { loading, users } = githubContext

    if(loading) {
        return <Spinner />
    } else {
        return(
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem id={user.id} user={user} />
                ))}
            </div>
        )
    }

}

const userStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3, 1fr)',
    gridGap : '1rem'
}

export default Users