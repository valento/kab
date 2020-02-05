export default ({ params, body }) => {
  return (
    `<!doctype html>
    <html>
      <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>Quiz Game</title>
        <link href='https://fonts.googleapis.com/css?family=Patua+One|Playfair+Display|Oswald:400,700|Roboto|Cinzel|' rel='stylesheet'>
        <link rel='stylesheet' crossorigin='anonymous' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' integrity='sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M'>
        <link rel='stylesheet' href='public/css/main.css'>
        <!-- Include {initialState} -->
      </head>
      <body>
        <div class='container'>
          <div id='app' class='justify-content-center row'>${body}</div>
        </div>
        <script type='module' src='main.js'></script>
      </body>
    </html>`
  )
}
