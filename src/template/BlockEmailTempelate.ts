
const BlockEmailTempelate = (username: string) => {
  const body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f8fa;
        margin: 0;
        padding: 0;
        color: #333333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .header {
        background: #e63946;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        line-height: 1.6;
      }
      .content h2 {
        color: #e63946;
        margin-top: 0;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 18px;
        background: #e63946;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        font-size: 12px;
        color: #888888;
        text-align: center;
        padding: 15px;
        border-top: 1px solid #eeeeee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        ⚠️ Blocked Account
      </div>
      <div class="content">
        <h2>Hello, ${username}</h2>
        <p>
         Hello We are From SkillSwap. We’ve received continously getting report regarding your recent activity on our platform. 
          After reviewing the case, we found this behavior violates our community guidelines.
        </p>
        <p>
        //   <strong>So We Blocked Your Account.</strong> It Will Re-block in 7 Days.After That Be Careful.
        </p>
        <p>
          If you believe this was issued in error, you can appeal by contacting our support team.
        </p>
        <a href="https://skillswap/support" class="button">Contact Support</a>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} SkillSwap. All rights reserved.  
        <br/>
        You are receiving this email because you are a registered user of our platform.
      </div>
    </div>
  </body>
  </html>
  `;
  return body;
};

export default BlockEmailTempelate;
