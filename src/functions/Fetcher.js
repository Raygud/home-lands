export function fetchData(url,token) {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(error => {
            console.error(error)
        })
}