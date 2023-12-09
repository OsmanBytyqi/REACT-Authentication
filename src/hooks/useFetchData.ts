import { useState, useEffect } from 'react';

interface ApiResponse<T> {
    data: T;
    error: string | null;
    loading: boolean;
}

const useFetchData = <T>(url: string): ApiResponse<T> => {
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();

                setData(result);
                setLoading(false);
            } catch (error: any) {
                setError(`Error fetching data: ${error.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
