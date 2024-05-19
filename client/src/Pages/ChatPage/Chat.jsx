// import React, { useState, useEffect } from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBTypography, MDBTextArea, MDBCardHeader } from "mdb-react-ui-kit";
// import Api from "../../API/Api.js";
// import { useAuth } from "../../Utils/Context";
// import "./Chat.scss";


// export default function Chat() {
//     const [messages, setMessages] = useState([]);
//     const { userData } = useAuth();

//     useEffect(() => {
//         const User_Email = userData?.user?.Email;

//         const fetchMessages = async (User_Email) => {
//             try {
//                 const senderResponse = await Api.fetchMessagesBySenderEmail(User_Email);
//                 const receiverResponse = await Api.fetchMessagesByReceiverEmail(User_Email);

//                 // Merge sender and receiver messages arrays
//                 const mergedMessages = [...senderResponse.data, ...receiverResponse.data];

//                 setMessages(mergedMessages);
//             } catch (error) {
//                 console.error('Error fetching messages:', error);
//             }
//         };

//         fetchMessages(User_Email);
//     }, []);


//     console.log("Message Array is : ")
//     messages.forEach(message => {
//         console.log(message);
//     });


//     return (
//         <div className="chatMainContainer">
//             <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
//                 <MDBRow>
//                     <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" id="column1">
//                         <h5 className="font-weight-bold mb-3 text-center text-lg-start">
//                             Member
//                         </h5>

//                         <MDBCard>
//                             <MDBCardBody>
//                                 <MDBTypography listUnStyled className="mb-0">
//                                     <li
//                                         className="p-2 border-bottom"
//                                         style={{ backgroundColor: "#eee" }}
//                                     >
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">John Doe</p>
//                                                     <p className="small text-muted">
//                                                         Hello, Are you there?
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">Just now</p>
//                                                 <span className="badge bg-danger float-end">1</span>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2 border-bottom">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Danny Smith</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">5 mins ago</p>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2 border-bottom">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Alex Steward</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">Yesterday</p>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2 border-bottom">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Ashley Olsen</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">Yesterday</p>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2 border-bottom">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Kate Moss</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">Yesterday</p>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2 border-bottom">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Lara Croft</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">Yesterday</p>
//                                             </div>
//                                         </a>
//                                     </li>
//                                     <li className="p-2">
//                                         <a href="#!" className="d-flex justify-content-between">
//                                             <div className="d-flex flex-row">
//                                                 <img
//                                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                                     alt="avatar"
//                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                     width="60"
//                                                 />
//                                                 <div className="pt-1">
//                                                     <p className="fw-bold mb-0">Brad Pitt</p>
//                                                     <p className="small text-muted">
//                                                         Lorem ipsum dolor sit.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <p className="small text-muted mb-1">5 mins ago</p>
//                                                 <span className="text-muted float-end">
//                                                     <MDBIcon fas icon="check" />
//                                                 </span>
//                                             </div>
//                                         </a>
//                                     </li>
//                                 </MDBTypography>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>

