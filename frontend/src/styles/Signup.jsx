import { useState } from 'react'
import './Signup.css'
import psglogo from '../assets/psglogo.png'

function Signup({ onLogin }) {
    const [name, setName] = useState('')
    const [rollnum, setRollnum] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [college, setCollege] = useState('')

    const handleSignup = (e) => {
        e.preventDefault()
        console.log('Name:', name)
        console.log('Roll No:', rollnum)
        console.log('Email:', email)
        console.log('Mobile:', mobile)
        console.log('College:', college)
        // TODO: send signup request
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup}>
                <div className='form-header'>
                    <div><strong>Sign&nbsp;Up</strong></div>
                    <div>Enter the crew — sign up and conquer the seas of code!</div>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rollnum">Roll Number:</label>
                    <input
                        type="text"
                        id="rollnum"
                        value={rollnum}
                        onChange={(e) => setRollnum(e.target.value)}
                        placeholder="Enter your roll number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="college">College Name:</label>
                    <input
                        type="text"
                        id="college"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Enter your college name"
                        required
                    />
                </div>


                <button type="submit">Register</button>
                <div className="switch-link">
                    Already registered?{' '}
                    <button type="button" className="link-button" onClick={onLogin}>
                        Log&nbsp;In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup
