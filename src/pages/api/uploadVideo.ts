// pages/api/uploadVideo.js

const { spawn } = require('child_process');
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const command = [
    `--file=tmp/tesvide1.flv`,
    `--title=Summer vacation in California`,
    `--description=Had fun surfing in Santa Cruz`,
    `--keywords=surfing,Santa Cruz`,
    `--category=22`,
    `--privacyStatus=private`
  ];

  let python = spawn('python3', ['upload_video.py',...command]);
  let dataToSend = '';
  let errorOutput = '';

  python.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  python.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  python.on('error', (error) => {
    console.error(`Error executing Python script: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while executing the command.' });
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.status(200).json({ message: dataToSend });
    } else {
      console.error(`Python script exited with code ${code}`);
      console.error(`Error output: ${errorOutput}`);
      res.status(500).json({ error: 'An error occurred during script execution.' });
    }
  });
}
