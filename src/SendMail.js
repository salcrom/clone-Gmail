import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import "./SendMail.css";
import { closeSendMessage } from "./features/mailSlice";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SendMail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        console.log(formData);
        addDoc(collection(db, "emails"), {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: serverTimestamp(),
        });

        dispatch(closeSendMessage());
    };

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <Close
                    onClick={() => dispatch(closeSendMessage())}
                    className="sendMail__close"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="to"
                    placeholder="To"
                    type="email"
                    {...register("to", { required: "Required" })}
                />
                {errors.to && (
                    <p className="sendMail__errors">To is required</p>
                )}
                <input
                    name="subject"
                    placeholder="Subject"
                    type="text"
                    {...register("subject", { required: "Required" })}
                />
                {errors.subject && (
                    <p className="sendMail__errors">Subject is required</p>
                )}
                <input
                    name="message"
                    placeholder="Message..."
                    type="text"
                    className="sendMail__message"
                    {...register("message", { required: "Required" })}
                />
                {errors.message && (
                    <p className="sendMail__errors">message is required</p>
                )}

                <div className="sendMail__options">
                    <Button
                        className="sendMail__send"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SendMail;
