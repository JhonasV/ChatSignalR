const connection = new signalR.HubConnectionBuilder()
    .withUrl("/Infraestructure/SignalRServer")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(() => console.log('signalr connected'));