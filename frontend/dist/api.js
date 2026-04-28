const BASE_URL = "http://127.0.0.1:3000";
export async function post(url, body) {
    const res = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }
    return data;
}
