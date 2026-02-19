
// Use environment variable for production, fallback to localhost for dev
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Get authorization headers with JWT token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const fetchMetrics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/metrics`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    return null;
  }
};

export const startSession = async () => {
  const res = await fetch(`${API_BASE_URL}/start`, {
    headers: getAuthHeaders()
  });
  if (res.status === 401) {
    window.location.href = "/login";
    return null;
  }
  return res.json();
};

export const pauseSession = async () => {
  const res = await fetch(`${API_BASE_URL}/pause`, {
    headers: getAuthHeaders()
  });
  if (res.status === 401) {
    window.location.href = "/login";
    return null;
  }
  return res.json();
};

export const resumeSession = async () => {
  const res = await fetch(`${API_BASE_URL}/resume`, {
    headers: getAuthHeaders()
  });
  if (res.status === 401) {
    window.location.href = "/login";
    return null;
  }
  return res.json();
};

export const stopSession = async () => {
  const res = await fetch(`${API_BASE_URL}/stop`, {
    headers: getAuthHeaders()
  });
  if (res.status === 401) {
    window.location.href = "/login";
    return null;
  }
  return res.json();
};

export const fetchSessions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    return null;
  }
};

export const fetchEmotions = async (sessionId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/emotions?session_id=${sessionId}`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch emotions:", error);
    return null;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const fetchReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return null;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/alerts`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return null;
  }
};
