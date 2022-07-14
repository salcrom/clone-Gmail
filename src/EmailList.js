import React, { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { Checkbox, IconButton } from "@mui/material";
import {
    ArrowDropDown,
    Redo,
    MoreVert,
    ChevronLeft,
    ChevronRight,
    KeyboardHide,
    Settings,
    Inbox,
    People,
    LocalOffer,
} from "@mui/icons-material";
import "./EmailList.css";
import Section from "./Section";
import EmailRow from "./EmailRow";

const EmailList = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "emails"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setEmails(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            }
        );
    }, []);

    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDown />
                    </IconButton>
                    <IconButton>
                        <Redo />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton>
                        <ChevronRight />
                    </IconButton>
                    <IconButton>
                        <KeyboardHide />
                    </IconButton>
                    <IconButton>
                        <Settings />
                    </IconButton>
                </div>
            </div>
            <div className="emailList__sections">
                <Section Icon={Inbox} title="primary" color="red" selected />
                <Section Icon={People} title="Social" color="#1A73E8" />
                <Section Icon={LocalOffer} title="Promotions" color="green" />
            </div>

            <div className="emailList__list">
                {emails.map(
                    ({ id, data: { to, subject, message, timestamp } }) => (
                        <EmailRow
                            id={id}
                            key={id}
                            title={to}
                            subject={subject}
                            description={message}
                            time={new Date(
                                timestamp?.seconds * 1000
                            ).toUTCString()}
                        />
                    )
                )}
                <EmailRow
                    title="Twitch"
                    subject="Hey fellow streamer!!!"
                    description="This is a test"
                    time="10pm"
                />
                <EmailRow
                    title="Twitch"
                    subject="Hey fellow streamer!!!"
                    description="This is a DOPE"
                    time="10pm"
                />
            </div>
        </div>
    );
};

export default EmailList;
