export const findList = (list, value) => list.find((i) => i.value === value)?.label;

export const currency = (total, fixed = 2) => {
	return parseFloat(total)
		.toFixed(fixed)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};


export const generateUUID = () => {
	let d = new Date().getTime();
	const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	  const r = (d + Math.random() * 16) % 16 | 0;
	  d = Math.floor(d / 16);
	  return (c === 'x' ? r : (c === 'y' ? (r & 0x3 | 0x8) : r)).toString(16);
	});
	return uuid;
  };