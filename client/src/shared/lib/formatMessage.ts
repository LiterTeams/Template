const formatMessage = (text: string, maxLength: number) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength - 1) + "...";
}

export default formatMessage;