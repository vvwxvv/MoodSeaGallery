import { useState, useEffect, useRef, useCallback } from 'react';

export default function useData(apiEndpoint, itemUrl = null, isCn = false) {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Use refs to track component mount state
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef(null);

  // Cleanup function to clear timeouts
  const cleanup = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const fetchData = useCallback(async (isRetry = false) => {
    if (!apiEndpoint) {
      setError('No API endpoint provided');
      setIsLoading(false);
      return;
    }

    // Clear any existing timeout
    cleanup();

    try {
      if (!isMountedRef.current) return;

      setError(null);
      if (!isRetry) {
        setIsLoading(true);
        setRetryCount(0);
        
        // Add a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          if (isMountedRef.current && isLoading) {
            setIsLoading(false);
            setError('Request timeout - please try again');
          }
        }, 30000); // 30 second timeout
        
        // Store timeout ID for cleanup
        retryTimeoutRef.current = timeoutId;
      }

      const response = await fetch(apiEndpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Check if component is still mounted before proceeding
      if (!isMountedRef.current) return;
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Use default error message if JSON parsing fails
        }
        console.log('Response not OK:', errorMessage);
        return; // Exit early instead of throwing error
      }
      
      const result = await response.json();
      
      // Handle different response structures
      let items = [];
      if (result && typeof result === 'object') {
        if (Array.isArray(result.data)) {
          items = result.data;
        } else if (Array.isArray(result.items)) {
          items = result.items;
        } else if (Array.isArray(result)) {
          items = result;
        } else {
          console.warn('Unexpected response structure:', result);
        }
      }
      
      if (!isMountedRef.current) return;
      
      setData(items);
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      if (!isMountedRef.current) return;

      // Retry logic for network errors only
      const shouldRetry = retryCount < 2 && (
        err.name === 'TypeError' || 
        err.message.includes('fetch') ||
        err.message.includes('network') ||
        err.message.includes('Failed to fetch')
      );
      
      if (shouldRetry) {
        const nextRetryCount = retryCount + 1;
        setRetryCount(nextRetryCount);
        
        // Simple delay: 1s, 2s, 3s
        const delay = nextRetryCount * 1000;
        retryTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchData(true);
          }
        }, delay);
        return;
      }
      
      // Log error instead of setting error state
      let errorMessage = 'Failed to fetch data';
      if (err.name === 'TypeError' && (err.message.includes('fetch') || err.message.includes('network'))) {
        errorMessage = 'Network error - please check your connection';
      } else if (err.message && !err.message.includes('AbortError')) {
        errorMessage = err.message;
      }

      setData([]); // Reset to empty array on final error
      setIsLoading(false); // Ensure loading is false on error
      
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [apiEndpoint, retryCount, cleanup, isCn]); // Add isCn dependency

  // Initial data fetch
  useEffect(() => {
    if (apiEndpoint) {
      fetchData();
    }
  }, [apiEndpoint, fetchData, isCn]); // Add isCn dependency

  // Event listeners for data refresh
  useEffect(() => {
    if (!itemUrl) return;

    const handleStorageChange = (e) => {
      if (e.key === `${itemUrl}_updated`) {
        fetchData();
        // Clear the storage event
        try {
          localStorage.removeItem(e.key);
        } catch (err) {
          console.warn('Failed to remove localStorage item:', err);
        }
      }
    };

    const handleCustomRefresh = () => {
      fetchData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(`refresh_${itemUrl}`, handleCustomRefresh);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(`refresh_${itemUrl}`, handleCustomRefresh);
    };
  }, [itemUrl, fetchData, isCn]); // Add isCn dependency

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  // Manual refresh function
  const refetch = useCallback(() => {
    setRetryCount(0); // Reset retry count on manual refetch
    fetchData();
  }, [fetchData]);

  // Helper function to trigger refresh for other components
  const triggerRefresh = useCallback(() => {
    if (itemUrl) {
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent(`refresh_${itemUrl}`));
      // Also set localStorage for cross-tab communication
      try {
        localStorage.setItem(`${itemUrl}_updated`, Date.now().toString());
      } catch (err) {
        console.warn('Failed to set localStorage item:', err);
      }
    }
  }, [itemUrl]);

  return { 
    data, 
    isLoading, 
    error, 
    refetch,
    triggerRefresh,
    // Allow manual data manipulation if needed
    updateData: useCallback((newData) => {
      if (isMountedRef.current) {
        setData(newData);
      }
    }, []),
    updateError: useCallback((newError) => {
      if (isMountedRef.current) {
        setError(newError);
      }
    }, [])
  };
}