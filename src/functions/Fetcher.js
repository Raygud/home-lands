export function fetchData(url) {
    return fetch(url, {
        headers: {
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