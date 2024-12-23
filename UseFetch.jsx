import { useEffect, useState } from "react";

const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Could not fetch data');
                }
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Add `url` as a dependency to re-run the effect if it changes

    return { data, loading, error };
};

export default UseFetch;
