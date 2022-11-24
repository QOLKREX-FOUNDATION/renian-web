import { API } from "../../config";

export const handlePost = async (data, token, method) => {
	try {
		const content = await fetch(`${API.war}pets`, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
			method,
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const handlePostStatus = async (data, token) => {
	try {
		const content = await fetch(`${API.war}pets/status/`, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
			method: "POST",
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getPetChipApi = async (token, chip) => {
	try {
		const response = await fetch(`${API.war}pets?chip=${chip}`, {
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
		})
			.then((content) => {
				if (content.ok) {
					return content.json();
				}
				throw new Error("Something went wrong");
			})
			.then((responseJson) => {
				return responseJson;
			});

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getRecordPet = async (data, token) => {
	try {
		const content = await fetch(`${API.war}pets?${data}`, {
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const upload = async (object, token) => {
	try {
		const data = new FormData();
		data.append("name", object.name);
		data.append("file", object.file);
		data.append("chip", object.chip);
		const content = await fetch(`${API.war}pets/upload`, {
			body: data,
			headers: {
				"x-token": token,
			},
			method: "POST",
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};
