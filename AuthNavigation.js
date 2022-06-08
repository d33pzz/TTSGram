
import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './Screens/Navigation'
import {firebase} from './firebase'

const AuthNavigation = () => {
    const [currentuser, setCurrentUser] = useState(null)
    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null) 
    useEffect(() => 
        firebase.auth().onAuthStateChanged(user => userHandler(user)),
        []
    )
  return <>{currentuser ? <SignedInStack/> : <SignedOutStack/>}</>
}

export default AuthNavigation;