import postMessage from './postMessage'

type EventProps = {
  action: string,
  category: string,
  label: string,
  value: number
}

const event = async (eventProps: EventProps) => { 
  postMessage({
    action: 'event',
    data: eventProps,
  })
}

export default event
