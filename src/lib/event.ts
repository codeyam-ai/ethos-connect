import postIFrameMessage from './postIFrameMessage'

type EventProps = {
  action: string,
  category: string,
  label: string,
  value: number
}

const event = async (eventProps: EventProps) => { 
  postIFrameMessage({
    action: 'event',
    data: eventProps,
  })
}

export default event
