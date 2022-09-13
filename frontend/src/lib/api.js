import qs from "qs";


/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}
export function getStrapiAuth(user = "") {
    return `${
        process.env.PUBLIC_STRAPI_API_AUTHTOKEN || "Bearer ca87d26c7bf2f78cb24f418280165975099992cab13442cfa4932997deab5c5b4b7b19ebbd19338333c2cb25626a906560d4a35fb7788f86b015024b6b3dc549575afde8e9e4dcbeab67287b6dc9fe3635edeb357ea8405ab781494ebc1a7dfb268d6eb20c0e29ba440a725c74bae217b2d102fdb1d11ad17e0451181b99dab0"
    }`;
}
/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
}


/**
* Helper to make POST requests to Strapi API endpoints
* @param {string} path Path of the API route
* @param {Object} json object, will be stringified
* @param {Object} options Options passed to fetch
* @returns Parsed API call response
*/
export async function createAPI(path, strapiObj = {}, options = {}) {
    const body = JSON.stringify({data: strapiObj});

    // Merge default and user options
    const mergedOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getStrapiAuth()
        },
        ...options,
        body: body
    };

    // Build request URL

    const requestUrl = `${getStrapiURL(
        `/api${path}` 
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
}
/**
 * Helper to make POST requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} json object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function updateAPI(path, strapiDocId, strapiObj = {}, options = {}) {
    const body = JSON.stringify({data: strapiObj});
    const mergedOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",

            "Authorization": getStrapiAuth()
        },
        ...options,
        body: body
    };

    // Build request URL

    const requestUrl = `${getStrapiURL(
        `/api${path}/${strapiDocId}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
}


/**
 * Helper to make POST requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} json object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function uploadAPI(path, strapiObj = {}, options = {}) {
    const body = JSON.stringify({data: strapiObj});

    // Merge default and user options
    const mergedOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getStrapiAuth()
        },
        ...options,
        body: body
    };

    // Build request URL

    const requestUrl = `${getStrapiURL(
        `/api/upload${path}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
}
