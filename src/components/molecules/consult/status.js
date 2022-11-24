export const statusColor = (status) => {
	switch (status) {
		case "ADOPTION":
			return "#F668FF";
		case "GALLERY":
			return "#68D8FF";
		case "LOST":
			return "#f1c40f";
		case "STOLEN":
			return "#e74c3c";
		case "DEAD":
			return "#000000";
		default:
			return "#2fb833";
	}
};

export const statusSelect = {
	"en-Us": {
		ACTIVE: "ACTIVE",
		ADOPTION: "ADOPTION",
		GALLERY: "GALLERY",
		LOST: "LOST",
		STOLEN: "STOLEN",
		DEAD: "DEAD",
	},
	"es-Es": {
		ACTIVE: "ACTIVO",
		ADOPTION: "EN ADOPCIÓN",
		GALLERY: "GALERÍA",
		LOST: "PÉRDIDO",
		STOLEN: "ROBADO",
		DEAD: "DECESO",
	},
};

export const sterilizedSelect = {
	YES: "SI",
	NO: "NO",
	CASTRATED: "CASTRADO",
};
