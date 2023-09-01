// const { exec } = require('child_process');
import { exec } from 'child_process';

function handleIncomingCall() {
  const command = `python upload_video.py --file="/tmp/test_video_file.flv" --title="Summer vacation in California" --description="Had fun surfing in Santa Cruz" --keywords="surfing,Santa Cruz" --category="22" --privacyStatus="private"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command STDERR: ${stderr}`);
    }
    
    console.log(`Command STDOUT: ${stdout}`);
    console.log('Command executed successfully.');
  });
}

// Call the function when a new call comes in or an event occurs
export default handleIncomingCall;
