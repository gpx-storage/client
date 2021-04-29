import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from '../lib/axios';
import { getUserToken } from '../lib/authentication';

export default function Dashboard() {
  const [otpUrl, setOtpUrl] = useState('');
  const [tmpToken, setTmpToken] = useState('');
  const setUpTOTPDevice = useCallback(async () => {
    const response = await axios.get('/auth/totp/create', {
      headers: {
        'Authorization': `Bearer ${getUserToken()}`
      }
    });
    setOtpUrl(response.data.otp_url);
    setTmpToken(response.data.tmp_token);
  }, [])

  return (
    <>
      <div>
        <Button variant="contained" onClick={setUpTOTPDevice}>Setup a new TOTP device</Button><br />
        OTP url: {otpUrl}<br />
        TMP token: {tmpToken}
      </div>
    </>
  )
}