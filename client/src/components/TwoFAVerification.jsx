import React from 'react'

const TwoFAVerification = () => {

  return (
    <form onSubmit={handleTokenVerification} className=' bg-white rounded-lg shadow-md w-full max-w-sm mx-auto'>
        <div className=' pt-6'>
            <h2 className=' text-3xl text-center font-extralight'>
                Validate TOTP
            </h2>
            <hr className=' text-gray-200 my-6' />
            <p className=' text-gray-600 text-center text-lg font-light'>
                Please enter 6-digit Time based OTP to verify 2FA authentication
            </p>
            <div className=' p-6'>
                <div className=' mb-4'>
                    <label className=' text-gray-600 text-sm'>
                        TOTP
                    </label>
                    <input
                        className=' w-full p-2 border rounded mt-2'
                        label='TOTP'
                        type='text'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder='Enter Your TOTP'
                    />
                </div>
                {error && <p className=' text-red-500 text-sm mb-3'>{error}</p>}
                <button className=' w-full bg-blue-500 text-white py-2 mb-3 rounded-md' type='submit'>
                    Verify TOTP
                </button>
                <button onClick={handleReset} className=' w-full bg-slate-600 text-white py-2 rounded-md' type='button'>
                    Reset 2FA
                </button>
                <div>
                    <p className=' pt-4 text-center text-gray-600 text-sm'>
                        {isRegister ? "Already have an account ? " : "Don't have an account ? "} 
                        <Link to="" onClick={handleRegisterToggle}>
                            {isRegister ? "Login" : "Create Account"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </form>
  )
}

export default TwoFAVerification