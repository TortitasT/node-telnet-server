const net = require('node:net')
const chalk = require('chalk')

var server = net.createServer(serverListener)
server.listen(8080)

function serverListener(connection) {
  console.log(chalk.green('connected'))

  connection.on('data', function (data) {
    console.log(chalk.blue('data: ' + data))

    const userInput = data.toString().replace(/[\r\n]/gm, '')
    handleUserInput(connection, userInput)
  })

  connection.on('close', function () {
    console.log(chalk.red('disconnected'))
  })
}

function handleUserInput(connection, userInput) {
  switch (userInput) {
    case 'close':
    case 'exit':
      connection.destroy()
      break

    case 'clear':
      connection.write('\n'.repeat(40))
      break

    case 'ping':
      connection.write(chalk.blue('pong') + '\n')
      break

    default:
      connection.write(chalk.red('command not found: ') + userInput + '\n')
      break
  }
}
