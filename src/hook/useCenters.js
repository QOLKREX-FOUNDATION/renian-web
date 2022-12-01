import React from "react";

export const useCenters = (centers) => {
	const [locations, setLocations] = React.useState([]);
	const [paginate, setPaginate] = React.useState(1);
	const [lengthPaginate, setLengthPaginate] = React.useState(0);
	const [search, setSearch] = React.useState("");

	const prev = () => {
		if (paginate - 1 > 0) {
			setPaginate(paginate - 1);
			handleLocation();
		}
	};

	const next = () => {
		const cond = paginate * 10;
		if (paginate + 1 > cond) {
			setPaginate(paginate + 1);
			handleLocation();
		}
	};

	const handleLength = (array = []) => {
		const element = [];
		for (let index = 0; index < Number(array.length / 10); index++) {
			element.push(index + 1);
		}
		setLengthPaginate(element);
	};

	const handleLocation = () => {
		const cond = paginate * 10;
		const array = centers.filter(
			(center, index) => index - 1 > cond - 10 && index < cond
		);
		handleLength(centers);
		setLocations(array);
	};

	const onSearch = ({ target }) => {
		setSearch(target.value);
		const array = [];
		if (target.value === "") {
			handleLocation();
		} else {
			array = centers.filter(
				(center) =>
					center.name.toLowerCase().includes(target.value.toLowerCase()) ||
					center.department
						.toLowerCase()
						.includes(target.value.toLowerCase()) ||
					center.province.toLowerCase().includes(target.value.toLowerCase()) ||
					center.district.toLowerCase().includes(target.value.toLowerCase()) ||
					center.direction.toLowerCase().includes(target.value.toLowerCase())
			);
			handleLength(array);
			setLocations(array);
		}
	};

	return {
		locations,
		paginate,
		setPaginate,
		lengthPaginate,
		setLengthPaginate,
		search,
		onSearch,
		prev,
		next,handleLocation 
	};
};
