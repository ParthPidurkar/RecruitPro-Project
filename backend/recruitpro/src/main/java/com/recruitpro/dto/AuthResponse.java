package com.recruitpro.dto;

public class AuthResponse {
    private String message;
    private String email;
    private String userType;
    private String token;

    public AuthResponse(String message, String email, String userType, String token) {
        this.message = message;
        this.email = email;
        this.userType = userType;
        this.token = token;
    }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

    
}
