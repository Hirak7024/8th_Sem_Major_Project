import React from 'react';
import "./StudentDetails.scss";

export default function StudentDetails() {

    return (
        <div className='StudentDetailsContainer'>
            <h1>Student Details</h1>
            <button>Edit</button>
            <p><strong>Name : </strong>Hirak Jyoti Das</p>
            <p><strong>Roll No : </strong>200710007024</p>
            <p><strong>Registration No : </strong>326507120</p>
            <p><strong>Date of Birth : </strong>28-08-2000</p>
            <p><strong>Phone No : </strong>6000649547</p>
            <p><strong>Course : </strong>B.Tech</p>
            <p><strong>Department : </strong>Computer Science & Engineering</p>
            <p><strong>Batch : </strong>2020-2024</p>
        </div>
    )
}
