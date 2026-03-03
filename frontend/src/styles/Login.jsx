import { useState } from 'react'
import './login.css'
import psglogo from '../assets/psglogo.png'

function Login({ onRegister }){
    const [username, setUsername] = useState('')
    const [otp, setOtp] = useState('')
    const [stage, setStage] = useState('username') // 'username' or 'otp'

    const handleGetOtp = () => {
        // in real app we'd call an API to send OTP
        console.log('Sending OTP to user:', username)
        setStage('otp')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (stage === 'otp') {
            console.log('Username:', username)
            console.log('OTP:', otp)
            // perform final login
        }
    }

    return(
        <div className="login-container">
                <form onSubmit={handleLogin}>
                <div className='form-header'>
                    <div><strong>Login..</strong></div>
                    <div>Before ye conquer the seas of code, prove yer name and log in!!</div>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        disabled={stage === 'otp'}
                    />
                </div>

                {stage === 'username' ? (
                    <button type="button" onClick={handleGetOtp} disabled={!username.trim()}>
                        Get OTP
                    </button>
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="otp">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter the OTP"
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </>
                )}

                <div className="switch-link">
                    Don't have an account?{' '}
                    <button type="button" className="link-button" onClick={onRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Login