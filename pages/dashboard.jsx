import React from 'react';
import OTPManagement from '../components/OTPManagement';

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <section>
        <h2>Security</h2>
        <OTPManagement />
      </section>
    </>
  )
}