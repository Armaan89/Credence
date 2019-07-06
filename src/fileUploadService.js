import * as axios from 'axios';

const BASE_URL = '/';

function upload(formData) {
    const url = `${BASE_URL}/photos`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/photos/${img.id}` })));
}

export { upload }