using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Infraestructure
{
    public class SignalRServer : Hub
    {

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("chat_room", user, message);
        }
    }
}