//                     <MDBCol md="6" lg="7" xl="8" id="column2">
//                         <MDBTypography listUnStyled>
//                             <li className="d-flex justify-content-between mb-4">
//                                 <img
//                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                     alt="avatar"
//                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
//                                     width="60"
//                                 />
//                                 <MDBCard>
//                                     <MDBCardHeader className="d-flex justify-content-between p-3">
//                                         <p className="fw-bold mb-0">Brad Pitt</p>
//                                         <p className="text-muted small mb-0">
//                                             <MDBIcon far icon="clock" /> 12 mins ago
//                                         </p>
//                                     </MDBCardHeader>
//                                     <MDBCardBody>
//                                         <p className="mb-0">
//                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                                             do eiusmod tempor incididunt ut labore et dolore magna
//                                             aliqua.
//                                         </p>
//                                     </MDBCardBody>
//                                 </MDBCard>
//                             </li>
//                             <li class="d-flex justify-content-between mb-4">
//                                 <MDBCard className="w-100">
//                                     <MDBCardHeader className="d-flex justify-content-between p-3">
//                                         <p class="fw-bold mb-0">Lara Croft</p>
//                                         <p class="text-muted small mb-0">
//                                             <MDBIcon far icon="clock" /> 13 mins ago
//                                         </p>
//                                     </MDBCardHeader>
//                                     <MDBCardBody>
//                                         <p className="mb-0">
//                                             Sed ut perspiciatis unde omnis iste natus error sit
//                                             voluptatem accusantium doloremque laudantium.
//                                         </p>
//                                     </MDBCardBody>
//                                 </MDBCard>
//                                 <img
//                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
//                                     alt="avatar"
//                                     className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
//                                     width="60"
//                                 />
//                             </li>
//                             <li className="d-flex justify-content-between mb-4">
//                                 <img
//                                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                     alt="avatar"
//                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
//                                     width="60"
//                                 />
//                                 <MDBCard>
//                                     <MDBCardHeader className="d-flex justify-content-between p-3">
//                                         <p className="fw-bold mb-0">Brad Pitt</p>
//                                         <p className="text-muted small mb-0">
//                                             <MDBIcon far icon="clock" /> 10 mins ago
//                                         </p>
//                                     </MDBCardHeader>
//                                     <MDBCardBody>
//                                         <p className="mb-0">
//                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                                             do eiusmod tempor incididunt ut labore et dolore magna
//                                             aliqua.
//                                         </p>
//                                     </MDBCardBody>
//                                 </MDBCard>
//                             </li>
//                             <li className="bg-white mb-3">
//                                 <MDBTextArea label="Message" id="textAreaExample" rows={4} />
//                             </li>
//                             <MDBBtn color="info" rounded className="float-end">
//                                 Send
//                             </MDBBtn>
//                         </MDBTypography>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import Api from "../../API/Api.js";
import { useAuth } from "../../Utils/Context";
import "./Chat.scss";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const { userData } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const User_Email = userData?.user?.Email;
                console.log("User_Email:", User_Email); // Check if User_Email is defined

                const senderResponse = await Api.fetchMessagesBySenderEmail(User_Email);
                console.log("Sender response:", senderResponse.data); // Check sender response data

                let receiverMessages = [];
                let senderMessages = [];
                try {
                    const receiverResponse = await Api.fetchMessagesByReceiverEmail(User_Email);
                    console.log("Receiver response:", receiverResponse); // Check receiver response
                    receiverMessages = receiverResponse.data || [];
                } catch (error) {
                    if (error === "Receiver not found in messages") {
                        console.log("Receiver not found in messages");
                    } else {
                        throw error;
                    }
                }

                try {
                    const senderResponse = await Api.fetchMessagesBySenderEmail(User_Email);
                    console.log("Sender response:", senderResponse.data); // Check sender response data
                    senderMessages = senderResponse.data || [];
                } catch (error) {
                    console.error('Error fetching sender messages:', error);
                }

                console.log("Receiver Messages:", receiverMessages); // Check receiver messages
                console.log("Sender Messages:", senderMessages); // Check sender messages

                const mergedMessages = [...senderMessages, ...receiverMessages];

                console.log("Merged Messages:", mergedMessages); // Check merged messages

                setMessages(mergedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userData]);

    const handleReceiverClick = (receiverEmail) => {
        setSelectedReceiver(receiverEmail);
    };

    const userSentMessages = messages.filter(message => message.Sender_Email === userData?.user?.Email);
    const userReceivedMessages = messages.filter(message => message.Receiver_Email === userData?.user?.Email);

    const allUsers = [
        ...new Set([...userSentMessages.map(message => message.Receiver_Email), ...userReceivedMessages.map(message => message.Sender_Email)])
    ];

    const filteredMessages = messages.filter(
        message => message.Sender_Email === selectedReceiver || message.Receiver_Email === selectedReceiver
    );

    console.log("Message Array is : ")
    messages.forEach(message => {
        console.log(message);
    });

    return (
        <div className="chatMainContainer">
            <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
                <MDBRow>
                    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" id="column1">
                        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                            Member
                        </h5>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBTypography listUnStyled className="mb-0">
                                    {allUsers.map((user, index) => (
                                        <li key={index} className="p-2 border-bottom" style={{ backgroundColor: "#eee" }}>
                                            <MDBBtn onClick={() => handleReceiverClick(user)}>
                                                {user}
                                            </MDBBtn>
                                        </li>
                                    ))}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6" lg="7" xl="8" id="column2">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBTypography listUnStyled className="mb-0">
                                    {filteredMessages.map((message, index) => (
                                        <li key={index} className="p-2 border-bottom" style={{ textAlign: message.Sender_Email === userData?.user?.Email ? 'right' : 'left' }}>
                                            <p>{message.Message}</p>
                                        </li>
                                    ))}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}