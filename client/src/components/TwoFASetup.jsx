import React, { useEffect } from 'react'
import { useState } from 'react'
import { setup2fa } from '../service/authApi'

const TwoFASetup = ({ onSetupComplete }) => {
    const [response, setResponse] = useState({})
    const [message, setMessage] = useState("")

    const fetchQRCode = async () => {
        const { data } = await setup2fa()
        console.log(data)
        setResponse(data)
    }

    useEffect(() => {
        fetchQRCode()
    }, [])

    const copyClipBoard = async () => {
        await navigator.clipboard.writeText(response.secret)
        setMessage("2FA code copied to clipboard")
    } 

  return (
    <div className=' bg-white rounded-lg shadow-md w-full max-w-sm mx-auto px-6'>
        <div className=' pt-6'>
            <h2 className=' text-3xl text-center font-extralight'>
                Turn on 2FA verification
            </h2>
            <hr className=' text-gray-200 my-6' />
            <p className=' text-gray-600 text-center text-lg font-light'>
                Scan the QR code below with your authentication app
            </p>
            <div className=' p-6'>
                <div className=' flex justify-center'>
                    {response.qrImageUrl ? (
                        <img src={response.qrImageUrl} alt="2FA QR Code" className=' mb-4 border rounded-md' />
                    ) : ("") }  
                </div>
                <div className=' flex items-center mt-3 mb-3'>
                    <div className=' border-t border-2 border-gray-200 flex-grow'></div>
                    <div className=' text-gray-600 text-sm font-light px-6'>
                        QR enter the code manually
                    </div>
                    <div className=' border-t border-2 border-gray-200 flex-grow'></div>
                </div>
            </div>
            <div className=' mb-6 px-6'>
                { message && <p className=' text-green-600 text-sm mb-3'>{message}</p> }
                <input 
                    readOnly
                    defaultValue=""
                    value={response.secret}
                    className=' w-full border rounded mt-2 text-xs text-gray-600 p-4'
                    onClick={copyClipBoard}
                />
            </div>
            <button onClick={onSetupComplete} className=' w-full bg-blue-500 text-white py-2 rounded-md mb-6'>
                Continue to Verification
            </button>
        </div>
    </div>
  )
}

export default TwoFASetup