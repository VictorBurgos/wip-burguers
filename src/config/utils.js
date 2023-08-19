export const findList = (list, value) => list.find((i) => i.value === value)?.label;

export const currency = (total, fixed = 2) => {
	return parseFloat(total)
		.toFixed(fixed)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};