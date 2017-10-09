const debug = require('debug')('assistance-service:utils:notification-socket-io')

export function NotificationTrigger (io) {
  debug('Evento io general')

  // Connection all sockets
  this.connect = function () {
    io.on('connection', function (socket) {
      debug(`Usuario de Campo Connectado a NOTIFICACIONES ${socket.id}`)

      // Connection por room
      socket.on('NotificationsRoom', function (NotificationsRoom) {
        debug('Campo NOTIFICACIONES ROOM session Is : ' + NotificationsRoom)

        // Si el usuario ya esta suscrito a otro NotificationsRoom, sale de ese y se une al nuevo
        if (socket.NotificationsRoom) {
          socket.leave(socket.NotificationsRoom)
        }

        // Uniendo al usuario al nuevo NotificationsRoom
        socket.NotificationsRoom = NotificationsRoom
        debug('EL valor del socket.NotificationsRoom: ' + socket.NotificationsRoom)
        socket.join(NotificationsRoom)
      })
    })
  }

  this.notificar = function (message) {
    debug('Eveneto llego enviado al cliente')
    io.emit('notis_counter', message)
  }
}
