import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import EmailList from "./EmailList";
import Header from "./Header";
import Mail from "./Mail";
import SendMail from "./SendMail";
import Sidebar from "./Sidebar";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
    const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    login({
                        displayName: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                    })
                );
            }
        });
    }, [dispatch]);

    return (
        <Router>
            {!user ? (
                <Login />
            ) : (
                <div className="App">
                    <Header />

                    <div className="app__body">
                        <Sidebar />

                        <Switch>
                            <Route path="/mail">
                                <Mail />
                            </Route>
                            <Route path="/">
                                <EmailList />
                            </Route>
                        </Switch>
                    </div>

                    {sendMessageIsOpen && <SendMail />}
                </div>
            )}
        </Router>
    );
}

export default App;
