const BASE_URL = 'http://localhost:8080/api';

// 🔐 Attach token to all authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('❌ No token found');
  return { Authorization: `Bearer ${token}` };
};

// ✅ Get all jobs (no auth)
export const getAllJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`);
  if (!res.ok) throw new Error('❌ Failed to fetch jobs');
  return res.json();
};

// ✅ Apply to a job (auth required)
export const applyToJob = async (jobId, profileId) => {
  const res = await fetch(`${BASE_URL}/applications/apply?jobId=${jobId}&profileId=${profileId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('❌ Failed to apply to job');
  return res.json();
};

// ✅ Upload file (auth required)
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload/resume`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) throw new Error('❌ File upload failed');
  return res.text(); // Returns uploaded file URL
};

// ✅ Save job seeker profile (auth required)
export const saveProfile = async (profile) => {
  const res = await fetch(`${BASE_URL}/jobseeker/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) throw new Error('❌ Saving profile failed');
  return res.json();
};

// ✅ Get current user from token
export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error('❌ Failed to fetch user info');
  return res.json(); // Expected: { fullName, email }
};

// ✅ Update user name (auth required)
export const updateUserName = async (fullName) => {
  const res = await fetch(`${BASE_URL}/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ fullName }),
  });

  if (!res.ok) throw new Error('❌ Failed to update user name');
  return res.text(); // "Name updated"
};

// ✅ Get full name from email (no auth assumed)
export const getFullNameByEmail = async (email) => {
  const res = await fetch(`${BASE_URL}/user/name?email=${email}`);
  if (!res.ok) throw new Error("❌ Failed to fetch name by email");
  return res.text(); // Expected to return full name
};
