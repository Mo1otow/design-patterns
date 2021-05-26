interface User {
    name: string;
    id: string;
}

interface ChatMessage {
    user: User;
    message: string;
}

const users = () => {
    const chatUsers: Array<User> = [];
    const create = ({name, id}: User) => {
        chatUsers.push({ name, id });
        console.log(`Success addded: ${name}`);
        return {name, id};
    }

    const remove = (id: string) => {
        const removableUser = chatUsers.find((user) => user.id === id);
        if(removableUser){
            const index = chatUsers.indexOf(removableUser)
            chatUsers.splice(index);
            console.log(`Success remove: ${removableUser.name}`);
        }
    }

    const sendMessage = (user: User, chat: Array<ChatMessage>, message: string) => {
        chat.push({user, message});
        console.log(`${user.name}: ${message}`);
    }

    return {create, remove, sendMessage};
}

const bot = (censoredWord: string) => {
    let botEnabled = false;
    const regex = new RegExp(censoredWord, 'gi');

    const addBot = () => {
        botEnabled = true;
        console.log('Bot added');
        return {botEnabled};
    }

    const removeBot = () => {
        botEnabled = false;
        console.log('Bot removed');
        return {botEnabled};
    }

    const validateMessage = (message: string) => {
        return regex.test(message)
    }

    return {removeBot, addBot, validateMessage, botEnabled};
}

const chat = () => {
    const messages: Array<ChatMessage> = [];
    const chatUsers = users();
    let chatBot = bot('cat');

    const Charley = chatUsers.create({name: 'Charley',id: '1'});
    const Mikkey = chatUsers.create({name: 'Mikkey', id: '2'});
    const Kseniya = chatUsers.create({name: 'Kseniya', id: '3'});

    const someoneSendMessage = (user: User, message: string) => {
        chatUsers.sendMessage(user, messages, message);
        // Without regex because this is command;
        if(message === 'addBot'){
            const result = chatBot.addBot();
            //That looks ugly, but this one way, how i can show  you right result...
            // I dont know now, how it can looks better
            // Maybe if i use classes, i can use private state, but i want to use only function, and learning all with it :)
            chatBot = {...chatBot, ...result};
        }
        if(message === 'removeBot'){
            const result = chatBot.removeBot();
            chatBot = {...chatBot, ...result};
        }
        if(chatBot.botEnabled){
            const validation = chatBot.validateMessage(message);
            if (validation){
                console.log(`${user.name} use a bad word, and he is gone`);
                chatUsers.remove(user.id);
            }
        }
    }

    someoneSendMessage(Charley, 'Hello');
    someoneSendMessage(Kseniya, 'hi, i\'am a cat :)');
    someoneSendMessage(Mikkey, 'oh, shit');
    someoneSendMessage(Mikkey, 'that not good');
    someoneSendMessage(Mikkey, 'addBot');
    someoneSendMessage(Charley, 'U don\'t like cat?' );
    someoneSendMessage(Mikkey, 'no, i dont');
    someoneSendMessage(Kseniya, 'U dont good guy');
    someoneSendMessage(Kseniya, 'removeBot');

}

chat();
