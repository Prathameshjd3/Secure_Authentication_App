const getHtml = (title, message, success) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background: #f4f6f8;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        background: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        max-width: 400px;
      }
      h1 {
        color: ${success ? "#28a745" : "#dc3545"};
      }
      p {
        color: #555;
        margin: 20px 0;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${title}</h1>
      <p>${message}</p>
      <a href="http://localhost:5173/login">Go to Login</a>
    </div>
  </body>
  </html>
  `;
};

module.exports = {
  getHtml
};