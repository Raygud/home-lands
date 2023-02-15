export function fetchData(url, token) {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.error(error)
        })
}

export function postData(url, data, token) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}

export function deleteData(url, token) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}


export function getGeo(address, apiKey) {
    return fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}address&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.error(error)
        })
}