import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const Chat = () => {

    const [inputmessage, setInputmessage] = useState('');
    const  socket = io("https://nodehandson5-backend.onrender.com");
    const [message, setMessage] = useState ([]);

    //// for user name
    const [username, setUsername] = useState('');
    const [isNameEntered, SetNameEntered] = useState(false);

    useEffect(() => {

        // socket.on("Msg", (clientData) => {
        //     console.log(clientData);
        // });

        socket.on("broadcastmessage", (clientData) => {
            // console.log(clientData);
            setMessage([...message, clientData]);
        });

        // return () => {
        //     socket.off("broadcastmessage");
        // }

    }, [socket, message]);

    const enterUsername = () => {
        if(username === ""){    
            alert('Please enter user name')
        }else{
            SetNameEntered(true);
        }
    }

    const changeMessage = (e) => {
        setInputmessage(e.target.value);
    }

        // const sendmessage = () => {
        //     if(inputmessage === ""){
        //         alert("Please write somthing then send")
        //     }else{
        //         socket.emit("Message", inputmessage);
        //         setInputmessage("");
        //     }
        // }
    
        const broadcastmessage = () => {
            if(inputmessage === ""){
                alert("Please write somthing then send")
            }
            else if( username === ""){
                alert("Please Enter UserName First To Start")
            }
            else{
                socket.emit("broadcastmessage", {sender: username, message: inputmessage});
                setInputmessage("");
            }
        }    
        
    return (
        <>
            <h1>Chat Web </h1>
            <div className='main'>
                <div className='chatheader'>
                    {isNameEntered ? (
                        <h3>{username}</h3>
                    ) : (
                        <>
                            <input
                                className='input1'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Please Enter Your Name To Start Chat...'
                            />
                            <button className='btn1' onClick={enterUsername}>Enter</button>
                        </>
                    )}
                </div>
                <div className='content'>
                    {message.map((Msg, index) => {
                        if(Msg.sender === username){
                            return(
                                <h3 key={index} className="sent-message">{Msg.message}</h3>
                            )   
                        }else{
                            return(
                                <h3 key={index} className="received-message">{Msg.message}</h3>
                            )
                        }
                    })}
                </div>
                <div className='inputarea'>
                        <input className='input' value={inputmessage} onChange={changeMessage} placeholder='Write Your Message.............' />
                        {/* <button className='btn' onClick={sendmessage}>Send</button> */}
                        <button className='btn' onClick={broadcastmessage}>Send</button>
                </div>
            </div>        
        </>
    )
}

export default Chat;