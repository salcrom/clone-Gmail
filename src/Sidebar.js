import React from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton } from "@mui/material";
import {
    Duo,
    Phone,
    Person,
    ExpandMore,
    Note,
    NearMe,
    LabelImportant,
    AccessTime,
    Star,
    Inbox,
    Add,
} from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import { openSendMessage } from "./features/mailSlice";
import "./Sidebar.css";

const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="sidebar">
            <Button
                startIcon={<Add fontSize="large" />}
                className="sidebar__compose"
                onClick={() => dispatch(openSendMessage())}
            >
                Componse
            </Button>

            <SidebarOption
                Icon={Inbox}
                title="Inbox"
                number={54}
                selected={true}
            />
            <SidebarOption Icon={Star} title="Starred" number={54} />
            <SidebarOption Icon={AccessTime} title="Snoozed" number={54} />
            <SidebarOption
                Icon={LabelImportant}
                title="Important"
                number={54}
            />
            <SidebarOption Icon={NearMe} title="Sent" number={54} />
            <SidebarOption Icon={Note} title="Drafts" number={54} />
            <SidebarOption Icon={ExpandMore} title="More" number={54} />

            <div className="sidebar__footer">
                <div className="sidebar__footerIcons">
                    <IconButton>
                        <Person />
                    </IconButton>
                    <IconButton>
                        <Duo />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
