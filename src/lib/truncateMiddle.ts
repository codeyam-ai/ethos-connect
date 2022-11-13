const truncateMiddle = (text: string, length: number = 6) => 
    text ? `${text.slice(0,length)}...${text.slice(length * -1)}` : ''

export default truncateMiddle;