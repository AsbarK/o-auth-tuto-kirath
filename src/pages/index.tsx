
import { Inter } from 'next/font/google'
import { Button, Typography } from "@mui/material";
import {signIn, useSession, signOut} from "next-auth/react";
// import handleIncomingCall from "@/lib/upload"

async function handleUploadVideo() {
  try {
    const response = await fetch('/api/uploadVideo', {
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error('Error uploading video.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
export default function Home() {
  const session = useSession();
  console.error(session.data)
  return (
    <div style={{height: 60, background: "white", padding: 10}}>
      {session.data && <div style={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant={"h4"} style={{color: "black"}}>
          {session.data.user?.email}
        </Typography>
        <div>
          <Button variant={"contained"} onClick={() => {
signOut()}}>Logout</Button>
        </div>
        </div>}
      {!session.data && <div style={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant={"h4"} style={{color: "black"}}>
          Coursera
        </Typography>
        <div>
          <Button variant={"contained"} onClick={() => signIn()}>Sign up</Button>
        </div>
      </div>}
    </div>
  )
}
