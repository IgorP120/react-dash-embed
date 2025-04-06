import { DashResponse } from "../types";

export async function post(endpoint: string, data: any) {
    const payload = {
        // dash-specific callback parameters
        output: `..${endpoint}.data..`,
        outputs: [
            {
                id: endpoint,
                property: "data"
            }
        ],
        inputs: [
            {
                id: "",
                property: "",
                value: JSON.stringify(data)
            }
        ]
    };

    const response = await fetch('_dash-update-component', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    const resp: DashResponse = await response.json();
    const result = resp.response[endpoint].data;
    return result;
}

