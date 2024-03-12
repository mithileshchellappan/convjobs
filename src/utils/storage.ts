export const getSessionIdForResume = (resumeId: string) => {
    const mappings = localStorage.getItem("mappings");
    if (!mappings) {
        return null;
    }
    const parsedMappings = JSON.parse(mappings);
    return parsedMappings[resumeId];
}

export const setSessionIdForResume = (resumeId: string, sessionId: string) => {
    const mappings = localStorage.getItem("mappings");
    let parsedMappings:any = {};
    if (mappings) {
        parsedMappings = JSON.parse(mappings);
    }
    parsedMappings[resumeId] = sessionId;
    localStorage.setItem("mappings", JSON.stringify(parsedMappings));
}