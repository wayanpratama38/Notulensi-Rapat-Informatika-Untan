const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleString('id-ID', { day: '2-digit' });
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
}

export default formatDate;