/**
 * I use for testing Deno
 * This observer, maded with idea for only example of pattern
 * maded max easy.
 */
// Just for example, you can provide more types
type event = 'plus' | 'minus';

interface Listener{
    update: (data: string) => void;
    key: string;
}

interface Listeners{
    listener: Listener;
    eventType: event;
}

// Need to be generated auto
const KEY = '132';

// This fields should be in db
let counter = 0;
const listeners: Listeners[] = [];

const EventManager = () => {
    const subscribe = (eventType: event, listener: Listener) => {
        listeners.push({eventType, listener});
    }

    const unsubscribe = (eventType: event, key: string) => {
        const unsubscribedListener = listeners.find((value) => ((value.eventType == eventType) && (value.listener.key === key)));
        if(unsubscribedListener){
            const index = listeners.indexOf(unsubscribedListener);
            listeners.splice(index);
            return console.log(`Successful unsubscribe this event: ${eventType}`);
        }
        return console.log(`Fail to unsubscribe: ${eventType}`);
    }

    const notify = (eventType: event, data: string) => {
        listeners.forEach((listener) => {
            if(listener.eventType === eventType){
                listener.listener.update(data);
            }
        });
    }

    return {
        subscribe, unsubscribe, notify
    }
}

// Need to have another function for this.
// This is just for example, for run subscribe
const createSubscribe = () => {

    const event = EventManager();

    const listener: Listener = { 
        update: (data) => console.log(`Now counter is:${data}`),
        key: KEY, //in future this should be generated, userId for example
    }

    event.subscribe('plus', listener);

}

const main = () => {
    // this should be in another function maded for customer (example)
    createSubscribe();
    // This, need to work only on server, we can provide more fields in observer, link to cutomer for example
    const event = EventManager();

    // Update something
    const timerId = setInterval(() => {
        counter++
        // This commented code, just for test, what subscriber is work
        // if(counter === 3){
        //     event.unsubscribe('plus', KEY)
        // }
        event.notify('plus', counter.toString());
        if(counter === 10){
            clearInterval(timerId);
        }
    }, 1000);
}

main()