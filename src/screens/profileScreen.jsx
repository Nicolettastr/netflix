import React from "react";
import '../css/profile.css'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Button from "../components/button";
import { auth } from '../firebase.js'
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {

    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const handleSignOut = () => {
        auth.signOut()
        navigate('/')
    }

    return (
        <>
            <section className="profile_section">

                <div className="profile_Container">
                    <div className="profile_accountUser">
                        <h2 className="profile_title">
                            Profile
                        </h2>
                        <div>
                            <div>
                                <img src='https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg' alt='avatar picture' />
                                <p>Name</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_accountConfiguration">
                    <div>
                        <h2>
                            My Shows
                        </h2>
                        <div></div>
                    </div>
                    <div>
                        <p>Profile Configuration</p>
                        <p>Infant</p>
                        <Button text='Sign Out' className='signOutBtn'
                            onClick={handleSignOut} />
                    </div>
                </div>
            </section>
        </>
    )
};

export default ProfileScreen;