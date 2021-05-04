type Message = {
  action: string
}

export function postMessage(message: Message) {
  if (window) {
    window.postMessage(message, '*');
  } else {
    throw new Error('No window');
  }
}

export function postActionMessage(action: string) {
  postMessage({
    action
  });
}

export function onActionMessage(action: string, callback: (Message) => {}) {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data.action === action) {
      callback(event);
    }
  })
}