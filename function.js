window.function = async function(api_key, model, prompt, n, size, response_format, user, quality, style) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Required Parameters
    if (!model.value) {
        return "Error: Model is required.";
    }
    if (!prompt.value) {
        return "Error: Prompt is required.";
    }

    // Construct request payload
    const payload = {
        model: model.value,
        prompt: prompt.value
    };

    // Add optional parameters if provided
    if (n.value) payload.n = parseInt(n.value);
    if (size.value) payload.size = size.value;
    if (response_format.value) payload.response_format = response_format.value;
    if (user.value) payload.user = user.value;
    if (quality.value) payload.quality = quality.value;
    if (style.value) payload.style = style.value;

    // API endpoint URL
    const apiUrl = "https://api.openai.com/v1/images/generations";

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response (list of image URLs)
        const responseData = await response.json();
        return responseData.data.map(item => item.url).join("\n");

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
