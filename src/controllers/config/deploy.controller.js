const { exec } = require('child_process');
const config = async (req, res) => {
    exec("git pull origin dev && pm2 restart 15", (err, stdout, stderr) => {
        if (err) {
            console.log("🚀 ~ exec ~ err:", err)
            // node couldn't execute the command
            return;
          }
        
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
    })
    res.status(200).json({
        status:200,
    });
}
module.exports = config;